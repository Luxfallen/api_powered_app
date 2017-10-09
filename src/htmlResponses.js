const fs = require('fs'); // pull in the file system module

// const index = fs.readFileSync(`${__dirname}/../hosted/client.html`);

const getIndex = (request, response) => {
  fs.readFile(`${__dirname}/../hosted/client.html`, (err, data) => {
    response.writeHead(200, {
      'Content-Type': 'text/html',
    });
    response.write(data);
    response.end();
  });
};

const getBundle = (request, response) => {
  fs.readFile(`${__dirname}/../hosted/bundle.js`, (err, data) => {
    response.writeHead(200, {
      'Content-Type': 'application/javascript',
    });
    response.write(data);
    response.end();
  });
};

const getStyle = (request, response) => {
  fs.readFile(`${__dirname}/../hosted/bundle.js`, (err, data) => {
    response.writeHead(200, {
      'Content-Type': 'text/css',
    });
    response.write(data);
    response.end();
  });
};

module.exports = {
  getIndex,
  getBundle,
  getStyle,
};
