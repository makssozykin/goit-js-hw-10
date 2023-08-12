const BASE_URL = 'https://api.thecatapi.com/v1';
const END_BREEDS = '/breeds?api_key=';
const END_IMAGES = '/images/search?api_key=';
const API_KEY =
    'live_AInBiZNMGTspPJow6eVuTFhnUUqlCCv9K3ia4eMvA7myxAvI8V3zJkjb4kF1xzmt';
let page = 1;
  
function fetchBreeds() { 
    return fetch(`${BASE_URL}${END_BREEDS}${API_KEY}`).then(resp => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return resp.json();
    });
}

function fetchBreedById(breedId) { 
    const params = new URLSearchParams({
        breed_ids: breedId,
    });
    return fetch(`${BASE_URL}/images/search?api_key=${API_KEY}&${params}`).then(resp => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return resp.json();
    });
}

export { fetchBreeds, fetchBreedById };
