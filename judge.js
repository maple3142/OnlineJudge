var Promise=require('bluebird');
var fs=Promise.promisifyAll(require('fs'));
var path=require('path');
var low=require('lowdb');
var util=require('util');
var Promise=require('bluebird');
var cp=require('child_process');

var db=low('./db.json');
var rs={
	ac: "AC",
	wa: "WA",
	tle: "TLE",
	ce: "CE",
	re: "RE",
	others: "SE"
};
module.exports=function(app){
	app.post('/judge',(req,res)=>{
		db=low('./db.json');
		var r=db.get('users').findLast({id: req.body.id}).value();
		if(!r)res.json({ok: false});
		var json={ok: true,result: rs.others,time: -1};
		if(r){
			var code=req.body.code;
			var name=Math.random().toString(36).substring(7);
			var sn=path.join(__dirname,'temp',util.format(db.get('config.sourceName').value(),name));
			var dn=path.join(__dirname,'temp',util.format(db.get('config.destName').value(),name));
			var compile=util.format(db.get('config.compile').value(),dn,sn);
			var p=db.get('pbs').nth(req.body.problem).value();
			fs.writeFileAsync(sn,code)
			.then(function(){
				var c=cp.exec(compile);
				c.on('exit',(code,sig)=>{
					if(code!=0){
						json.result=rs.CE;
						json.time=-1;
						res.json(json);
					}
					else{
						var start=Date.now();
						var cx=cp.execFile(dn);
						cx.stdin.write(p.in);
						cx.stdin.end();
						var out='';
						cx.stdout.on('data',s=>{
							out+=s.toString();
						});
						cx.on('close',code=>{
							console.log('output:\n',out,'\n');
							if(code!=0){
								console.log(rs.re);
								json.result=rs.re;
								json.time=Date.now()-start;
								res.json(json);
							}
							else if(fx(out)===p.out){
								console.log(rs.ac);
								json.result=rs.ac;
								json.time=Date.now()-start;
								res.json(json);

								var ok=db.get('users').findLast({id: req.body.id}).get('ok').value();
								var l=db.get('pbs').value().length;
								for(var i=0;i<l;i++){
									if(i==req.body.problem)ok[i]=true;
									else ok[i]=ok[i]||false;
								}
								db.get('users').findLast({id: req.body.id}).set('ok',ok).write();
							}
							else{
								console.log(rs.wa);
								json.result=rs.wa;
								json.time=Date.now()-start;
								res.json(json);
							}
							cx=null;
						});
						setTimeout(function(){
							if(!cx)return;
							console.log(rs.tle);
							json.result=rs.tle;
							json.time=Date.now()-start;
							res.json(json);
							cx.kill();
						},10000);
					}
				});
			});
		}
	});
};

function fx(s){
	s=s.replace(/(\r\n|\r)/g,'\n');
	if(s.endsWith('\n'))s=s.slice(0,-1);
	return s;
}