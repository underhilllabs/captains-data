// initialize our faux database
var data = {
  "captains": [
    {"name": "Jean-Luc Picard","image": "img/picard.jpg", "source": "Star Trek: TNG", "votes": 2, index: 0}
    , {"name": "James Tiberius Kirk","image": "img/kirk.jpg", "source": "Star Trek: TOS", "votes": 0, index: 1}
    , {"name": "Kathryn Janeway", "image": "img/janeway.jpg", "source": "Star Trek Voyager ", "votes": 0, index: 2}
    , {"name": "Hikaru Sulu", "image": "img/sulu.jpg", "source": "Star Trek Movies", "votes": 1, index: 3}
    , {"name": "Mal Reynolds","image": "img/mal.jpg", "source": "Firefly", "votes": 4, index: 4}
    , {"name": "Worf, Son of Mogh","image": "img/worf.jpg", "source": "Star Trek: DSN", "votes": 0, index: 5}
    , {"name": "Benjamin Sisko","image": "img/sisko.jpg", "source": "Star Trek: DSN", "votes": 0, index: 6}
    , {"name": "Han Solo","image": "img/solo.jpg", "source": "Star Wars", "votes": 0, index: 7}
  ]
};

// GET

exports.captains = function (req, res) {
  var captains = [];
  data.captains.forEach(function (post, i) {
    captains.push({
      id: i,
      name: post.name,
      image: post.image,
      source: post.source,
      votes: post.votes,
      index: post.index,
    });
  });
  res.type('application/json');
  res.jsonp({
    captains: data.captains
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
  captain = {name: req.body.cptName, image: req.body.cptUrl, source: req.body.cptSource, votes: req.body.votes, index: req.body.index};
  data.captains.push(captain);
  //data.captains.push(req.body);

  res.json(req.body);
};
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
