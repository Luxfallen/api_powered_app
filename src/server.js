const http = require('http');
const url = require('url');
const query = require('querystring');
const jsonHandler = require('./jsonResponses.js');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  const params = query.parse(parsedURL.query);
  if (request.method === 'GET' || request.method === 'HEAD') {
    switch (parsedURL.pathname) {
      case '/':
      case 'client.html':
        htmlHandler.getIndex(request, response);
        break;
      case '/style.css':
        htmlHandler.getStyle(request, response);
        break;
      case '/bundle.js':
        htmlHandler.getBundle(request, response);
        break;
      case '/getChar':
        jsonHandler.characterGET(request, response, params);
        break;
      default:
        jsonHandler.notFound(request, response);
        break;
    }
  } else if (request.method === 'POST') {
    // Temporary until POST Character is finished
    if (parsedURL.pathname === '/addChar') {
      const res = response;
      const body = [];
      // If there's an error, immediately end and send
      request.on('error', (err) => {
        console.dir(err);
        res.statusCode = 400;
        res.end();
      });
      // Comes in a stream, so add it chunk by chunk
      request.on('data', (chunk) => {
        body.push(chunk);
      });
      // When that's all done...
      request.on('end', () => {
        const bodyString = Buffer.concat(body).toString();
        const bodyParams = query.parse(bodyString);
        jsonHandler.characterPOST(request, response, bodyParams);
      });
    }
  } else {
    jsonHandler.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1:${port}`);
