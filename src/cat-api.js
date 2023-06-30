const URL = 'https://api.thecatapi.com/v1/breeds';
const IMAGE_URL = 'https://api.thecatapi.com/v1/images/search';
const API_KEY =
  'live_sfDaviWI97WzsSRdqeBob6K7q7LL6QzQUOWP98eYkpyLl6pPgX3ErO0hx0fZohYp';

function fetchBreeds() {
  return fetch(URL, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Произошла ошибка при выполнении запроса');
      }
      return response.json();
    })
    .then(data => {
      return data.map(({ id, name }) => ({ id, name }));
    })
    .catch(error => {
      console.log('Ошибка:', error.message);
      throw error;
    });
}

function fetchCatByBreed(breedId) {
  const url = `${IMAGE_URL}?breed_ids=${breedId}`;

  return fetch(url, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Произошла ошибка при выполнении запроса');
      }
      return response.json();
    })
    .then(data => {
      return data[0]; // Возвращаем первый объект из массива
    })
    .catch(error => {
      console.log('Ошибка:', error.message);
      throw error;
    });
}

export { fetchBreeds, fetchCatByBreed };
