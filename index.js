var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');
var low=require('lowdb');

var app=express();
var db=low('./db.json');
db.defaults({
	users: [],
	pbs: []
}).write();


app.use(bodyParser.json());
app.use('/dist',express.static(path.join(__dirname,'./client/dist'),{
	etag: false
}));

app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'./client/index.html'));
});
require('./login.js')(app);
require('./judge.js')(app);
require('./problem.js')(app);
app.listen(process.argv[2]||process.env.PORT||80);


process.on('uncaughtException', function(err) {
	console.error('uncaughtException');
	console.error(err);
});