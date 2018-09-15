const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const url = 'mongodb://mmallum:abc123@se-test.ddns.net:27017/soccer_roster';
const dbName = 'soccer_roster';
let db;

MongoClient.connect(url, function(err, client) {
    if(err !== null) {
        console.log(err);
    }
    db = client.db(dbName);
});

const insertDocument = function(collectionName, document) {
    console.log(document);
    // Get the documents collection
    const collection = db.collection(collectionName);
    // Insert the document
    collection.insertOne(document, function(err, res) {
       if(err) {
           console.log(err);
       }
       console.log("New Player Added");
    });
};

// When client connects, send home page
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "home.html");
});

app.get('/all-players', function(req, res) {
    // Get the documents collection
    const collection = db.collection('players');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        console.log("Found the following records");
        console.log(docs);
        res.send(docs);
    });
});

app.post('/new-player', function(req, res) {
   //console.log(req.body);
   let newPlayer = {
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       position: req.body.playerPosition,
       jerseyNumber: parseInt(req.body.jerseyNumber),
       height: parseInt(req.body.heightFeet) * 12 + parseInt(req.body.heightInches),
       weight: parseInt(req.body.playerWeight)
   };
   insertDocument('players', newPlayer);
   res.redirect('/');
});

// Server listen on port 80
const server = app.listen(80, function () {
    let port = server.address().port;

    console.log("Server listening on port %s", port)
});