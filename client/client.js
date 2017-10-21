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
    subclass: ['Knowledge Domain', 'Life Domain', 'Light Domain', 'Nature Domain', 'Tempest Domain', 'trickery Domain', 'War Domain'],
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

const sortCharResponse = (chars) => {
  const res = document.querySelector('#results');
  for (let i = 0; i < chars.length; i++) {
    console.log('Prep append.');
    const opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = chars[i].name;
    res.appendChild(opt);
  }
  res.onchange = (e) => {
    document.querySelector('#content').innerHTML += JSON.stringify(chars[e.target.value]);
  };
};

const handleResponse = (xhr) => {
  const content = document.querySelector('#content');
  const obj = JSON.parse(xhr.response);
  console.log(obj);
  if (obj.message) {
    console.dir(obj);
  } else if (obj.chars) {
    sortCharResponse(obj.chars);
  } else {
    content.innerHTML += xhr.response;
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

const makeDataRequest = (e, form) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  e.preventDefault();
  return false;
};

const prepFields = (select) => {
  switch (select.id || select.class) {
    case 'race':
      choices.races.forEach((element) => {
        const opt = document.createElement('option');
        opt.value = element.race;
        opt.innerHTML = element.race;
        select.appendChild(opt);
      }, this);
      break;
    case 'subrace':
      choices.races.forEach((element) => {
        if (document.querySelector('#race').value === element.race) {
          const opt = document.createElement('option');
          opt.value = element.subrace;
          opt.innerHTML = element.subrace;
          select.appendChild(opt);
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
          const opt = document.createElement('option');
          opt.value = element.subclass;
          opt.innerHTML = element.subclass;
          select.appendChild(opt);
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

const init = () => {
  prepFields(document.querySelector('#race'));

  const queryForm = document.querySelector('#queryForm');
  const getChar = e => makeCharRequest(e, queryForm);
  queryForm.addEventListener('submit', getChar);
};

window.onload = init;
