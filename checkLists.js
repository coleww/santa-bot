var Twit = require('twit')
var config = require('./config')

var T = new Twit(config.twitter)

T.get('lists/members', {owner_screen_name: 'santaBot5000', slug: 'nice'}, function (err, list, res){
  check(list)
  T.get('lists/members', {owner_screen_name: 'santaBot5000', slug: 'naughty'}, function (err, list, res){
    check(list)
    T.get('lists/members', {owner_screen_name: 'santaBot5000', slug: 'nice'}, function (err, list, res){
      check(list)
      T.get('lists/members', {owner_screen_name: 'santaBot5000', slug: 'naughty'}, function (err, list, res){
        check(list)
      })
    })
  })
})
 
function check (list) {
  console.log(list.users.map(function (u) {return u.screen_name})) 
}
