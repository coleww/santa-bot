var Twit = require('twit')
var config = require('./config')
var T = new Twit(config.twitter)
var stream = T.stream('user')
var redis = require('redis')
var client = redis.createClient()

stream.on('follow', function (t) {
  console.log(t)
  client.rpush('santafy', JSON.stringify({target: t.source.screen_name, id_str: t.source.id_str}), redis.print)
})
