import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';
import './style.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

axios.defaults.headers.common['x-api-key'] =
  'live_eSDqpwcopAalFSs8R7JouU8rzUDVV0WSNJfG9vqs9qv9Zb0rNWD8l7p05hdlIZdU';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

function slim() {
  new SlimSelect({
    select: refs.select,
  });
}

refs.error.classList.add('is-hidden');
refs.loader.classList.add('is-hidden');
refs.catInfo.classList.add('is-hidden');

fetchBreeds()
  .then(data => {
    refs.select.innerHTML = createList(data);
    slim();

    refs.loader.classList.remove('hidden');
  })
  .catch(onError);

refs.select.addEventListener('change', selectedBreeds);

function selectedBreeds(event) {
  event.preventDefault();

  refs.loader.classList.remove('is-hidden');
  refs.loader.classList.add('loader');
  refs.loader.textContent ="";

  refs.catInfo.classList.add('is-hidden');

  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      createMarkup(data);

      refs.loader.classList.add('is-hidden');
      refs.loader.classList.remove('loader');
      refs.catInfo.classList.remove('is-hidden');
      
    })
    .catch(onError);
}

function createList(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function createMarkup(data) {
  const markupCard = data
    .map(el => {
      return `<img src="${el.url}" alt="${el.breeds[0].name}" width="400"/><li><h2>${el.breeds[0].name}</h2><p>${el.breeds[0].description}</p><h3>Temperament:</h3><p>${el.breeds[0].temperament}</p></li>`;
    })
    .join('');
  refs.catInfo.innerHTML = markupCard;
}

function onError(error) {
  refs.loader.classList.add('is-hidden');


  Report.warning(
    '',
    "Oops! Something went wrong! Try reloading the page or select another cat breed'"
  );
}
