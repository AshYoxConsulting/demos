var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET users listing. */
router.get('/', function(req, res, next) {

    console.log("search for all..");
    var url = 'mongodb://localhost:27017/test';
    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        console.log(err);
        console.log("Connected correctly to server");

        var collection = db.collection('lps');
        // Find some documents
        collection.find({}).toArray(function(err, docs) {
            console.log("Found the following records");
            console.log(docs);
            console.log(err);
            db.close();
            res.send(docs);
        });
    });
});



router.get('/fi/:band', function(req, res, next) {

    console.log("search for band..");
    var url = 'mongodb://localhost:27017/test';
    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        console.log(err);
        console.log("Connected correctly to server");

        console.log("params" +  req.params.band );
        var collection = db.collection('lps');
        // Find some documents
        collection.find({"band" : req.params.band }).toArray(function(err, docs) {
            console.log("Found the following records");
            console.log(docs);
            console.log(err);
            db.close();
            res.send(docs);
        });
    });
});

module.exports = router;

