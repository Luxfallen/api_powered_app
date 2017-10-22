'use strict';

/* eslint-disable no-undef */

var choices = {
  alignment: ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil', 'Unaligned'],
  races: [{
    race: 'Dwarf',
    subrace: ['Hill', 'Mountain']
  }, {
    race: 'Elf',
    subrace: ['High', 'Wood', 'Dark']
  }, {
    race: 'Halfling',
    subrace: ['Lightfoot', 'Stout']
  }, {
    race: 'Human',
    subrace: ['Calishite', 'Chondathan', 'Damaran', 'Illuskan', 'Mulan', 'Rashemi', 'Shou', 'Tethyrian', 'Turami']
  }, {
    race: 'Dragonborn',
    subrace: ['Black', 'Blue', 'Brass', 'Bronze', 'Copper', 'Gold', 'Green', 'Red', 'Silver', 'White']
  }, {
    race: 'Gnome',
    subrace: ['Forest', 'Rock']
  }, {
    race: 'Half-Elf'
  }, {
    race: 'Half-Orc'
  }, {
    race: 'Tiefling'
  }],
  classes: [{
    class: 'Barbarian',
    subclass: ['Path of the Berserker', 'Path of the Totem Warrior']
  }, {
    class: 'Bard',
    subclass: ['College of Lore', 'College of Valor']
  }, {
    class: 'Cleric',
    subclass: ['Knowledge Domain', 'Life Domain', 'Light Domain', 'Nature Domain', 'Tempest Domain', 'trickery Domain', 'War Domain']
  }, {
    class: 'Druid',
    subclass: ['Circle of the Land', 'Circle of the Moon']
  }, {
    class: 'Fighter',
    subclass: ['Champion', 'Battle Master', 'Eldritch Knight']
  }, {
    class: 'Monk',
    subclass: ['Way of the Open Hand', 'Way of Shadow', 'Way of the Four Elements']
  }, {
    class: 'Paladin',
    subclass: ['Oath of Devotion', 'Oath of Ancients', 'Oath of Vengeance']
  }, {
    class: 'Ranger',
    subclass: ['Hunter', 'Beast Master']
  }, {
    class: 'Rogue',
    subclass: ['Thief', 'Assassin', 'Arcane Trickster']
  }, {
    class: 'Sorcerer',
    subclass: ['Draconic Bloodline', 'Wild Magic']
  }, {
    class: 'Warlock',
    subclass: ['The Archfey', 'The Fiend', 'The Great Old One']
  }, {
    class: 'Wizard',
    subclass: ['School of Abjuration', 'School of Conjuration', 'School of Enchantment', 'School of Evocation', 'School of Illusion', 'School of Necromancy', 'School of Transmutation']
  }],
  background: ['Acolyte', 'Charlatan', 'Criminal', 'Entertainer', 'Folk Hero', 'Guild Artisan', 'Hermit', 'Noble', 'Outlander', 'Sage', 'Sailor', 'Soldier', 'Urchin'],
  feats: ['Alert', 'Athlete', 'Actor', 'Charger', 'Crossbow Expert', 'Defensive Duelist', 'Dual Wielder', 'Dungeon Delver', 'Durable', 'Elemental Adept', 'Grappler', 'Great Weapon Master', 'Healer', 'Heavily Armored', 'Heavy Armor Master', 'Inspiring Leader', 'Keen Mind', 'Lightly Armored', 'Linguist', 'Lucky', 'Mage Slayer', 'Magic Initiate', 'Martial Adept', 'Medium Armor Master', 'Mobile', 'Moderately Armored', 'Mounted Combatant', 'Observant', 'Polearm Master', 'Resilient', 'Ritual Caster', 'Savage Attacker', 'Sentinel', 'Sharpshooter', 'Shield Master', 'Skilled', 'Skulker', 'Spell Sniper', 'Tavern Brawler', 'Tough', 'War Caster', 'Weapon Master']
};

