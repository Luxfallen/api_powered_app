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
    subclass: ['Knowledge Domain', 'Life Domain', 'Light Domain', 'Nature Domain', 'Tempest Domain', 'Trickery Domain', 'War Domain']
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

var prepFields = function prepFields(select) {
  // This is too messy! Figure out away to clean it up!
  var raceVal = document.querySelector('#race').value;
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
      if (raceVal === 'Half-Elf' || raceVal === 'Half-Orc' || raceVal === 'Tiefling') {
        break;
      }
      choices.races.forEach(function (element) {
        if (document.querySelector('#race').value === element.race) {
          element.subrace.forEach(function (sub) {
            var opt = document.createElement('option');
            opt.value = sub;
            opt.innerHTML = sub;
            select.appendChild(opt);
          }, undefined);
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
          element.subclass.forEach(function (sub) {
            var opt = document.createElement('option');
            opt.value = sub;
            opt.innerHTML = sub;
            select.appendChild(opt);
          }, undefined);
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

var fillForm = function fillForm(c) {
  document.querySelector('#charName').value = c.name;
  document.querySelector('#race').value = c.race;
  prepFields(document.querySelector('#subrace'));
  document.querySelector('#subrace').value = c.subrace;
  document.querySelector('#class').value = c.class;
  prepFields(document.querySelector('#subclass'));
  document.querySelector('#subclass').value = c.subclass;
  document.querySelector('#alignment').value = c.alignment;
  document.querySelector('#level').value = c.level;
  document.querySelector('#background').value = c.background;
  document.querySelector('#trait1').value = c.traits[0];
  document.querySelector('#trait2').value = c.traits[1];
  document.querySelector('#ideal').value = c.ideal;
  document.querySelector('#bond').value = c.bond;
  document.querySelector('#flaw').value = c.flaw;
  document.querySelector('#feat').value = c.feat;

  document.querySelector('#str').value = c.scores[0];
  document.querySelector('#dex').value = c.scores[1];
  document.querySelector('#con').value = c.scores[2];
  document.querySelector('#int').value = c.scores[3];
  document.querySelector('#wis').value = c.scores[4];
  document.querySelector('#cha').value = c.scores[5];

  var lang = document.querySelectorAll("[name='languages']");
  for (var i = 0; i < lang.length; i++) {
    for (var j = 0; j < c.languages.length; j++) {
      if (lang[i].value === c.languages[j]) {
        lang[i].checked = true;
      }
    }
  }
  /*
  c.languages.forEach((element) => {
    document.querySelector(`#${element.toLowerCase}`).checked = true;
  }, this);
  */
};

var sortCharResponse = function sortCharResponse(chars) {
  document.querySelector('#feedback').innerHTML = '';
  var res = document.querySelector('#results');
  if (chars.length === 0) {
    document.querySelector('#feedback').innerHTML = 'Sorry, no matches!';
  }
  for (var i = 0; i < chars.length; i++) {
    // console.log('Prep append.');
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = chars[i].name;
    res.appendChild(opt);
  }
  res.onchange = function (e) {
    fillForm(chars[e.target.value]);
  };
};

var handleResponse = function handleResponse(xhr) {
  // const content = document.querySelector('#content');
  // Need to manage when HEAD gets sent back!!
  switch (xhr.status) {
    case 200:
    case 201:
      console.log('Success!');
      break;
    case 204:
      // content.innerHTML = 'The character entry has been updated!';
      break;
    case 304:
      console.log('Currently up-to-date.');
      break;
    case 400:
      console.log('User error.');
      break;
    case 404:
      console.log('Not found.');
      break;
    default:
      console.log('Status not implemented by client');
      break;
  }
  if (xhr.response) {
    var obj = JSON.parse(xhr.response);
    if (obj.message) {
      console.dir(obj);
    } else if (obj.chars) {
      sortCharResponse(obj.chars);
    }
  }
};

var makePost = function makePost(e, form) {
  // region *** retrieval ***
  var name = form.querySelector('#charName').value;
  var race = form.querySelector('#race').value;
  var subrace = form.querySelector('#subrace').value;
  var charClass = form.querySelector('#class').value;
  var subclass = form.querySelector('#subclass').value;
  var alignment = form.querySelector('#alignment').value;
  var level = form.querySelector('#level').value;
  var background = form.querySelector('#background').value;
  var trait1 = form.querySelector('#trait1').value;
  var trait2 = form.querySelector('#trait2').value;
  var traits = [trait1, trait2];
  var ideal = form.querySelector('#ideal').value;
  var bond = form.querySelector('#bond').value;
  var flaw = form.querySelector('#flaw').value;
  var feat = form.querySelector('#feat').value;
  // These two are going to be tricky...
  var langs = form.querySelectorAll("[name='languages']");
  var languages = [];
  langs.forEach(function (element) {
    if (element.checked) {
      languages.push(element.value);
    }
  }, undefined);
  var sts = form.querySelectorAll("[name='stat']");
  var stats = [];
  sts.forEach(function (element) {
    stats.push(element.value);
  }, undefined);
  // endregion
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/addChar');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function () {
    return handleResponse(xhr);
  };

  var data = 'name=' + name + '&race=' + race + '&subrace=' + subrace + '&class=' + charClass + '&subclass=' + subclass + '&level=' + level + '&background=' + background + '&alignment=' + alignment + '&traits=' + [traits] + '&ideal=' + ideal + '&bond=' + bond + '&flaw=' + flaw + '&feat=' + feat + '&languages=' + languages + '&stats=' + stats;
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

var init = function init() {
  var bg = document.querySelector('#background');
  var feat = document.querySelector('#feat');
  var race = document.querySelector('#race');
  var sRace = document.querySelector('#subrace');
  var charClass = document.querySelector('#class');
  var sClass = document.querySelector('#subclass');
  var align = document.querySelector('#alignment');
  prepFields(bg);
  prepFields(feat);
  prepFields(race);
  prepFields(charClass);
  prepFields(align);
  var prepSubRace = function prepSubRace() {
    sRace.innerHTML = '';
    prepFields(sRace);
  };
  race.addEventListener('change', prepSubRace);
  var prepSubClass = function prepSubClass() {
    sClass.innerHTML = '';
    prepFields(sClass);
  };
  charClass.addEventListener('change', prepSubClass);

  var queryForm = document.querySelector('#queryForm');
  var getChar = function getChar(e) {
    return makeCharRequest(e, queryForm);
  };
  queryForm.addEventListener('submit', getChar);

  var charForm = document.querySelector('#charForm');
  var post = function post(e) {
    e.preventDefault();
    makePost(e, charForm);
  };
  charForm.addEventListener('submit', post);
};

window.onload = init;
