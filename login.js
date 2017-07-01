var Promise=require('bluebird');
var showdown=require('showdown');
var cvt=new showdown.Converter();
var fs=Promise.promisifyAll(require('fs'));
var path=require('path');
var low=require('lowdb');
var Promise=require('bluebird');

var db=low('./db.json');

var ids=db.get('users').value().map(e=>{
	e.id=Math.random().toString();
	return e;
});
db.get('users').assign(ids).write();

module.exports=function(app){
	app.post('/login',(req,res)=>{
		var r=db.get('users').findLast({account: req.body.account,password: req.body.password}).value();
		var json={ok: false};
		if(r){
			json.ok=true;
			json.id=r.id;
			console.log(req.body.account+' logined ');
		}
		res.json(json);
	});
	app.post('/checkid',(req,res)=>{
		var r=db.get('users').findLast({id: req.body.id}).value();
		var json={ok: false};
		if(r){
			json.ok=true;
		}
		res.json(json);
	});
};