var sortCharResponse = function sortCharResponse(chars) {
  var res = document.querySelector('#results');
  for (var i = 0; i < chars.length; i++) {
    // console.log('Prep append.');
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
  // console.log(obj);
  if (obj.message) {
    // console.dir(obj);
  } else if (obj.chars) {
    sortCharResponse(obj.chars);
  } else {
    content.innerHTML += xhr.response;
  }
};

// !!! High Priority
var makePost = function makePost(e, form) {
  var name = document.querySelector('#charName').value;
  var race = document.querySelector('#race').value;
  var subrace = document.querySelector('#subrace').value;
  var charClass = document.querySelector('#class').value;
  var subclass = document.querySelector('#subclass').value;
  var level = document.querySelector('#level').value;
  var background = document.querySelector('#background').value;
  var trait1 = document.querySelector('#trait1').value;
  var trait2 = document.querySelector('#trait2').value;
  var ideal = document.querySelector('#idea').value;
  var bond = document.querySelector('#bond').value;
  var flaw = document.querySelector('#flaw').value;
  var feat = document.querySelector('#feat').value;
  // These two are going to be tricky...
  var langs = document.querySelectorAll("[name='languages']");
  var languages = [];
  langs.forEach(function (element) {
    languages.push(element.value);
  }, undefined);
  var sts = document.querySelectorAll("[name='stat']");
  var stats = [];
  sts.forEach(function (element) {
    stats.push(element.value);
  }, undefined);

  var xhr = new XMLHttpRequest();
  xhr.open(method, action);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function () {
    return handleResponse(xhr);
  };

  var data = 'name=' + name + '&race=' + race + '&subrace=' + subrace + '&class=' + charClass + '&\n    subclass=' + subclass + '&level=' + level + '&background=' + background + '&alignment=' + alignment + '&\n    traits=' + [trait1, trait2] + '&ideal=' + ideal + '&bond=' + bond + '&flaw=' + flaw + '&\n    feat=' + feat + '&languages=' + languages + '&stats=' + stats;
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

var prepFields = function prepFields(select) {
  // This is too messy! Figure out away to clean it up!
  switch (select.id) {
    case 'race':
      choices.races.forEach(function (element) {
        var opt = document.createElement('option');
        opt.value = element.race;
        opt.innerHTML = element.race;
        select.appendChild(opt);
      }, undefined);
      break;
    case 'subrace':
      choices.races.forEach(function (element) {
        if (document.querySelector('#race').value === element.race) {
          var opt = document.createElement('option');
          opt.value = element.subrace;
          opt.innerHTML = element.subrace;
          select.appendChild(opt);
        }
      }, undefined);
      break;
    case 'class':
      choices.classes.forEach(function (element) {
        var opt = document.createElement('option');
        opt.value = element.class;
        opt.innerHTML = element.class;
        select.appendChild(opt);
      }, undefined);
      break;
    case 'subclass':
      choices.classes.forEach(function (element) {
        if (document.querySelector('#class').value === element.class) {
          var opt = document.createElement('option');
          opt.value = element.subclass;
          opt.innerHTML = element.subclass;
          select.appendChild(opt);
        }
      }, undefined);
      break;
    case 'feat':
      choices.feats.forEach(function (element) {
        var opt = document.createElement('option');
        opt.value = element;
        opt.innerHTML = element;
        select.appendChild(opt);
      }, undefined);
      break;
    case 'alignment':
      choices.alignment.forEach(function (element) {
        var opt = document.createElement('option');
        opt.value = element;
        opt.innerHTML = element;
        select.appendChild(opt);
      }, undefined);
      break;
    case 'background':
      choices.background.forEach(function (element) {
        var opt = document.createElement('option');
        opt.value = element;
        opt.innerHTML = element;
        select.appendChild(opt);
      }, undefined);
      break;
    default:
      break;
  }
};

var init = function init() {
  prepFields(document.querySelector('#background'));
  prepFields(document.querySelector('#feat'));
  prepFields(document.querySelector('#race'));
  prepFields(document.querySelector('#class'));
  document.querySelector('#subrace').onchange = prepFields(e);
  document.querySelector('#subclass').onchange = prepFields(e);

  var queryForm = document.querySelector('#queryForm');
  var getChar = function getChar(e) {
    return makeCharRequest(e, queryForm);
  };
  queryForm.addEventListener('submit', getChar);

  var charForm = document.querySelector('#charForm');
  var post = function post(e) {
    return makePost(e, charForm);
  };
  charForm.addEventListener('submit', post);
};

window.onload = init;
