/* eslint-disable no-undef */

const choices = {
  alignment: ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil', 'Unaligned'],
  races: [{
    race: 'Dwarf',
    subrace: ['Hill', 'Mountain'],
  }, {
    race: 'Elf',
    subrace: ['High', 'Wood', 'Dark'],
  }, {
    race: 'Halfling',
    subrace: ['Lightfoot', 'Stout'],
  }, {
    race: 'Human',
    subrace: ['Calishite', 'Chondathan', 'Damaran', 'Illuskan', 'Mulan', 'Rashemi', 'Shou', 'Tethyrian', 'Turami'],
  }, {
    race: 'Dragonborn',
    subrace: ['Black', 'Blue', 'Brass', 'Bronze', 'Copper', 'Gold', 'Green', 'Red', 'Silver', 'White'],
  }, {
    race: 'Gnome',
    subrace: ['Forest', 'Rock'],
  }, {
    race: 'Half-Elf',
  }, {
    race: 'Half-Orc',
  }, {
    race: 'Tiefling',
  }],
  classes: [{
    class: 'Barbarian',
    subclass: ['Path of the Berserker', 'Path of the Totem Warrior'],
  }, {
    class: 'Bard',
    subclass: ['College of Lore', 'College of Valor'],
  }, {
    class: 'Cleric',
    subclass: ['Knowledge Domain', 'Life Domain', 'Light Domain', 'Nature Domain', 'Tempest Domain', 'Trickery Domain', 'War Domain'],
  }, {
    class: 'Druid',
    subclass: ['Circle of the Land', 'Circle of the Moon'],
  }, {
    class: 'Fighter',
    subclass: ['Champion', 'Battle Master', 'Eldritch Knight'],
  }, {
    class: 'Monk',
    subclass: ['Way of the Open Hand', 'Way of Shadow', 'Way of the Four Elements'],
  }, {
    class: 'Paladin',
    subclass: ['Oath of Devotion', 'Oath of Ancients', 'Oath of Vengeance'],
  }, {
    class: 'Ranger',
    subclass: ['Hunter', 'Beast Master'],
  }, {
    class: 'Rogue',
    subclass: ['Thief', 'Assassin', 'Arcane Trickster'],
  }, {
    class: 'Sorcerer',
    subclass: ['Draconic Bloodline', 'Wild Magic'],
  }, {
    class: 'Warlock',
    subclass: ['The Archfey', 'The Fiend', 'The Great Old One'],
  }, {
    class: 'Wizard',
    subclass: ['School of Abjuration', 'School of Conjuration', 'School of Enchantment', 'School of Evocation', 'School of Illusion', 'School of Necromancy', 'School of Transmutation'],
  }],
  background: ['Acolyte', 'Charlatan', 'Criminal', 'Entertainer', 'Folk Hero', 'Guild Artisan', 'Hermit', 'Noble', 'Outlander', 'Sage', 'Sailor', 'Soldier', 'Urchin'],
  feats: ['Alert', 'Athlete', 'Actor', 'Charger', 'Crossbow Expert', 'Defensive Duelist', 'Dual Wielder', 'Dungeon Delver', 'Durable', 'Elemental Adept', 'Grappler', 'Great Weapon Master', 'Healer', 'Heavily Armored', 'Heavy Armor Master', 'Inspiring Leader', 'Keen Mind', 'Lightly Armored', 'Linguist', 'Lucky', 'Mage Slayer', 'Magic Initiate', 'Martial Adept', 'Medium Armor Master', 'Mobile', 'Moderately Armored', 'Mounted Combatant', 'Observant', 'Polearm Master', 'Resilient', 'Ritual Caster', 'Savage Attacker', 'Sentinel', 'Sharpshooter', 'Shield Master', 'Skilled', 'Skulker', 'Spell Sniper', 'Tavern Brawler', 'Tough', 'War Caster', 'Weapon Master'],
};

const prepFields = (select) => {
  // This is too messy! Figure out away to clean it up!
  const raceVal = document.querySelector('#race').value;
  switch (select.id) {
    case 'race':
      choices.races.forEach((element) => {
        const opt = document.createElement('option');
        opt.value = element.race;
        opt.innerHTML = element.race;
        select.appendChild(opt);
      }, this);
      break;
    case 'subrace':
      if (raceVal === 'Half-Elf' || raceVal === 'Half-Orc' || raceVal === 'Tiefling') {
        break;
      }
      choices.races.forEach((element) => {
        if (document.querySelector('#race').value === element.race) {
          element.subrace.forEach((sub) => {
            const opt = document.createElement('option');
            opt.value = sub;
            opt.innerHTML = sub;
            select.appendChild(opt);
          }, this);
        }
      }, this);
      break;
    case 'class':
      choices.classes.forEach((element) => {
        const opt = document.createElement('option');
        opt.value = element.class;
        opt.innerHTML = element.class;
        select.appendChild(opt);
      }, this);
      break;
    case 'subclass':
      choices.classes.forEach((element) => {
        if (document.querySelector('#class').value === element.class) {
          element.subclass.forEach((sub) => {
            const opt = document.createElement('option');
            opt.value = sub;
            opt.innerHTML = sub;
            select.appendChild(opt);
          }, this);
        }
      }, this);
      break;
    case 'feat':
      choices.feats.forEach((element) => {
        const opt = document.createElement('option');
        opt.value = element;
        opt.innerHTML = element;
        select.appendChild(opt);
      }, this);
      break;
    case 'alignment':
      choices.alignment.forEach((element) => {
        const opt = document.createElement('option');
        opt.value = element;
        opt.innerHTML = element;
        select.appendChild(opt);
      }, this);
      break;
    case 'background':
      choices.background.forEach((element) => {
        const opt = document.createElement('option');
        opt.value = element;
        opt.innerHTML = element;
        select.appendChild(opt);
      }, this);
      break;
    default:
      break;
  }
};

