var Promise=require('bluebird');
var fs=Promise.promisifyAll(require('fs'));
var path=require('path');
var low=require('lowdb');
var util=require('util');
var Promise=require('bluebird');
var cp=require('child_process');
var axios=require('axios');


var db=low('./db.json');
module.exports=function(app){
	app.post('/judge',(req,res)=>{
		var mode=db.get('config.judgemode').value();
		var options={
			src: '#include<iostream>\nusing.......', //code !REQUIRED!
			in: '', //input string
			out: '', //output string
			timelimit: 1000, //ms !REQUIRED!
			compile: 'g++ -o {out} {dest}', //compile command, {source} {out} will be replaced !REQUIRED!
			result: { //result strings, these are default value
				Accepted: 'AC',
				Runtime_Error: 'RE',
				Time_Limit_Exceeded: 'TLE',
				Compile_Error: 'CE',
				Wrong_Answer: 'WA',
				System_Error: 'SE'
			}
		};
		if(mode===1){

		}
		else if(mode===2){
			var cfg=db.get('config.remote_judge').value();
			axios.post(cfg.url,cfg).then(d=>{
				res.json(d);
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
