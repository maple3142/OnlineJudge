var Promise=require('bluebird');
var fs=Promise.promisifyAll(require('fs'));
var low=require('lowdb')
var program=require('commander')

var db=low('./db.json')

program
	.version('0.1')
	.option('-a, --add <str>', 'Add User (str: "account:password")')
	.option('-d, --del <account>', 'Delete User')
	.option('-l, --list','Show User List')
	.parse(process.argv)

if(!process.argv.slice(2).length){
	program.help()
}

if(program.add){
	if(/^([\d\w]+:[\d\w]+)$/g.test(program.add)){
		fs.readdirAsync('problems').then(files=>{
			var len=files.length
			var [acc,pwd]=program.add.split(':')
			db.get('users').push({
				account: acc,
				password: pwd,
				id: '',
				ok: Array(len).fill(false)
			}).write()
		})
	}
	else{
		console.log('user string format: "account:password"')
	}
}

if(program.del){
	db.get('users').remove({
		account: program.del
	}).write()
}

if(program.list){
	console.log(db.get('users').map(e=>e.account).value())
}