const fillForm = (c) => {
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

  const lang = document.querySelectorAll("[name='languages']");
  for (let i = 0; i < lang.length; i++) {
    for (let j = 0; j < c.languages.length; j++) {
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

const sortCharResponse = (chars) => {
  document.querySelector('#feedback').innerHTML = '';
  const res = document.querySelector('#results');
  if (chars.length === 0) {
    document.querySelector('#feedback').innerHTML = 'Sorry, no matches!';
  }
  for (let i = 0; i < chars.length; i++) {
    // console.log('Prep append.');
    const opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = chars[i].name;
    res.appendChild(opt);
  }
  res.onchange = (e) => {
    fillForm(chars[e.target.value]);
  };
};

const handleResponse = (xhr) => {
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
    const obj = JSON.parse(xhr.response);
    if (obj.message) {
      console.dir(obj);
    } else if (obj.chars) {
      sortCharResponse(obj.chars);
    }
  }
};

const makePost = (e, form) => {
  // region *** retrieval ***
  const name = form.querySelector('#charName').value;
  const race = form.querySelector('#race').value;
  const subrace = form.querySelector('#subrace').value;
  const charClass = form.querySelector('#class').value;
  const subclass = form.querySelector('#subclass').value;
  const alignment = form.querySelector('#alignment').value;
  const level = form.querySelector('#level').value;
  const background = form.querySelector('#background').value;
  const trait1 = form.querySelector('#trait1').value;
  const trait2 = form.querySelector('#trait2').value;
  const traits = [trait1, trait2];
  const ideal = form.querySelector('#ideal').value;
  const bond = form.querySelector('#bond').value;
  const flaw = form.querySelector('#flaw').value;
  const feat = form.querySelector('#feat').value;
  // These two are going to be tricky...
  const langs = form.querySelectorAll("[name='languages']");
  const languages = [];
  langs.forEach((element) => {
    if (element.checked) {
      languages.push(element.value);
    }
  }, this);
  const sts = form.querySelectorAll("[name='stat']");
  const stats = [];
  sts.forEach((element) => {
    stats.push(element.value);
  }, this);
  // endregion
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/addChar');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = () => handleResponse(xhr);

  const data = `name=${name}&race=${race}&subrace=${subrace}&class=${charClass}&subclass=${subclass}&level=${level}&background=${background}&alignment=${alignment}&traits=${[traits]}&ideal=${ideal}&bond=${bond}&flaw=${flaw}&feat=${feat}&languages=${languages}&stats=${stats}`;
  xhr.send(data);
  e.preventDefault();
  return false;
};

const makeCharRequest = (e, form) => {
  const xhr = new XMLHttpRequest();
  const type = form.querySelector('#queryType').value;
  const input = form.querySelector('#query').value.toLowerCase();
  const url = `/getChar?${type}=${input}`;
  xhr.open('GET', url);
  xhr.onload = () => handleResponse(xhr);
  xhr.send();
  e.preventDefault();
  return false;
};

const init = () => {
  const bg = document.querySelector('#background');
  const feat = document.querySelector('#feat');
  const race = document.querySelector('#race');
  const sRace = document.querySelector('#subrace');
  const charClass = document.querySelector('#class');
  const sClass = document.querySelector('#subclass');
  const align = document.querySelector('#alignment');
  prepFields(bg);
  prepFields(feat);
  prepFields(race);
  prepFields(charClass);
  prepFields(align);
  const prepSubRace = () => {
    sRace.innerHTML = '';
    prepFields(sRace);
  };
  race.addEventListener('change', prepSubRace);
  const prepSubClass = () => {
    sClass.innerHTML = '';
    prepFields(sClass);
  };
  charClass.addEventListener('change', prepSubClass);

  const queryForm = document.querySelector('#queryForm');
  const getChar = e => makeCharRequest(e, queryForm);
  queryForm.addEventListener('submit', getChar);

  const charForm = document.querySelector('#charForm');
  const post = (e) => {
    e.preventDefault();
    makePost(e, charForm);
  };
  charForm.addEventListener('submit', post);
};

window.onload = init;
