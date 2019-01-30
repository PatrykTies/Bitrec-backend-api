#!/usr/bin/env node
'use strict';
 const https = require('https'),
       http = require('http'),
       path = require('path'),
       port = 8043,
       insecurePort = 3000,
       fs = require('fs'),
       certsPath = path.join(__dirname, 'certs', 'server'),
       caCertsPath = path.join(__dirname, 'certs', 'ca');
//
// SSL Certificates
//
const options = {
  key: fs.readFileSync(path.join(certsPath, 'private.key.pem')),
  // This certificate should be a bundle containing your server certificate and any intermediates
  // cat certs/cert.pem certs/chain.pem > certs/server-bundle.pem
  cert: fs.readFileSync(path.join(certsPath, '927c12807ccb73d3.crt')),
  // ca only needs to be specified for peer-certificates
  ca: fs.readFileSync(path.join(caCertsPath, 'gd_bundle-g2-g1.crt')),
  requestCert: false,
  rejectUnauthorized: true
};

//
// Serve an Express App securely with HTTPS
//
const publicDir = path.join(__dirname, 'dist');
const uploadsDir = path.join(__dirname, 'uploads');
var app = require('./app.js').create(port, publicDir, uploadsDir);

var server = https.createServer(options, app);
server.listen(port, ()=>{
  console.log('HTTPS traffic served from port '+ port);
});

//
// Redirect HTTP ot HTTPS
//
// This simply redirects from the current insecure location to the encrypted location
//

var insecureServer = http.createServer();
insecureServer.on('request', (req, res)=> {
  // TODO also redirect websocket upgrades
  res.setHeader(
    'Location',
    'https://' + req.headers.host.replace(/:\d+/, ':' + port) + req.url
  );
  res.statusCode = 302;
  res.end();
});
insecureServer.listen(insecurePort, ()=>{
  console.log("\nRedirecting all http traffic to https\n");
});
