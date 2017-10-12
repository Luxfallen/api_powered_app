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
    jsonHandler.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1:${port}`);
