import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const API_KEY =
  'live_tyMw3Y3MOvZut9AvTpW7RAiyV7q0vA09CJY2SgGxcv2g4qrJp1zi52QoNNTVf16I';
const URL = 'https://api.thecatapi.com/v1';
export function fetchBreeds() {
    Loading.dots()
;

    return fetch(`${URL}/breeds?api_key=${API_KEY}`).then(resp => {
      
    if (!resp.ok) {
      throw  Notify.failure(
        `${resp.status}`);
    }
    return resp.json();
  });
}

export function fetchCatByBreed(breedId) {
    Loading.dots();

  return fetch(
    `${URL}/images/search?has_breeds=1&breed_ids=${breedId}&api_key=${API_KEY}`
  ).then(resp => {
    if (!resp.ok) {
      throw Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    }
    return resp.json();
  });
}
