const select = document.querySelector(`.breed-select`);
const catInfo = document.querySelector(`.cat-info`);
const error = document.querySelector(`.error`);
const loader = document.querySelector(`.loader`);

function breeds() {
  fetch(
    `https://api.thecatapi.com/v1/breeds?api_key=live_2K884JQZCQr2cI8Fe8NmWaiQvi93eiqvRjuVeQwbUvGLwP5IqxcHs3hKXxjDW2qr`
  )
    .then(response => response.json())
    .then(data => {
      data.map(breed => {
        select.innerHTML += `<option value=${breed.reference_image_id}>${breed.name}</option>`;
      });
      console.log(data);
      return data;
    })
    .catch(error => {
      catInfo.innerHTML = `<p class="error">Ha ocurrido un error: ${error}</p>`;
      console.log(error);
    });
}

const dataAPI = breeds();

select.addEventListener(`change`, event => {
  fetchImage(event.target.value)
    .then(response => {
      loader.style.display = `none`;
      response.json().then(data => {
        console.log(data);

        catInfo.innerHTML = `
      <img class="cat-info cat-image" src=${data.url} alt = "" />
      <div class="cat-description">
      <h2 class="cat-description cat-bread>${data.breeds[0].name}"</h2>
      <p class="cat-description cat-temperament">${data.breeds[0].description}</p>
      <h3 class="cat-description cat-temperament">Temperament</h3>
      <p class="cat-description cat-temperament">${data.breeds[0].temperament}</p>
      </div>`;
      });
    })
    .catch(error => {
      catInfo.innerHTML = `<p class="error">Error: ${error}</p>`;
      console.log(error);
    });
});

function fetchImage(id) {
  loader.style.display = `inline-block`;
  error.style.display = `none`;
  catInfo.innerHTML = ``;

  return fetch(`https://api.thecatapi.com/v1/images/${id}`);
}
