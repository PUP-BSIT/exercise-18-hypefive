const submit = document.querySelector("button");
const txtBox = document.querySelector("input");
const result = document.querySelector(".result");
const regionCountries = document.querySelector(".region-countries");

const API_URL = "https://restcountries.com/v3.1";

const countryData = {
  countryRegion: "",
  countryInfo: "",
  regionData: "",
};

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const displayCountryInfo = () => {
  result.innerHTML = `
    <h3>Country Information</h3>
    <img src="${countryData.countryInfo.flag}"/>
    <p>Country Name: ${countryData.countryInfo.name}</p>
    <p>Population: ${countryData.countryInfo.population}</p>
    <p>Area: ${countryData.countryInfo.area}</p>
    <p>Currencies: ${Object.keys(countryData.countryInfo.currencies)
      .map((currency) => {
        const curr = countryData.countryInfo.currencies[currency];
        return `${curr.name} (${curr.symbol})`;
      })
      .join(", ")}</p>
    <p>Capital City: ${countryData.countryInfo.capital}</p>
    <p>Region: ${countryData.countryInfo.region}</p>`;
};

const displayRegionCountries = () => {
  const countriesInRegionHTML = countryData.regionData
    .map(
      (country) => `
    <div>
      <img 
        src="${country.flags?.png}" 
        alt="${country.name.common} Flag" />
      <p>${country.name.common}</p>
    </div>`
    )
    .join("");

  regionCountries.innerHTML = `
    <h3 class="region-title">Countries in the Same Region</h3>
    <div class="countries-container">
      ${countriesInRegionHTML}
    </div>`;
};

const handleError = (error) => {
  result.innerHTML = `
    <p>${error.message}</p>`;
  regionCountries.innerHTML = "";
};

const getData = async () => {
  const txtBoxValue = txtBox.value;

  try {
    const countryDataArray = await fetchData(`name/${txtBoxValue}`);

    if (countryDataArray.length > 0) {
      const country = countryDataArray[0];

      countryData.countryRegion = country?.region;
      countryData.countryInfo = {
        name: country.name.common,
        area: country.area.toLocaleString(),
        population: country.population.toLocaleString(),
        languages: country.languages,
        currencies: country.currencies,
        capital: country.capital[0],
        region: country.region,
        flag: country.flags.png,
      };

      displayCountryInfo();

      const regionDataArray = await fetchData(
        `region/${countryData.countryRegion}`
      );

      countryData.regionData = regionDataArray;

      displayRegionCountries();
    } else {
      throw new Error("Country not found");
    }
  } catch (error) {
    handleError(error);
  }
};

submit.addEventListener("click", getData);
