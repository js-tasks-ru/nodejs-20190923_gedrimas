const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs')
const LimitSizeStream = require('./LimitSizeStream')

const limitSizeStream = new LimitSizeStream({ limit: 1000 })
const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'POST':

      if(pathname.indexOf('/') >= 0) {
        res.statusCode = 400
        res.end()
      }

      const readStream = fs.createReadStream(filepath)
      readStream.on('open', function() {
        res.statusCode = 409
        res.end('File already exist')
        return
      })

      const dataPieces = []
      req.on('data', (buffer) => {
        dataPieces.push(buffer)
      })

      const writeStream = fs.createWriteStream(filepath)
      //req.pipe(writeStream)

      writeStream.on('error', function (err) {
        console.log(err);
      });

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
