const searchButton = document.querySelector("#searchButton");

searchButton.addEventListener("click", () => {
  const textBoxValue = document.querySelector("input").value;

  const countryData = {
    countryRegion: "",
    countryInfo: {},
    regionData: [],
  };

  fetch(`https://restcountries.com/v3.1/name/${textBoxValue}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const country = data[0];
        countryData.countryRegion = country.region;
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

        const regionAPI = `https://restcountries.com/v3.1/region/${countryData.countryRegion}`;
        return fetch(regionAPI);
      } else {
        throw new Error("Country not found");
      }
    })
    .then((response) => response.json())
    .then((regionData) => {
      countryData.regionData = regionData;

      const resultHTML = `
        <h3>Country Information</h3>
        <img src="${countryData.countryInfo.flag}"/>
        <p>Country Name: ${countryData.countryInfo.name}</p>
        <p>Population: ${countryData.countryInfo.population}</p>
        <p>Area: ${countryData.countryInfo.area}</p>
        <p>Currencies: ${Object.values(countryData.countryInfo.currencies)
          .map((curr) => `${curr.name} (${curr.symbol})`)
          .join(", ")}</p>
        <p>Capital City: ${countryData.countryInfo.capital}</p>
        <p>Region: ${countryData.countryInfo.region}</p>`;

      document.querySelector(".result").innerHTML = resultHTML;

      const countriesInRegionHTML = regionData
        .map(
          (country) => `
          <div>
            <img src="${country.flags?.png}" 
            alt="${country.name.common} Flag" />
            <p>${country.name.common}</p>
          </div>`
        )
        .join("");

      document.querySelector(".region-countries").innerHTML = `
        <h3 class="region-title">Countries in the Same Region</h3>
        <div class="countries-container">${countriesInRegionHTML}</div>`;
    })
    .then(undefined, () => {
      document.querySelector(
        ".result"
      ).innerHTML = `<p>Country doesn't exist</p>`;
      document.querySelector(".region-countries").innerHTML = "";
    });
});
