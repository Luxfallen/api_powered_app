const sortCharResponse = (chars) => {
  const res = document.querySelector('#results');
  for (let i = 0; i < chars.length; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = chars[i].name;
    res.appendChild(opt);
  }
  res.onchange = (e) => {
    document.querySelector('#content').innerHTML += JSON.stringify([e.target.value]);
  }
}

const handleResponse = (xhr, parseResponse) => {
  const content = document.querySelector("#content");
  if (parseResponse) {
    const obj = JSON.parse(xhr.response);
    if (obj.message) {
      console.dir(obj);
    } else if (obj.chars) {
      sortCharResponse(obj.chars);
    } else {
      content.innerHTML += xhr.response;
    }
  }
};

const makePost = (e, form) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, action);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = () => handleResponse(xhr, true);
  xhr.send(data);
  e.preventDefault();
  return false;
}

const makeCharRequest = (e, form) => {
  const xhr = new XMLHttpRequest();
  const type = form.querySelector('#queryType').value;
  const input = form.querySelector('#query').value.toLowerCase();
  const url = `/getChar?${type}=${input}`;
  xhr.open('GET', url);
  xhr.onload = () => handleResponse(xhr, true);
  xhr.send();
  e.preventDefault();
  return false;
};

const makeDataRequest = (e, form) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  e.preventDefault();
  return false;
};

const init = () => {
  const queryForm = document.querySelector('#queryForm');
  const getChar = (e) => makeCharRequest(e, queryForm);
  queryForm.addEventListener('submit', getChar);
};

window.onload = init;
