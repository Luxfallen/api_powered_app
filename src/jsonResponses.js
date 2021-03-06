const crypto = require('crypto');
const deepArr = require('../hosted/chars.js');

/*
  !! Change of plans! Character builds, not characters! !!
  Characters consist of:
    - Name
    - Race
      - Subrace
    - Alignment
    - Size  // N/a - determined by race
    - Speed // N/a - determined by race / feat
    - HP  // N/a - based off of class
    - Class (array)
      - Subclass
    - Level (array)
    - Background
    - Languages // MIGHT remove... - race/background
    - Proficiencies // N/a - class/race/background
    - Scores
    - Feats
    - Age // N/a
*/

const charArr = deepArr.charArr.chars;
let etag = crypto.createHash('sha1').update(JSON.stringify(charArr));
let digest = etag.digest('hex');

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
  const results = [];
  for (let i = 0; i < charArr.length; i++) {
    if (params.name && charArr[i].name.toLowerCase() === params.name) {
      results.push(charArr[i]);
    } else if (params.race && charArr[i].race.toLowerCase() === params.race) {
      results.push(charArr[i]);
    } else if (params.class && charArr[i].class.main.toLowerCase() === params.class) {
      results.push(charArr[i]);
    }
  }
  return {
    chars: results,
  };
};

const customParse = (arr) => {
  const newArr = [];
  let j = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === ',') {
      j++;
    } else if (arr[i] !== '') {
      if (!newArr[j]) {
        newArr[j] = arr[i];
      } else {
        newArr[j] += arr[i];
      }
    }
  }
  return newArr;
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
const characterPOST = (request, response, params) => {
  let code = 400;
  if (!params.name || params.name === '') {
    respondJSON(request, response, code, {
      id: 'missingParameter',
      message: 'Name is a necessary parameter.',
    });
  }
  let c;
  for (let i = 0; i < charArr.length; i++) {
    if (charArr[i].name === params.name) {
      c = charArr[i];
      code = 204;
    }
  } if (!c) {
    code = 201;
    c = {};
    c.name = params.name;
  }
  c.race = params.race;
  c.subrace = params.subrace;
  c.alignment = params.alignment;
  c.class = params.class;
  c.subclass = params.subclass;
  c.level = params.level;
  c.background = params.background;
  c.traits = customParse(params.traits);
  c.ideal = params.ideal;
  c.bond = params.bond;
  c.flaw = params.flaw;
  c.languages = [];
  const tempLang = customParse(params.languages);
  for (let i = 0; i < tempLang.length; i++) {
    c.languages.push(tempLang[i]);
  }
  c.scores = [];
  const tempScore = customParse(params.stats);
  for (let i = 0; i < tempScore.length; i++) {
    c.scores.push(tempScore[i]);
  }
  c.feat = params.feat;
  if (code === 201) {
    charArr.push(c);
  }
  etag = crypto.createHash('sha1').update(JSON.stringify(charArr));
  digest = etag.digest('hex');
  console.dir(charArr);
  if (code === 204) {
    return respondMeta(request, response, code);
  }
  return respondJSON(request, response, code, {
    id: 'addSuccess',
    message: 'Character added successfully',
  });
};

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
