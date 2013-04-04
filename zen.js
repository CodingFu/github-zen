var request = require('request')
  , _ = require('underscore')
  , messages = []
  , limit = 10000
  , i = 0;

function getZen() {
  request('https://api.github.com/zen', function(err, res, body) {
    if (err || res.statusCode === 403 || i === limit) { return; }
    if (!_.include(messages, body)) {
      messages.push(body);
      console.log(body);
    }
    setTimeout(getZen, 300);
  });
}

getZen();
