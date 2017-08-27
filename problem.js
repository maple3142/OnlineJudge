var Promise = require('bluebird');
var showdown = require('showdown');
var cvt = new showdown.Converter();
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var low = require('lowdb');
var Promise = require('bluebird');

var db = low('./db.json');
db.set('pbs', []).write();
var readProblems = fs.readdirAsync('./problems');
var readIn = readProblems.map(prob => {
	return fs.readFileAsync(path.join('./problems_cases', prob + '.in'), 'utf8');
})
var readOut = readProblems.map(prob => {
	return fs.readFileAsync(path.join('./problems_cases', prob + '.out'), 'utf8');
})
var readContent = readProblems.map(prob => {
	return fs.readFileAsync(path.join('./problems', prob), 'utf8');
}).map(c => {
	return Promise.resolve(cvt.makeHtml(c));
});
Promise.join(readProblems, readIn, readOut, readContent, function (probs, inn, out, parsed) {
	parsed.forEach(function (e, i) {
		db.get('pbs').push({
			content: e,
			problem: probs[i],
			id: i,
			in: inn[i],
			out: fx(out[i])
		}).write();
	});
});
function RT(app) {
	app.post('/getProblems', (req, res) => {
		db = low('./db.json');
		var json = db.get('pbs').value();
		var oks = db.get('users').findLast({ id: req.body.id }).get('ok').value();
		if (!oks) return;
		res.json(json.map(e => {
			e.ok = false;
			if (oks[e.id]) {
				e.ok = true;
			}
			return e;
		}));
	});
	app.post('/getProblem', (req, res) => {
		res.json(db.get('pbs').nth(req.body.id).value());
	});
};
module.exports = RT
function fx(s) {
	s = s.replace(/(\r\n|\r)/g, '\n');
	if (s.endsWith('\n')) s = s.slice(0, -1);
	return s;
}