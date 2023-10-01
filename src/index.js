import { fetchBreeds, fetchCatByBreed } from './cat-api';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  function addOptionsToSelect(breeds) {
    const options = breeds.map(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      return option;
    });
    breedSelect.append(...options);
  }


  function breedResponse() {
    loader.style.display = 'block';
    fetchBreeds()
    .then(breeds => {
      addOptionsToSelect(breeds)
    })
    .catch(() => {
      error.classList.add('show');
    })
    .finally(() => {
      loader.style.display = 'none';
    })
  }

  breedResponse();

  function updateCatInfo(cat) {
    catInfo.innerHTML = `
      <h2>${cat.breeds[0].name}</h2>
      <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
      <img src="${cat.url}" alt="${cat.breeds[0].name}" />
    `;
    catInfo.style.display = 'block';
  }
  
  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;
  
    catInfo.style.display = 'none';
    loader.style.display = 'block';
  
    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        const [cat] = catData;
        updateCatInfo(cat);
      })
      .catch(() => {
        error.classList.add('show');
        catInfo.style.display = 'none';
      })
      .finally(() => {
        loader.style.display = 'none';
      });
  });
});
