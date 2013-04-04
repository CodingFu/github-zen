#!/usr/local/bin/node

var request = require('request')
  , _ = require('underscore')
  , api = 'https://api.github.com/zen'
  , opts = {}
  , messages = [];

function getZen() {
  request(api, opts, function(err, res, body) {
    if (err) { return; }

    if (res.statusCode !== 200 || res.headers['x-ratelimit-remaining'] < 1) {
      process.stderr.write("Your are out of tries for now. Breathe\n");
      process.exit(0);
    }

    if (!_.include(messages, body)) {
      messages.push(body);
      console.log(body);
    }
    getZen();
  });
}

// Help or auth
if (process.argv.length > 2) {
  var arg = process.argv[2];
  
  if (!/^[^\-][\-a-zA-Z0-9]+$/.test(arg)) {
    console.log('Usage:\n  ./zen.js\nor\n ./zen.js YourGithubUsername');
    return;
  };

  process.stderr.write("Password: ");
  process.stdin.resume();

  process.stdin.on("data", function(chunk) {
    process.stdin.pause(); 
    opts = {
      "auth": {
        "user": arg,
        "pass": chunk.toString().slice(0, -1) //trailing \n is removed
      }
    };
    getZen();
  });

  return;
}

getZen();
