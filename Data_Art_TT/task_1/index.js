const API_URL_ALL = 'https://restcountries.eu/rest/v2/all';
const API_URL_REGION = 'https://restcountries.eu/rest/v2/region';
const READY_STATE = 4;
const OK_STATUS = 200;
const infoBlock = document.getElementById('infoBlock');

getCountries();

function getCurrencies(currenciesArray) {
  const currencies = [];

  for (let i = 0; i < currenciesArray.length; i++) {
    currencies.push(`${currenciesArray[i].code} ${currenciesArray[i].symbol}`);
  }

  return currencies.join(', ');
}

function getTranslations(translationsObj) {
  const translations=[];

  for (let key in translationsObj) {
    translations.push(`&nbsp;&nbsp;${key}: ${translationsObj[key]}`);
  }

  return translations.join('<br />');
}

function drawCountry(country) {
  const countryCard = document.createElement('div');

  countryCard.className = 'card border-light text-white bg-info mb-3';
  countryCard.innerHTML = `
          <img src="${country.flag}" class="card-img-top" alt="flag">
          <div class="card-body">
            <h4 class="card-title text-center text-uppercase font-weight-bold">${country.name}</h4>
            <p class="card-text">
              <b>Capital:</b> ${country.capital}<br />
              <b>Region:</b> ${country.region}<br />
              <b>Population:</b> ${country.population}<br />
              <b>Timezones:</b> ${country.timezones.join(', ')}<br />
              <b>Currencies:</b> ${getCurrencies(country.currencies)}<br />
              <b>Translations:</b><br />${getTranslations(country.translations)}
            </p>
          </div>`;

  infoBlock.appendChild(countryCard);
}

function getCountries() {
  const xhrGET = new XMLHttpRequest();

  xhrGET.open('GET', API_URL_ALL);
  xhrGET.send();
  xhrGET.onreadystatechange = function () {
    if (xhrGET.readyState === READY_STATE && xhrGET.status === OK_STATUS) {
      const allCountries = JSON.parse(xhrGET.response);
      for (let i = 0; i < allCountries.length; i++) {
        drawCountry(allCountries[i]);
      }
    }
  }
}

const toggles = document.getElementsByName('region');

Array.from(toggles).forEach(toggle =>{
  toggle.onclick=()=>{
    if(toggle.checked){
      getCountriesByRegion(toggle.value);
    }
  }
})

function getCountriesByRegion (region){
  const xhrFilter = new XMLHttpRequest();

  xhrFilter.open('GET', `${API_URL_REGION}/${region}`);
  xhrFilter.send();
  xhrFilter.onreadystatechange = function () {
    if (xhrFilter.readyState === READY_STATE && xhrFilter.status === OK_STATUS) {
      const filteredCountries = JSON.parse(xhrFilter.response);
      infoBlock.innerHTML='';
      for (let i = 0; i < filteredCountries.length; i++) {
        drawCountry(filteredCountries[i]);
      }
    }
  }
}