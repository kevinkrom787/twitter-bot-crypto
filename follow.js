var Twit = require( 'twit' );
var config = require('./config.js');
var T = new Twit(config);

const followPeeps = () => {
  const params = {
    q: 'nodejs',
    count: 10,
    result_type: 'popular',
    lang: 'en'
  }
  
  T.get('search/tweets', params, function(err, data, response) {
    if (!err) {
      for (let i = 0; i < data.statuses.length; i++) {
        let screen_name = data.statuses[i].user.screen_name;
        T.post('friendships/create', {screen_name}, function(err, response) {
          if (err) {
            console.log(err)
          } else {
            console.log(screen_name, ': **FOLLOWED**');
          }
        });
      }
    } else {
      console.log(err)
    }
  })
}
followPeeps()