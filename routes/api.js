// initialize our faux database
var mongoose = require('mongoose');
var CaptainModel = mongoose.model('Captain');
var data = {};
//var data = {
//  "captains": [
//    {"name": "Jean-Luc Picard","image": "img/picard.jpg", "source": "Star Trek: TNG", "votes": 2, index: 0}
//    , {"name": "James Tiberius Kirk","image": "img/kirk.jpg", "source": "Star Trek: TOS", "votes": 0, index: 1}
//    , {"name": "Kathryn Janeway", "image": "img/janeway.jpg", "source": "Star Trek Voyager ", "votes": 0, index: 2}
//    , {"name": "Hikaru Sulu", "image": "img/sulu.jpg", "source": "Star Trek Movies", "votes": 1, index: 3}
//    , {"name": "Mal Reynolds","image": "img/mal.jpg", "source": "Firefly", "votes": 4, index: 4}
//    , {"name": "Worf, Son of Mogh","image": "img/worf.jpg", "source": "Star Trek: DSN", "votes": 0, index: 5}
//    , {"name": "Benjamin Sisko","image": "img/sisko.jpg", "source": "Star Trek: DSN", "votes": 0, index: 6}
//    , {"name": "Han Solo","image": "img/solo.jpg", "source": "Star Wars", "votes": 0, index: 7}
//  ]
//};

// GET

exports.captains = function (req, res) {
  var captainsArr = [];
  CaptainModel.find({}, function(err, docs) {
    for (i = 0; i < docs.length; i++) {
      captainsArr.push({
        id: i,
        name: docs[i].name,
        image: docs[i].image,
        source: docs[i].source,
        votes: docs[i].votes,
        index: docs[i].index,
      });
      console.log("name: " + docs[i].name);
    }
    res.type('application/json');
    res.jsonp({
      captains: captainsArr
    });
  });
};

exports.captain = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.captains.length) {
    res.json({
      captain: data.captains[id]
    });
  } else {
    res.json(false);
  }
};
exports.addCaptain = function(req, res) {
  // POST
  console.log("received post! -> " + req.body.cptName);
  captain = new CaptainModel({
    name: req.body.cptName,
    image: req.body.cptUrl,
    source: req.body.cptSource,
    votes: req.body.votes,
    index: req.body.index
  });
  captain.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  //captain = {name: req.body.cptName, image: req.body.cptUrl, source: req.body.cptSource, votes: req.body.votes, index: req.body.index};
  //data.captains.push(captain);
  //data.captains.push(req.body);

  res.json(req.body);
};
// PUT
exports.updateCaptain = function(req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.captains.length) {
    //captain = {name: req.body.cptName, image: req.body.cptUrl, source: req.body.cptSource, votes: req.body.votes, index: req.body.index};
    data.captains[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
}
