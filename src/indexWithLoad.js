import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catEl: document.querySelector('.cat-info'),
};

refs.select.addEventListener('change', onSelect);

fetchBreeds()
  .then(breeds => (refs.select.innerHTML = markupSelect(breeds)))
  .catch(err => {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    return console.log(err);
  })
  .finally(() => Loading.remove());

function markupSelect(breeds) {
  return `${breeds
    .map(
      ({ id, name }) =>
        `<option value="${id}">${name}</option>
`
    )
    .join('')}`;
}

function onSelect(e) {
  const { value: id } = e.target;
  fetchCatByBreed(id)
    .then(catArr => {
      refs.catEl.classList.add('decorCat');
      return markupCet(catArr, id);
    })
    .catch(err => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      return console.log(err);
    })
    .finally(() => Loading.remove());
}

function markupCet(catArr, id) {
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
