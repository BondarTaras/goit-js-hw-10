const BASE_URL = 'https://restcountries.com/v3.1/';
// function fetchCountries(name) {
//   return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`)
//   .then(response => {
//     if(!response.ok) {
//         throw new Error(response.status);
//     }
//     return response.json()
//   })
//   .catch();
// }

// export default {fetchCountries}


//через async/awaiy
async function fetchCountries(name) {
    try {
    const response = await fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`)
    if(!response.ok) {
        throw new Error(response.status);
    }
    return await response.json()
   } catch(error) {
    console.log(error);
   }
}

export default {fetchCountries}