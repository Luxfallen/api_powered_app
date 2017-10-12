'use strict';

/* eslint-disable no-undef */

var sortCharResponse = function sortCharResponse(chars) {
  var res = document.querySelector('#results');
  for (var i = 0; i < chars.length; i++) {
    console.log('Prep append.');
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = chars[i].name;
    res.appendChild(opt);
  }
  res.onchange = function (e) {
    document.querySelector('#content').innerHTML += JSON.stringify(chars[e.target.value]);
  };
};

var handleResponse = function handleResponse(xhr) {
  var content = document.querySelector('#content');
  var obj = JSON.parse(xhr.response);
  console.log(obj);
  if (obj.message) {
    console.dir(obj);
  } else if (obj.chars) {
    sortCharResponse(obj.chars);
  } else {
    content.innerHTML += xhr.response;
  }
};

var makePost = function makePost(e, form) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, action);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    return handleResponse(xhr, true);
  };
  xhr.send(data);
  e.preventDefault();
  return false;
};

var makeCharRequest = function makeCharRequest(e, form) {
  var xhr = new XMLHttpRequest();
  var type = form.querySelector('#queryType').value;
  var input = form.querySelector('#query').value.toLowerCase();
  var url = '/getChar?' + type + '=' + input;
  xhr.open('GET', url);
  xhr.onload = function () {
    return handleResponse(xhr);
  };
  xhr.send();
  e.preventDefault();
  return false;
};

var makeDataRequest = function makeDataRequest(e, form) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  e.preventDefault();
  return false;
};

var init = function init() {
  var queryForm = document.querySelector('#queryForm');
  var getChar = function getChar(e) {
    return makeCharRequest(e, queryForm);
  };
  queryForm.addEventListener('submit', getChar);
};

window.onload = init;
