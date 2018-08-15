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
}, next => {
  fetch('/characters/get', { method: 'POST' })
    .then(response => {
      return response.json();
    })
    .then(data => {
      next(data);
    })
    .catch(err => {
      console.error("server error", err);
      next([{name: {xx: 'sss', xxxx: 'ssss'}}, {'name': 'dsa'}, {name: ['das', 'fds']}]);
    });
});

CharacterSchema.addOperation('create', { visible: ['name', 'pseudo_name'] }, data => {
  console.log("OPERATION CREATE:", data);
});
CharacterSchema.addOperation('edit', {
  unwritable: ['universe'],
  invisible: ['name'],
  afterCreate: operation => {
    operation.insertData({ name: 'wasya1212' });
  }
}, data => {
  console.log("OPERATION UPDATE:", data);
});
CharacterSchema.addOperation('delete', {
  visible: [],
  modal: true,
  openText: "you realy want to delete this character?"
}, data => {
  console.log("OPERATION DELETE:", data);
});

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
