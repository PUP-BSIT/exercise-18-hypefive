const submit = document.querySelector("button");

const getData = () => {
    const txtBox = document.querySelector("input").value;

    const countryData = {
        countryRegion: "",
        countryInfo: "",
        regionData: ""
    };

    fetch(`https://restcountries.com/v3.1/name/${txtBox}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                countryData.countryRegion = data[0]?.region;
                countryData.countryInfo = {
                    name: data[0].name.common,
                    area: data[0].area.toLocaleString(),
                    population: data[0].population.toLocaleString(),
                    languages: data[0].languages,
                    currencies: data[0].currencies,
                    capital: data[0].capital[0],
                    region: data[0].region,
                    flag: data[0].flags.png
                };
                let region = countryData.countryRegion
                let rgnAPI = `https://restcountries.com/v3.1/region/${region}`
                return fetch(rgnAPI);
            } else {
                throw new Error("Country not found");
            }
        })
        .then(response => response.json())
        .then(regionData => {
            countryData.regionData = regionData;

            document.querySelector(".result").innerHTML = `
                <h3>Country Information</h3>
                <img src="${countryData.countryInfo.flag}"/>
                <p>Country Name: ${countryData.countryInfo.name}</p>
                <p>Population: ${countryData.countryInfo.population}</p>
                <p>Area: ${countryData.countryInfo.area}
                <p>Currencies: ${Object.keys(countryData.countryInfo.currencies)
                    .map(currency => {
                       const curr = 
                        countryData.countryInfo.currencies[currency];
                       return `${curr.name} (${curr.symbol})`;
                    }).join(', ')}</p>
                <p>Capital City: ${countryData.countryInfo.capital}</p>
                <p>Region: ${countryData.countryInfo.region}</p>`;

            const countriesInRegionHTML = regionData.map(country => `
                <div>
                    <img 
                        src="${country.flags?.png}" 
                        alt="${country.name.common} Flag" />
                    <p>${country.name.common}</p>
                </div>`).join('');
        
            document.querySelector(".region-countries").innerHTML = `
                <h3 class="region-title">Countries in the Same Region<h3>
                <div class="countries-container">
                    ${countriesInRegionHTML}
                </div>`;
        })
        .catch(() => {
            // Handle error (country not found)
            document.querySelector(".result").innerHTML = `
                <p>Country doesn't exist</p>`;
            document.querySelector(".region-countries").innerHTML = ""
        });
}

submit.addEventListener("click", getData);
