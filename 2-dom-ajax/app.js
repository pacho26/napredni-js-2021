const reverseCheckbox = document.querySelector('#reverse-checkbox');
const subregionSelect = document.querySelector('#subregion-select');
const limitInput = document.querySelector('#limit');
const refreshBtn = document.querySelector('#refresh-btn');
const addCountryBtn = document.querySelector('#add-country-btn');
const submitFormBtn = document.querySelector('#submit-form-btn');
const getCountriesBtn = document.querySelector('#load-countries-btn');
const tableEl = document.querySelector('table');
const formEl = document.querySelector('form');
const formSection = document.querySelector('#form-section');

let allCountries = [];
let subregionsSet = new Set();
let countryId = 0;

const getCountries = () => {
  const url = 'https://restcountries.com/v3.1/all';

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allCountries = data;
      allCountries.sort((a, b) => b.population - a.population);
      allCountries.forEach((c) => {
        c.id = countryId;
        countryId++;
      });
      refreshSubregions();
      renderCountries(allCountries);
      clearFilter();
    });
};

const clearFilter = () => {
  limitInput.value = '';
  reverseCheckbox.checked = false;
};

const refreshCountries = () => {
  if (allCountries.length > 0) {
    let modifiedCountries = [...allCountries];

    modifiedCountries.sort((a, b) =>
      reverseCheckbox.checked
        ? a.population - b.population
        : b.population - a.population
    );

    const subregion = subregionSelect.value;
    if (subregion !== 'All subregions') {
      modifiedCountries = modifiedCountries.filter(
        (c) => c.subregion === subregion
      );
    }

    if (limitInput.value !== '') {
      modifiedCountries = modifiedCountries.slice(0, limitInput.value);
    }

    renderCountries(modifiedCountries);
  }
};

const clearCountryElements = () => {
  document.querySelectorAll('.country').forEach((c) => c.remove());
};

const showTable = () => {
  tableEl.style.display = 'block';
};

const renderCountries = (countries) => {
  clearCountryElements();
  showTable();

  countries.forEach((c) => {
    tableEl.innerHTML += `
          <tr class="country">
            <td>${c.name.common || ''}</td>
            <td>${c.capital ? c.capital[0] : ''}</td>
            <td>${c.subregion || ''}</td>
            <td>${c.population.toLocaleString() || ''}</td>
            <td class="flag-container">
              <img class="flag" src="${c.flags.png || ''}">
            </td>
            <td>
              <button class="delete-btn" data-id="${c.id}">DELETE</button>
            </td>
          </tr>
          `;
  });
  updateDeleteButtons();
};

const refreshSubregions = () => {
  allCountries.forEach((c) => {
    if (c.subregion) {
      subregionsSet.add(c.subregion);
    }
  });

  subregionsSet = new Set([...subregionsSet].sort());
  document.querySelectorAll('.option').forEach((o) => o.remove());
  subregionsSet.forEach((s) => {
    subregionSelect.innerHTML += `
          <option class="option">${s}</option>
          `;
  });
};

const updateDeleteButtons = () => {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach((btn) =>
    btn.addEventListener('click', (ev) => {
      ev.path[3].deleteRow(0);

      const id = ev.target.getAttribute('data-id');
      allCountries = allCountries.filter((c) => c.id != id);
    })
  );
};

const addCountry = (c) => {
  allCountries.push(c);
  refreshCountries();
  refreshSubregions();
};

const resetForm = () => {
  for (const el of formEl.elements) {
    el.value = '';
    el.style.border = '1px solid #555';
    formSection.style.display = 'none';
    addCountryBtn.style.display = 'block';
  }
};

const checkInputs = (inputs) => {
  let isValid = true;
  inputs.forEach((el, idx) => {
    el.value = el.value.trim();
    formEl.elements[idx].style.border = `2px solid ${
      !el.value ? '#d9534f' : '#01af6f'
    }`;
    if (!el.value) {
      isValid = false;
    }
  });

  return isValid;
};

getCountriesBtn.addEventListener('click', getCountries);
refreshBtn.addEventListener('click', refreshCountries);

addCountryBtn.addEventListener('click', () => {
  formSection.style.display = 'flex';
  addCountryBtn.style.display = 'none';
});

submitFormBtn.addEventListener('click', (ev) => {
  ev.preventDefault();

  const inputFields = [...formEl.elements];
  const isValid = checkInputs(inputFields);

  if (isValid) {
    const newCountry = {
      id: countryId,
      name: { common: inputFields[0].value },
      capital: inputFields[1].value,
      subregion: inputFields[2].value,
      flags: { png: inputFields[3].value },
      population: inputFields[4].value,
    };
    countryId++;

    addCountry(newCountry);
    resetForm();
  }
});
