#!/usr/bin/env node

'use strict';

var http = require('http');

var listenPort = 8080;

if (listenPort == undefined || isNaN(listenPort)) throw new Error('No valid port number specified. Usage: httpsRedirect [portToListenOn]');

console.log('HTTPS Redirector listening on port ' + listenPort);

// Redirect everything to specified port
function newLocation(req) {
  var redirectTo = 'https://' + req.headers.host.replace(/:.*/,'') + req.url;

  console.log('Redirect to: ' + redirectTo);

  return redirectTo;
}

var srv = http.createServer(function (req, res) {
  res.writeHead(301, {'Content-Type': '*/*; charset="UTF-8"', 'Location': newLocation(req), 'Content-Length': 0 });
  res.end();
});

srv.listen(listenPort);
