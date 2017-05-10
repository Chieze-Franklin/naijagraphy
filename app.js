var express = require("express");
var exphbs = require('express3-handlebars');
var request = require("request");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('**/assets', express.static(__dirname + '/assets'));
app.use('**/public', express.static(__dirname + "/public"));

app.set('views', __dirname + '/views');
app.engine('html', exphbs.create({
  defaultLayout: 'main.html',
  layoutsDir: app.get('views') + '/layouts',
  partialsDir: [app.get('views') + '/partials']
}).engine);
app.set('view engine', 'html');

var server = app.listen((process.env.PORT || 5000), function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Naijagraphy Server running on http://%s:%s", host, port);
    console.log('');

    process.on('uncaughtException', function (error) {
        console.log(error);
        console.log(error.stack);
        console.trace();
    });
});

// Server index page
app.get("/", function (req, res) {
    res.render('index.html');
});

//get a json of all states
app.get("/states", function (req, res) {
    request({
        url: "https://raw.githubusercontent.com/Chieze-Franklin/naijagraphy-contents/master/states.json",
        method: "GET"
    }, function(error, response, body) {
        if (response.statusCode == 200) {
            if (error) {
                res.end("Error getting states");
            } else {
                res.send(JSON.parse(body));
            }
        } else { 
            res.end("Error getting states");
        }
    });
});

// /{state}
app.get("/states/:state", function (req, res) {
    request({
        url: "https://raw.githubusercontent.com/Chieze-Franklin/naijagraphy-contents/master/states/" + req.params.state.toLowerCase().replace(' ', '-') + "/state.json",
        method: "GET"
    }, function(error, response, body) {
        if (response.statusCode == 200) {
            if (error) {
                res.end("Error getting state: " +  req.params.state);
            } else {
                res.send(JSON.parse(body));
            }
        } else { 
            res.end("Error getting state: " +  req.params.state); 
        }
    });
});

// /{state}/lgas, /{state}/location, /{state}/population, ...
app.get("/states/:state/:info", function (req, res) {
    request({
        url: "https://raw.githubusercontent.com/Chieze-Franklin/naijagraphy-contents/master/states/" + req.params.state.toLowerCase().replace(' ', '-') + "/" + req.params.info.toLowerCase().replace(' ', '-') + ".json",
        method: "GET"
    }, function(error, response, body) {
        if (response.statusCode == 200) {
            if (error) {
                res.end("Error getting info: " +  req.params.info + " for state: " +  req.params.state);
            } else {
                res.send(JSON.parse(body));
            }
        } else { 
            res.end("Error getting info: " +  req.params.info + " for state: " +  req.params.state); 
        }
    });
});