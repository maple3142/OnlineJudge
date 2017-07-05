var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var path=require('path');
var sj=require('simple-judger');
sj.setTemp(path.join(__dirname,'../','temp'));

app.use(bodyParser.json());
app.post('/',(req,res)=>{
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