var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config)


var favoriteTweet = function() {
  var params = {
    q: '#seahawks, #Seahawks, #bitcoin, #BTC ',
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function(err, data) {

    //find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);

    // if random tweet exists
    if (typeof randomTweet != 'undefined') {
      // tell twitter to favorite it!
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response) {
        // if error while fav
        if (err) {
          console.log('shit broke!... error')
        } else {
          console.log('favorited! Great Success')
        }
      });
    }
  });
};

favoriteTweet();

setInterval(favoriteTweet, 3600000);

function ranDom (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

var retweet = function() {
  var params = {
    q: '#nodejs, #Nodejs',
    result_type: 'recent',
    lang: 'en'
  }
  Twitter.get('search/tweets', params, function(err, data) {
    // if no errs
    if (!err) {
      var retweetId = data.statuses[0].id_str;
      // tell twitter to retweet that ishhh
      Twitter.post('statuses/retweet/:id', {
        id: retweetId
      }, function(err, response) {
        if (response) {
          console.log('retweeted!!!');
        }
        // err booo!
        if (err) {
          console.log('something bad happened... dupes?')
        }
      });
    }
    else {
      console.log('error while searching...');
    }
  })
}

retweet();
setInterval(retweet, 9000000);