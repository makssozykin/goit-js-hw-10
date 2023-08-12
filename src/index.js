import axios from "axios";
import './style.css';
import { fetchBreeds, fetchBreedById } from "./cat-api";
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

axios.defaults.headers.common["x-api-key"] =
    "live_AInBiZNMGTspPJow6eVuTFhnUUqlCCv9K3ia4eMvA7myxAvI8V3zJkjb4kF1xzmt";


const refs = {
    select: document.querySelector(".breed-select"),
    loader: document.querySelector(".loader"),
    error: document.querySelector(".error"),
    container: document.querySelector(".cat-info"),
};


function slimSelect() { 
    new SlimSelect({
        select: refs.select,
    });
}

refs.select.classList.add('is-hidden');
refs.container.classList.add('is-hidden');
refs.error.classList.add('is-hidden');
refs.loader.textContent = '';


fetchBreeds().then(data => {
    refs.select.innerHTML = createList(data);
    slimSelect();
    refs.select.classList.remove('is-hidden');
    refs.loader.classList.replace('loader', 'is-hidden');
})
    .catch(fetchError);

refs.select.addEventListener('change', onSelect);

function onSelect(e) { 
    refs.loader.classList.replace('is-hidden', 'loader');
    refs.select.classList.add('is-hidden');
    refs.container.classList.add('is-hidden');

    const breedId = e.currentTarget.value;

    fetchBreedById(breedId).then(data => {
        refs.loader.classList.replace('loader','is-hidden');
        refs.select.classList.remove('is-hidden');

        createMarkup(data);

        refs.container.classList.remove('is-hidden');
    })
        .catch(fetchError);
}

function createList(arr) {
    return arr.map(({ id, name }) => `<option value="${id}">${name}</option>`)
        .join('');
}

function createMarkup(data) {
    const card = data.map(el => {
        return `<img src="${el.url}" alt="${el.breeds[0].name}"/><h2>${el.breeds[0].name}</h2><p>${el.breeds[0].description}</p><h3>Temperament</h3><p>${el.breeds[0].temperament}</p>`;
    })
        .join('');
    refs.container.innerHTML = card;
}

function fetchError() { 
    refs.select.classList.remove('is-hidden');
    refs.loader.classList.replace('loader','is-hidden');


    Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 1000,
      width: '400px',
      fontSize: '24px',
    }
  );
}