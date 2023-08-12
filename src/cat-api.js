const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';
const BASE_URL = 'https://api.thecatapi.com/v1/images/search';
const API_KEY = 'live_eSDqpwcopAalFSs8R7JouU8rzUDVV0WSNJfG9vqs9qv9Zb0rNWD8l7p05hdlIZdU';




function fetchBreeds() {
  return fetch(`${BREEDS_URL}?api_key=${API_KEY}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
  const params = new URLSearchParams({
    breed_ids: breedId,
  });

  return fetch(`${BASE_URL}?api_key=${API_KEY}&${params}`).then(
    resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    }
  );
}

export { fetchBreeds, fetchCatByBreed };