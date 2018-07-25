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
  fetch(`/${SHEMES[shemeName]}`, { method: 'POST' })
    .then(resolve => {
      console.log(resolve);
    });
}
