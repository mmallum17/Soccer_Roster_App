const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const url = 'mongodb://mmallum:abc123@se-test.ddns.net:27017/soccer_roster';
const dbName = 'soccer_roster';

MongoClient.connect(url, function(err, client) {
    console.log(err);
    const db = client.db(dbName);
    client.close();
    /*insertDocuments(db, function() {
        findDocuments(db, function(){
            client.close();
        });
    });*/
});

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};

const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
};

// When client connects, send "Hello World"
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "home.html");
});

app.post('/new-player', function(req, res) {
   console.log(req.body);
   res.redirect('/');
});

// Server listen on port 80
const server = app.listen(80, function () {
    let port = server.address().port;

    console.log("Server listening on port %s", port)
});