let nameField = document.getElementById("name");
let commentField = document.getElementById("user_comment");
let commentList = [];

function newComment() {
  if (nameField.value.length && commentField.value.length) {
    document.getElementById("comment_btn").disabled = false;
  } else {
    document.getElementById("comment_btn").disabled = true;
  }
}

function addComment() {
  const fullName = nameField.value;
  const userComment = commentField.value;
  const currentDate = new Date();
  const contentList = {
    fullName: fullName,
    userComment: userComment,
    date: currentDate.toLocaleString(),
  };

  commentList.push(contentList);
  showComments();
}

function showComments() {
  const commentContainer = document.querySelector("#new_comment_container");
  commentContainer.innerHTML = "";
  for (const comment of commentList) {
    let commentDetails = document.createElement("div");
    commentDetails.classList.add("comment-details");

    let userImg = document.createElement("img");
    userImg.src = "images/avatar.png";
    userImg.alt = "User image";

    let author = document.createElement("span");
    let commentContent = document.createElement("p");
    let commentDate = document.createElement("p");

    author.classList.add("comment-author");
    commentContent.classList.add("comment-text");

    author.textContent = comment.fullName;
    commentContent.textContent = comment.userComment;
    commentDate.textContent = comment.date;

    let likeButton = document.createElement("button");
    likeButton.classList.add("like-button");
    likeButton.textContent = "Like";

    let replyButton = document.createElement("button");
    replyButton.classList.add("reply-button");
    replyButton.textContent = "Reply";

    commentDetails.append(author);
    commentDetails.append(commentContent);
    commentDetails.append(commentDate);
    commentDetails.append(likeButton);
    commentDetails.append(replyButton);

    let commentSection = document.createElement("div");
    commentSection.classList.add("comment");
    commentSection.append(userImg);
    commentSection.append(commentDetails);
    commentContainer.appendChild(commentSection);

    nameField.value = "";
    commentField.value = "";
    document.querySelector("#comment_btn").disabled = true;
  }
}

function ascendingOrder() {
  commentList.sort((commentA, commentB) => {
    const commentADate = new Date(commentA.date);
    const commentBDate = new Date(commentB.date);
    return commentADate - commentBDate;
  });

  showComments();
}

function descendingOrder() {
  commentList.sort((commentA, commentB) => {
    const commentADate = new Date(commentA.date);
    const commentBDate = new Date(commentB.date);
    return commentBDate - commentADate;
  });

  showComments();
}

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
          if (!data.length) { 
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
            document.querySelector(".result").innerHTML = `
                <p>Country doesn't exist</p>`;
            document.querySelector(".region-countries").innerHTML = ""
        });
}

submit.addEventListener("click", getData);