import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');
const loader = document.querySelector('.loader');

function showLoader() {
  loader.style.display = 'block';
  breedSelect.style.display = 'none';
}

function hideLoader() {
  loader.style.display = 'none';
  breedSelect.style.display = 'block';
}

function showError(message) {
  Notiflix.Notify.failure(message);

}

showLoader();

fetchBreeds()
  .then(breeds => {
    const breedOptions = breeds.map(({ id, name }) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = name;
      return option;
    });
    breedSelect.append(...breedOptions);
    hideLoader();
  })
  .catch(error => {
    console.log('Произошла ошибка:', error);
    hideLoader();
    showError('Oops! Something went wrong! Try reloading the page!');
  });

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  showLoader();

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      catInfo.innerHTML = `
        <img src="${catData.url}" alt="Cat Image" width="700" height="500">
        <h3>${catData.breeds[0].name}</h3>
        <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
      `;
    })
    .catch(error => {
      console.log('Произошла ошибка:', error);
      showError('Oops! Something went wrong!');
    })
    .finally(() => {
      hideLoader();
    });
});