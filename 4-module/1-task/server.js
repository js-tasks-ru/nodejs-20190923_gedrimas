const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs')

const server = new http.Server();
server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);
  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'GET':
      const readStream = fs.createReadStream(filepath)
      
      readStream.on('error', (e) => {
        res.statusCode = 404;
        res.end()
      })
      
      if(pathname.indexOf('/') >= 0) {
        res.statusCode = 400
        res.end()
      }

      const dataPieces = []
      readStream.on('data', (buffer) => {
        dataPieces.push(buffer)
      })

      readStream.on('end', () => {
        const buffer = Buffer.concat(dataPieces)
        res.statusCode = 200
        res.end(buffer)
      })
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
