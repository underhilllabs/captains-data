// initialize MongoDB 
var mongoose = require('mongoose');
var CaptainModel = mongoose.model('Captain');
var captainsArr = [];
var data = {};

// GET /api/captains -> all captain
exports.captains = function (req, res) {
  // need to reset array each time this function is called.
  captainsArr = [];
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

// GET /api/captain/:id
exports.captain = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.captains.length) {
    res.json({
      captain: captainsArr[id]
    });
  } else {
    res.json(false);
  }
};

// POST /api/captain
exports.addCaptain = function(req, res) {
  // POST
  console.log("received post! -> " + req.body.cptName);
  captain = new CaptainModel({
    name: req.body.cptName,
    image: req.body.cptUrl,
    source: req.body.cptSource,
    votes: req.body.votes,
    index: req.body.idx
  });
  captain.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  captainsArr[idx] = captain;

  res.json(req.body);
};

// PUT /api/captain/:id
exports.updateCaptain = function(req, res) {
  var id = req.params.id;
  if (id >= 0 && id < captainsArr.length) {
    captainsArr[id] = req.body;
    CaptainModel.findOne({'index': id}, function (err, cptn) {
      if (err) console.log("no findOne for you! " + err);
      cptn.votes = req.body.votes;
      console.log(cptn.name + " has " + cptn.votes + " votes!");
      cptn.save(function (err) {
        if (err) console.log(err);
        res.send(cptn);
      });
    });
    res.json(true);
  } else {
    res.json(false);
  }
}
