var t = {}
// replace this with the data from the locked account









var Twit = require('twit')
var config = require('./config')
var T = new Twit(config.twitter)
var sentiment = require('sentiment')
var fs = require('fs')

function naughtyOrNice(un, cb){
  if (un == 'santaBot5000') {
    client.end()
    throw "a party"
  }
  T.get('statuses/user_timeline', {screen_name: un, count: 200}, function(err, targ) {
    // console.log(err, targ)
    var the_tweets = JSON.parse(targ).map(function (l) {return l.text})
    var total = the_tweets.map(function (t) {
      return sentiment(t).score
    }).reduce(function (a, b) {
      return a + b
    }, 0)

    console.log(total, the_tweets.length)
    cb(total / the_tweets.length)
  })
}





    // if not null, check if we've already tweeted at this user recently. no thirsty randos plz
    naughtyOrNice(t.target, function(d){
      var listName = d >= 0.65 ? 'nice' : 'naughty'
      if (config.live) {
        T.post('friendships/create', {screen_name: t.target}, function (e, d, r){
          if (e) {
            console.log(t.id_str, 'replyerr:', e)
            // close connection and program
            client.end()
            throw "a party"
          } else {
            T.post('lists/members/create', {slug: listName, owner_screen_name: 'santaBot5000', user_id: t.id_str}, function (err, data, response) {
              if (err) {
                console.log(t.id_str, 'replyerr:', err)
                // close connection and program
                client.end()
                throw "a party"
              } else {
                // console.log(t.id_str, 'reply:', data)
                client.end()
                throw "A PARTY"
                // record current timestamp for this user
              }
            })
          }
        })
      }
    })

// OTHER DEALINGS IN THE SOFTWARE.
