var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var sj=require('simple-judger');

app.use(bodyParser.json());
app.post('/',(req,res)=>{
	console.log(req.body);
	sj(req.body).then(d=>{
		console.log(d);
		res.json(d);
	}).catch(e=>{
		console.error(e);
	});
});
app.get('/',(req,res)=>{
	res.send('remote server ok');
});
app.listen(7777);