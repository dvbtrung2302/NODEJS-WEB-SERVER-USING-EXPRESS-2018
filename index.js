var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
var users = [
	{ id: 1, name: 'Trung'},
	{ id: 2, name: 'Linh'},
	{ id: 3, name: 'Khang'}
];

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res) {
	res.render('index', {
		name: 'AAA'
	});
});

app.get('/users', function(req, res) {
	res.render('users/index', {
		users: users
	});
});

app.get('/users/search', function(req, res) {
	var q = req.query.q;
	var matchedUsers = users.filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});

	res.render('users/index', {
		users: matchedUsers
	});

});

app.get('/users/create', function(req, res) {
	res.render('users/create');
});

app.post('/users/create', function(req, res) {
	users.push(req.body);
	res.redirect('/users');
});

app.listen(port, function() {
	console.log('Server listening on port ' + port);
});