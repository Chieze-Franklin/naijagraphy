var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));

// Server index page
app.get("/", function (req, res) {
    var msg = 
    "This is a simple project that returns Nigerian states, local government areas and a few other pieces of information about the states.<br><br>" +

    "Source code can be found at: <a href='https://github.com/Chieze-Franklin/naijagraphy'>https://github.com/Chieze-Franklin/naijagraphy</a>.<br><br>" +

    "<h4>To get all the states in Nigeria:</h4>" +
    "<a href='https://naijagraphy.herokuapp.com/states'>https://naijagraphy.herokuapp.com/states</a><br>" +
    "This will return a JSON array containing the names of all the states in Nigeria, including the FCT Abuja.<br><br>" +

    "<h4>To get basic info about a particular state:</h4>" +
    "https://naijagraphy.herokuapp.com/states/{state}<br>" +
    "For instance,<br>" +
    "<a href='https://naijagraphy.herokuapp.com/states/Lagos'>https://naijagraphy.herokuapp.com/states/Lagos</a><br>" +
    "This will return a JSON object containing basic info (like name and capital) about the specified state.<br><br>" +

    "<h4>To get more info about a particular state:</h4>" +
    "https://naijagraphy.herokuapp.com/states/{state}/{info}<br>" +
    "For instance, to get all the Local Government Areas (LGAs) in Lagos state:<br>" +
    "<a href='https://naijagraphy.herokuapp.com/states/Lagos/lgas'>https://naijagraphy.herokuapp.com/states/Lagos/lgas</a><br>" +
    "This will return a JSON array containing all the LGAs in the specified state.<br><br>";
    res.send(msg);
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