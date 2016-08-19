
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var TODOS_FILE = path.join(__dirname, 'todos.json');

app.set('port', (process.env.PORT || 9500));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/todo', function(req, res) {
  fs.readFile(TODOS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/todo', function(req, res) {
  fs.readFile(TODOS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var todos = JSON.parse(data);
    var newTodo = {
      id: '_' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
      text: req.body.tname
    };
    todos.push(newTodo);
    fs.writeFile(TODOS_FILE, JSON.stringify((req.body.update ? req.body.data : todos), null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json((req.body.update ? req.body.data : todos));
    });
  });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
