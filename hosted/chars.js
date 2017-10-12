const charArr = {
  chars: [{
    name: 'Eirikr Fyreborne',
    race: 'Human',
    subrace: 'Illuskan',
    alignment: ['Neutral Good', 'NG'],
    size: 'Medium',
    speed: 30,
    hp_max: 144,
    class: [{
      main: 'paladin',
      subclass: 'oath of devotion',
    }, {
      main: 'sorcerer',
      subclass: 'draconic bloodline',
    }],
    level: [8, 6],
    background: {
      soldier: {
        traits: ['I can stare down a hell hound without flinching.',
          'I face problems head-on.A simple, direct solution is the best path to success.',
        ],
        ideal: 'Our lot is to lay down our lives in defense of others.',
        bond: 'Those who fight beside me are worth dying for.',
        flaw: 'The monstrous enemy we faced in battle still leaves me quivering with fear',
      },
    },
    languages: ['Common', 'Draconic'],
    proficiencies: {
      skill: ['Athletics', 'Intimidation', 'Insight', 'Religion'],
      tool: ['Vehicles (Land)', 'Three Dragon Ante'],
      armor: ['Light', 'Medium', 'Heavy', 'Shields'],
      weapon: ['Simple', 'Martial'],
    },
    scores: [16, 8, 18, 11, 14, 16],
    feat: ['War Caster'],
    age: 43,
  }],
};

module.exports = Object.freeze({
  charArr,
});
