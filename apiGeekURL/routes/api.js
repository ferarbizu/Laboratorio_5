var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017/Cells';
var autoIncrement = require("mongodb-autoincrement");
var db;

router.get('/V1/Cell/', function(req, res, next) {
  mongo.connect(url, function(err, client) {
    if(!err) {
      console.log("We are connected");
      db = client.db('Cells');
    }
    db.collection('cells').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.send({cells: result})
      client.close();
    });
  });
});

router.post('/V1/Cell/', function(req, res, next) {
  mongo.connect(url, function(err, client) {
    if(!err) {
      console.log("We are connected");
      db = client.db('Cells');
    }
        db.collection('cells').insertOne({
          name:req.body.name
          ,screen:req.body.screen
          ,memo:req.body.memo
          ,bat:req.body.bat
          ,ram:req.body.ram
          ,img:req.body.img
        }, function(err, result){
          assert.equal(null, err);
          if (err) return console.log(err)
          console.log("Item inserted");
          res.status(201).send(result);
          client.close();
        });

  });
  
});

router.delete('/V1/Cell/', function(req, res, next) {
  var id = req.body.id;
  mongo.connect(url, function(err, client) {
    if(!err) {
      console.log("We are connected");
      db = client.db('Cells');
    }
    db.collection('cells').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      if (err) return console.log(err)
      console.log('Item deleted');
      res.status(204).send(result);
      client.close();
    });
  });
});


router.put('/V1/Cell/', function(req, res, next) {
  var id = req.body._id;
  const item = {
    name : req.body.name,
    screen : req.body.screen,
    memo : req.body.memo,
    bat : req.body.bat,
    ram : req.body.ram,
    img : req.body.img
  }
  mongo.connect(url, function(err, client) {
    if(!err) {
      console.log("We are connected");
      db = client.db('Cells');
    }
    db.collection('cells').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      res.status(204).send(item);
      client.close();
    });
  });
});

module.exports = router;
