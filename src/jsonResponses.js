const crypto = require('crypto');

/*
  Characters consist of:
    - Name
    - Race
    - Subrace
    - Alignment
    - Size
    - Speed
    - HP
    - Class (array)
      - Subclass
    - Level (array)
    - Background
    - Languages
    - Proficiencies
    - Scores
    - Feats
    - Age
*/

// Until database is implemented...
const chars = [];

const etag = crypto.createHash('sha1').update(JSON.stringify(chars));
const digest = etag.digest('hex');

// region **** Local Use ****
// Format response containing status & object for client
const respondJSON = (request, response, status, obj) => {
  const headers = {
    'Content-Type': 'application/json',
    etag: digest,
  };
  response.writeHead(status, headers);
  response.write(JSON.stringify(obj));
  response.end();
};

// Format metadata response containing status for client
const respondMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
    etag: digest,
  };
  response.writeHead(status, headers);
  response.end();
};

// Check array for matches to query
const searchChars = (params) => {
  let match = false;
  const results = [];
  let i = 0;
  do {
    if (params.name && chars[i].char.name === params.name) {
      match = true;
      results.push(chars[i]);
    } else if (params.race && chars[i].char.race === params.race) {
      results.push(chars[i]);
    } else if (params.class && chars[i].char.class === params.class) {
      results.push(chars[i]);
    }
    i++;
  } while (!match || i < chars.length);
  return results;
};
// endregion

// region **** Exports ****
// GET Character
const characterGET = (request, response, params) => {
  // Client up-to-date
  if (request.headers['if-none-match'] === digest) {
    return respondMeta(request, response, 304);
  }
  // Client not up-to-date
  if (request.method === 'HEAD') {
    return respondMeta(request, response, 200);
  }

  // Check if search has params
  if (params.name || params.race || params.class) {
    // Find character(s) and return
    const obj = searchChars(params);
    return respondJSON(request, response, 200, obj);
  } // If search has no params send err
  if (request.method === 'HEAD') {
    return respondMeta(request, response, 400);
  }
  const obj = {
    message: 'Please use a searchable parameter (name, race, class)',
    id: 'missingParameters',
  };
  return respondJSON(request, response, 400, obj);
};

// POST Character
const characterPOST = (request, response) =>
  // PRIORITY
  respondJSON(request, response, 201, {
    id: 'postSuccess',
    message: 'Character added to library',
  });
// PageNotFound
const notFound = (request, response) => {
  if (request.method === 'HEAD') {
    return respondMeta(request, response, 404);
  }
  const obj = {
    message: 'The page you are looking for is no where to be found.',
    id: 'notFound',
  };
  return respondJSON(request, response, 404, obj);
};
// endregion

module.exports = {
  notFound,
  characterGET,
  characterPOST,
};
