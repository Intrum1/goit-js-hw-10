import { fetchBreeds, fetchCatByBreed } from './cat-api';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  fetchBreeds()
    .then(breeds => {
        const options = breeds.map(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        return option;
      });
      breedSelect.append(...options);
    })
    .catch(() => {
      error.classList.add('show');
    });

  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;

    catInfo.style.display = 'none';
    loader.style.display = 'block';

    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        const [cat] = catData;
        catInfo.innerHTML = `
          <h2>${cat.breeds[0].name}</h2>
          <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
          <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
          <img src="${cat.url}" alt="${cat.breeds[0].name}" />
        `;
        catInfo.style.display = 'block';
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
