const crypto = require('crypto');
const charArr = require('../hosted/chars.json');

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

// Causes server to wait x ms
// WARNING: UNPROFESSIONAL AF
/*
const sleep = (ms) => {
  const start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > ms) {
      break;
    }
  }
};
*/

const etag = crypto.createHash('sha1').update(JSON.stringify(charArr));
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
    if (params.name && charArr.chars[i].name.toLowerCase() === params.name) {
      match = true;
      results.push(charArr.chars[i]);
    } else if (params.race && charArr.chars[i].race.toLowerCase() === params.race) {
      results.push(charArr.chars[i]);
    } else if (params.class && charArr.chars[i].class.toLowerCase() === params.class) {
      results.push(charArr.chars[i]);
    }
    i++;
  } while (!match || i < charArr.chars.length);
  return {
    chars: results,
  };
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
