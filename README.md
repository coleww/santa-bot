SANTA-BOT
-----------------------

a [twitter bot](https://twitter.com/santaBot5000) that runs sentiment analysis on the tweets of it's followers and puts them on the appropriate list based on the average positivity/negativity levels.




# development

- `npm install`
- `redis-server` in a new terminal tab
- ummm i think like, comment out the t.post calls everywhere when testing and instead just make it console.log (oh did i not do the config.live thing? probably not, nope))
- grab some api keys for a bot and put them in the config
- `node watcher.js` in a new terminal tab
- follow the bot account with another account. nice u should see something in the watcher logs
- run `node tweeter.js` in yet another terminal. it should, like, post the numbers and stuff idk check the source


-----------------------------------------

[popQueue](https://github.com/coleww/santa-bot/blob/master/tweeter.js#L34-L75)modified from [sorting-bot](https://github.com/dariusk/sorting-bot/blob/master/index.js) by [Darius Kazemi](http://tinysubversions.com/)
