const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// const MongoURI = "mongodb://127.0.0.1:27017";  If you wnat to run it local uncoment
const MongoURI = "mongodb+srv://dbadmin:SuperPassword@clusterproyectodistibuidos-jjbvg.mongodb.net/test?retryWrites=true&w=majority";

var MongoClient = require('mongodb').MongoClient;
var db;

  
MongoClient.connect(MongoURI, { useUnifiedTopology: true, useNewUrlParser: true, },
    function (err, database) {
    if (err) throw err;

    db = database.db("names_db");
});

//Get Names
router.get('/', (req, res) => {
    const names = db.collection("names");
    names.find({}).toArray(function (err, result) {
        if (err){
            res.status(500).send(err);
        } else{
            res.send(result);
        }
    })
});

//Add Names

router.post('/', (req, res) => {
    var name = {
        "name": req.body.name
    };
    const names = db.collection("names");
    names.insertOne(name, function (err, res) {
        if (err) throw err;
    })
    res.status(200).json({message: "Name added successfully"})
})

//Delete Names

router.delete('/:id', (req, res) => {
    const names = db.collection("names")
    names.deleteOne({_id: new mongodb.ObjectID(req.params.id)}, function (err, res) {
        if (err) throw err;
    });
    res.status(200).json({message: "Name deleted successfully"});
})

module.exports = router;
