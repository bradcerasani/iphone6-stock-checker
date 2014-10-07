var https = require('https');
var HueApi = require("node-hue-api").HueApi;
var spawn = require('child_process').spawn;

// Canadian iPhone 6 and 6 Plus models
// MG3A2CL/A = iPhone 6 16GB Space Grey
// MG3H2CL/A = iPhone 6 64GB Space Grey
// MG3E2CL/A = iPhone 6 128GB Space Grey
// MG3D2CL/A = iPhone 6 16GB Gold
// MG3L2CL/A = iPhone 6 64GB Gold
// MG3G2CL/A = iPhone 6 128GB Gold
// MG3C2CL/A = iPhone 6 16GB Silver
// MG3K2CL/A = iPhone 6 64GB Silver
// MG3F2CL/A = iPhone 6 128GB Silver

// MG9M2CL/A = iPhone 6 Plus 16GB Space Grey
// MG9U2CL/A = iPhone 6 Plus 64GB Space Grey
// MG9Q2CL/A = iPhone 6 Plus 128GB Space Grey
// MG9P2CL/A = iPhone 6 Plus 16GB Gold
// MG9W2CL/A = iPhone 6 Plus 64GB Gold
// MG9T2CL/A = iPhone 6 Plus 128GB Gold
// MG9N2CL/A = iPhone 6 Plus 16GB Silver
// MG9V2CL/A = iPhone 6 Plus 64GB Silver
// MG9R2CL/A = iPhone 6 Plus 128GB Silver

// Availability endpoints for Apple Stores in Canada
var reservations = "https://reserve.cdn-apple.com/CA/en_CA/reserve/iPhone/availability";
var url = "https://reserve.cdn-apple.com/CA/en_CA/reserve/iPhone/availability.json";
var model = "MG3K2CL/A";
var store = "R369"; // https://reserve.cdn-apple.com/CA/en_CA/reserve/iPhone/stores.json
var interval = 300000; // Check every 5 minutes

// Phillips Hue Config
var host = "192.168.100.100";
var username = "2be3a5131caf4a6f64ec40b112de7";
var api = new HueApi(host, username);

// Flash lights green for 10 seconds
var state = {
  "on": true,
  "bri": 254,
  "hue": 25000,
  "sat": 254,
  "alert": "lselect"
};

function displayError(err) {
  console.error(err);
}

function getDateTime() {
  var date = new Date();
  var hour = date.getHours();
  var min  = date.getMinutes();
  var sec  = date.getSeconds();

  return hour + ":" + min + ":" + sec;
}

function hueNotify() {
  api.setGroupLightState(0, state);
}

function success() {
  console.log("Success!");
  spawn('open', [reservations]);
  hueNotify();
}

function checkAvailability() {
  console.log("Checking availability...");

  https.get(url, function(res) {
    if (res.statusCode !== 200) {
      console.log("Problem checking stock.");
    }

    res.on('data', function(d) {
      var obj;
      try {
        obj = JSON.parse(d);
      } catch(e) {
        displayError(e);
      }

      if (typeof obj !== 'undefined' && obj[store][model] === true) {
        success();
      } else {
        var time = getDateTime();
        console.log(time + " - No dice. Checking again shortly.");
      }
    });

    }).on('error', displayError);

  setTimeout(checkAvailability, interval);
}

checkAvailability();
