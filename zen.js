var request = require('request')
  , _ = require('underscore')
  , messages = []
  , limit = 10000
  , requests = 0;

function getZen() {
  request('https://api.github.com/zen', function(err, res, body) {
    ++requests;
    if (err || requests === limit) { return; }

    if (res.statusCode === 403) {
      console.log("403. wait.. think.. breathe...");
      setTimeout(getZen, 5 * 60 * 1000);
      return;
    }

    if (!_.include(messages, body)) {
      messages.push(body);
      console.log(body);
    }
    setTimeout(getZen, 1000);
  });
}

getZen();
