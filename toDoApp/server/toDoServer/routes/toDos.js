var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/toDoApp');

/* GET users listing. */
router.get('/:listName', function(req, res, next) {

  console.log( req.params.listName);
  var coll = db.get('usercollection');
  coll.find({ listId: req.params.listName},{}, function(e, docs){
    console.log(docs);
    res.send(docs);
  });
});

router.post('/', function(req, res, next) {
  console.log("###### saving");
  console.log(req.body);
  console.log(">>> listid " +  req.body.listId);
  var coll = db.get('usercollection');
  coll.update({ listId: req.body.listId}, req.body, {"upsert" : true}, function(err, result){
    console.log("err>" + err);
    console.log("res>" + result);
    if(err) res.send(err);
    else res.sendStatus(200);
    console.log("###### finished saving");
  });

});

module.exports = router;
