let $schemeControll = document.getElementById('shemas-panel');
let $schemes = $schemeControll.getElementsByClassName('schemas__scheme');

Array.from($schemes).forEach(scheme => {
  scheme.addEventListener('click', e => {
    getSchemeData(e.currentTarget.getAttribute('schemeName'));
  });
});

const SHEMES = {
  movies: 'movies',
  comics: 'comics',
  tv: 'tv',
  characters: 'characters',
  news: 'news',
  shop: 'shop'
};

function getSchemeData(shemeName) {
  fetch(`/${SHEMES[shemeName]}/all`, { method: 'POST' })
    .then(resolve => {
      console.log(resolve);
    })
    .catch(console.error);
}

//*****************************************************

let adminPanel = new AdminPanelController(document.querySelector('main.content'));
let adminTypes = adminPanel.Types;

let CharacterSchema = adminPanel.addScheme('characters', {
  name: {
    type: adminTypes.STRING
  },
  pseudo_name: {
    type: adminTypes.STRING
  },
  universe: {
    type: adminTypes.STRING
  }
}, () => {
  fetch('/characters/get', { method: 'POST' })
    .then(response => {
      console.log(response.json());
      return response.json();
    })
    .then(data => data);
});

CharacterSchema.addOperation('create', { visible: ['name', 'pseudo_name'] });
CharacterSchema.addOperation('edit', { unwritable: ['universe'] }, {
  afterCreate: (fields) => {
    field.forEach(field => setData(field));
  },
});
CharacterSchema.addOperation('delete', { invisible: ['name'], modal: true, open_text: "you realy want to delete this character?"});

console.log("DELETE:", CharacterSchema.use('delete'));
console.log("EDIT:", CharacterSchema.use('edit'));
console.log("CREATE:", CharacterSchema.use('create'));

let UserSchema = adminPanel.addScheme('users');
let ComicsChema = adminPanel.addScheme('comics');
let MovieSchema = adminPanel.addScheme('movies');
let TVChema = adminPanel.addScheme('tv');
let NewsChema = adminPanel.addScheme('news');
let GoodSchema = adminPanel.addScheme('goods');
let VideoChema = adminPanel.addScheme('videos');
let ImageSchema = adminPanel.addScheme('images');

adminPanel.init();
