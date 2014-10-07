# iPhone Stock Checker

By default, this app checks for stock of the 64GB iPhone 6 in silver at the Apple Store in Winnipeg, Canada every 5 minutes. If it finds stock, it will flash your Phillips Hue bulbs green for 10 seconds and open up a browser window with the reserve screen.

The source includes model numbers for all iPhone 6 and iPhone 6 Plus models in Canada, and you can view a listing of all Canadian stores [here](https://reserve.cdn-apple.com/CA/en_CA/reserve/iPhone/stores.json).

You'll need a username and host registered with your Hue bridge in order to update the Hue config variables. Learn how to do this with the node-hue-api [here](https://github.com/peter-murray/node-hue-api#registering-without-an-existing-deviceuser-id).

If you don't have Phillips Hue bulbs, remove the api references and customize the `success()` function to notify you as you wish.

### Run it

```js
git clone https://github.com/bradcerasani/iphone6-stock-checker.git
cd iphone6-stock-checker
npm install
node app.js
```

With [PM2](https://github.com/Unitech/pm2) for better process management:

```js
npm install pm2 -g
git clone https://github.com/bradcerasani/iphone6-stock-checker.git
cd iphone6-stock-checker
npm install
pm2 start app.js
```
