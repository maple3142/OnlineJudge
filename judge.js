var Promise=require('bluebird');
var fs=Promise.promisifyAll(require('fs'));
var path=require('path');
var low=require('lowdb');
var util=require('util');
var Promise=require('bluebird');
var cp=require('child_process');
var axios=require('axios');
var sj=require('simple-judger');
var db=low('./db.json');
//sj.setTemp(path.join(__dirname,'temp'));

module.exports=function(app){
	app.post('/judge',(req,res)=>{
		var mode=db.get('config.judgemode').value();
		var p=db.get('pbs').nth(req.body.problem).value();
		var cfg=db.get('config.judge').value();
		cfg.src=req.body.code;
		cfg.in=p.in;
		cfg.out=p.out;
		if(mode===1){
			sj(cfg).then(d=>{
				if(d.result==='AC'){
					var ok=db.get('users').findLast({id: req.body.id}).get('ok').value();
					var l=db.get('pbs').value().length;
					for(var i=0;i<l;i++){
						if(i==req.body.problem)ok[i]=true;
						else ok[i]=ok[i]||false;
					}
					db.get('users').findLast({id: req.body.id}).set('ok',ok).write();
				}
					
				d.ok=true;
				res.json(d);
			}).catch(e=>{
				console.error(e);
			});
		}
		else if(mode===2){
			if(!cfg.url)throw 'mode 2 required url!';
			axios.post(cfg.url,cfg).then(d=>{
				if(d.result==='AC'){
					var ok=db.get('users').findLast({id: req.body.id}).get('ok').value();
					var l=db.get('pbs').value().length;
					for(var i=0;i<l;i++){
						if(i==req.body.problem)ok[i]=true;
						else ok[i]=ok[i]||false;
					}
					db.get('users').findLast({id: req.body.id}).set('ok',ok).write();
				}
				d.data.ok=true;
				res.json(d.data);
			});
		}
		else if(mode===3){
			require('./dangerous_judge.js')(req,res);
		}
		else{
			console.error('no config.judgemode specific');
		}
	});
};
