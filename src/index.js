import './css/styles.css';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
import API from './js/fetch-countries.js';
import getRefs from './js/get-refs.js';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evn) {
  evn.preventDefault();
  const searchQuery = evn.target.value.trim();
  console.log(evn.target.value);
  clearMarkup();

  if (searchQuery) {
    API.fetchCountries(searchQuery)
        .then(makeMarkup)
        .catch(onFetchError);
  }
}

function makeMarkup(countries) {
  if (countries.length === 1) {
    renderMarkupItem(countries);
  } else if (countries.length >= 2 && countries.length <= 10) {
    renderMarkupList(countries);
  } else {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  return;
}

function renderMarkupList(countries) {
  const markupList = countries
    .map(({ name, flags }) => {
      return `<li class="country-item">
                <img src="${flags.svg}" width="36" height="24" alt="${name}">
                <h2 class="country-item-title">${name.official}</h2>
             </li>`;
    })
    .join('');
  refs.countryList.innerHTML = markupList;
}

function renderMarkupItem(countries) {
  const markupItem = countries
    .map(({ name, flags, capital, population, languages }) => {
      const languagesList = Object.values(languages).join(', ');
      return `<div class="country-item-wrap">
                  <img src="${flags.svg}" width="36" height="24" alt="${name}">
                  <h2 class="country-item-title">${name.official}</h2>
               </div>
               <p><b>Capital:</b>${capital}</p>
               <p><b>Population:</b>${population}</p>
               <p><b>Languages:</b>${languagesList}</p>`;
    })
    .join('');
  refs.countryItem.innerHTML = markupItem; //refs.countryItem.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  refs.countryItem.innerHTML = '';
  refs.countryList.innerHTML = '';
}

function onFetchError(error) {
  console.error(error);
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
