import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const refs = {
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catEl: document.querySelector('.cat-info'),
};

const select = new SlimSelect({
  select: '#single',
  settings: {
    alwaysOpen: false,
    contentLocation: document.getElementById('local'),
    contentPosition: 'absolute',
    placeholderText: 'gfhsfhg',
    allowDeselect: false,
  },
  events: {
    afterOpen: () => {
      console.log('after open');
    },
    afterChange: e => {
      const catId = e[0].id;
      return onSelect(catId);
    },
  },
});
const option = {
  value: 'id',
  placeholder: true,
};

fetchBreeds()
  .then(breeds => {
    return select.setData(marcupSelect(breeds));
  })
  .catch(err => {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    return console.log(err);
  })
  .finally(() => Loading.remove());

function marcupSelect(breeds) {
  return breeds.map(({ id, name }) => ({ id, text: name }));
}

function onSelect(id) {
  fetchCatByBreed(id)
    .then(catArr => {
      refs.catEl.classList.add('decorCat');
      return marcupCet(catArr, id);
    })
    .catch(err => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      return console.log(err);
    })
    .finally(() => Loading.remove());
}

function marcupCet(catArr, id) {
  return fetchBreeds()
    .then(breeds => breeds.find(cats => cats.id === id))
    .then(
      ({ name, description, origin, temperament }) =>
        (refs.catEl.innerHTML = catArr
          .map(
            ({
              url,
            }) => `<img src=${url} alt="${name}" width="300"><div class="description"><h2>${name}</h2>
      <h3>Origin: ${origin}</h3>
<h3>temperament: ${temperament}</h3>
<h3>Description:</h3>
      <p>${description}</p></div>
`
          )
          .join(''))
    )
    .catch(err => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      return console.log(err);
    });
}
