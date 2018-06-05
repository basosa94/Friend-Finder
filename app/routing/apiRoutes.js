//a POST routes /api/friends - this handles incoming survey results. will also used to handle the compatibility logic
//Load Data
var friends = require('../data/friends.js');

module.exports = function(app){
  //a GET route that displays JSON of all possible friends
  app.get('/api/friends', function(req,res){
    res.json(friends);
  });

  app.post('/api/friends', function(req,res){
    //grabs the new friend's scores to compare with friends in friends array
    var friendScores = req.body.scores;
    var total = [];
    var friendCount = 0;
    var closestMatch = 0;

    //runs through all current friends in list
    for(var i=0; i<friends.length; i++){
      var scoresDiff = 0;
      //run through scores to compare friends
      for(var j=0; j<friendScores.length; j++){
        scoresDiff += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(friendScores[j])));
      }

      //push results into total
      total.push(scoresDiff);
    }

    //after all friends are compared, find best match
    for(var i=0; i<total.length; i++){
      if(total[i] <= total[closestMatch]){
        closestMatch = i;
      }
    }

    var match = friends[closestMatch];
    res.json(match);

    friends.push(req.body);
  });
};