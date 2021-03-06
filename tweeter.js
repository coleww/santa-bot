var Twit = require('twit')
var config = require('./config')
var T = new Twit(config.twitter)
var sentiment = require('sentiment')
var fs = require('fs')

var redis = require('redis')
var client = redis.createClient()

var replyInterval = config.replyInterval

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


client.lpop('santafy', function (err, user) {
  console.log('popping', user)
  if (err) {
    console.log(err)
    client.end()
    throw "a party"
  } else if (user !== null) {
    var t = JSON.parse(user)
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
  } else {
    // OH, OF COURSE!
    client.end()
    throw "a party"
  }
})


// // popQueue modified from sorting-bot by Darius Kazemi
// // https://github.com/dariusk/sorting-bot/blob/master/index.js
//
// Copyright (c) 2015 Kazemi, Darius

// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
