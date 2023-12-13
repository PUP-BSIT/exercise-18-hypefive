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
    regionData: "",
  };

  fetch(`https://restcountries.com/v3.1/name/${txtBox}`)
    .then((response) => response.json())
    .then((data) => {
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
          flag: data[0].flags.png, };
        let region = countryData.countryRegion;
        let rgnAPI = `https://restcountries.com/v3.1/region/${region}`;
        return fetch(rgnAPI);
      } else {
        throw new Error("Country not found");
      }
    })
    .then((response) => response.json())
    .then((regionData) => {
      countryData.regionData = regionData;
      document.querySelector(".result").innerHTML = `
                <h3>Country Information</h3>
                <img src="${countryData.countryInfo.flag}"/>
                <p>Country Name: ${countryData.countryInfo.name}</p>
                <p>Population: ${countryData.countryInfo.population}</p>
                <p>Area: ${countryData.countryInfo.area}
                <p>Currencies: ${Object.keys(countryData.countryInfo.currencies)
                  .map((currency) => {
                    const curr = countryData.countryInfo.currencies[currency];
                    return `${curr.name} (${curr.symbol})`;
                  })
                  .join(", ")}</p>
                <p>Capital City: ${countryData.countryInfo.capital}</p>
                <p>Region: ${countryData.countryInfo.region}</p>`;

      const countriesInRegionHTML = regionData
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

      document.querySelector(".region-countries").innerHTML = `
                <h3 class="region-title">Countries in the Same Region<h3>
                <div class="countries-container">
                    ${countriesInRegionHTML}
                </div>`;
    })
    .catch(() => {
      document.querySelector(".result").innerHTML = `
                <p>Country doesn't exist</p>`;
      document.querySelector(".region-countries").innerHTML = "";
    });
};

submit.addEventListener("click", getData);

//newwewew
function createProject() {
  const project_name = document.querySelector("#project_name").value;
  const yarn_ply = document.querySelector("#yarn_ply").value;
  const yarn_color = document.querySelector("#yarn_color").value;
  const hook_size = document.querySelector("#hook_size").value;
  const types_of_stitches = document.querySelector("#types_of_stitches").value;
  const difficulty_lvl = document.querySelector("#difficulty_lvl").value;
  fetch(
    `https://exercise18.hypehive.cloud/villa-villa_diana_backend/connection.php`
    ,{ method: "POST",
       headers: {
        "Content-type": "application/x-www-form-urlencoded",
       },
       body: `project_name=${project_name}&yarn_ply=${yarn_ply}
         &yarn_color=${yarn_color}&hook_size=${hook_size}
         &types_of_stitches=${types_of_stitches}
         &difficulty_lvl=${difficulty_lvl}`,
     })
    .then((response) => response.text())
    .then((responseText) => {
      readProject();
      //alert(responseText);
    });
}

function readProject() {
  fetch(
    `https://exercise18.hypehive.cloud/villa-villa_diana_backend/connection.php`
    ).then((response) => response.json())
     .then((crochetProj) => {
      const table = document.querySelector("#project_list");
      table.classList.add("project-table");
      table.innerHTML = "";

      let tableHeader = document.createElement("thead");
      let headerRow = document.createElement("tr");

      let idHeader = document.createElement("th");
      let projectNameHeader = document.createElement("th");
      let yarnPlyHeader = document.createElement("th");
      let yarnColorHeader = document.createElement("th");
      let hookSizeHeader = document.createElement("th");
      let stitchesHeader = document.createElement("th");
      let difficultyHeader = document.createElement("th");
      let actionHeader = document.createElement("th");

      idHeader.textContent = "Project ID";
      projectNameHeader.textContent = "Project Name";
      yarnPlyHeader.textContent = "Yarn Ply";
      yarnColorHeader.textContent = "Yarn Color";
      hookSizeHeader.textContent = "Hook Size";
      stitchesHeader.textContent = "Types of Stitches";
      difficultyHeader.textContent = "Difficulty Level";
      actionHeader.textContent = "Action";

      headerRow.append(
        idHeader,
        projectNameHeader,
        yarnPlyHeader,
        yarnColorHeader,
        hookSizeHeader,
        stitchesHeader,
        difficultyHeader,
        actionHeader);
      tableHeader.append(headerRow);
      table.append(tableHeader);

      let tableBody = document.createElement("tbody");

      for (const data of crochetProj) {
        const row = document.createElement("tr");
        row.innerHTML = `
              <td>${data.id}</td>
              <td>${data.project_name}</td>
              <td>${data.yarn_ply}</td>
              <td>${data.yarn_color}</td>
              <td>${data.hook_size}</td>
              <td>${data.types_of_stitches}</td>
              <td>${data.difficulty_lvl}</td>
              <td><button 
                type="button"
                class="edit-btn" 
                id="edit" 
                onclick="editDetails(${data.id})"> 
                  Edit
              </button>
              <button 
                type="button"
                class="delete-btn"  
                id="delete" 
                onclick="deleteDetails(${data.id})">
                  Delete
              </button></td>`;
        tableBody.append(row);
      } table.append(tableBody);
    });
}

function editDetails(dataId) {
  const editProjectDetails = document.createElement("form");
  editProjectDetails.classList.add("add-crochet");
  
  editProjectDetails.innerHTML = `
    <label>Update Project Number ${dataId}</label>
    <input id="project_name_${dataId}" placeholder="Project Name"/>
    <input id="yarn_ply_${dataId}" placeholder="Yarn Ply"/>
    <input id="yarn_color_${dataId}" placeholder="Yarn Color"/>
    <input id="hook_size_${dataId}" placeholder="Hook Size"/>
    <input id="types_of_stitches_${dataId}" placeholder="Types of Stitches"/>
    <input id="difficulty_lvl_${dataId}" placeholder="Level of Difficulty"/>
    <button 
      type="button" 
      class="update-btn" 
      onclick="updateProject(${dataId})">
        Update
    </button>`;

  const updateProjectDetails = document.querySelector(`#editDetails`);
  updateProjectDetails.appendChild(editProjectDetails);
}

function updateProject(dataId) {
  const newProjectName = 
      document.querySelector(`#project_name_${dataId}`).value;
  const newYarnPly = document.querySelector(`#yarn_ply_${dataId}`).value;
  const newYarnColor = document.querySelector(`#yarn_color_${dataId}`).value;
  const newHookSize = document.querySelector(`#hook_size_${dataId}`).value;
  const newStitch = 
      document.querySelector(`#types_of_stitches_${dataId}`).value;
  const newDifficulty = 
      document.querySelector(`#difficulty_lvl_${dataId}`).value;

  fetch(
    `https://exercise18.hypehive.cloud/villa-villa_diana_backend/connection.php`
    ,{method: "PATCH",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: `id=${dataId}&project_name=${newProjectName}&yarn_ply=${newYarnPly}
        &yarn_color=${newYarnColor}&hook_size=${newHookSize}
        &types_of_stitches=${newStitch}&difficulty_lvl=${newDifficulty}`,
    })
    .then((response) => response.text())
    .then((responseText) => {
      readProject();
      alert(responseText);
      const form = document.querySelector(`#editDetails`);
      form.remove();
    });
}

function deleteDetails(dataId) {
  fetch(
    `https://exercise18.hypehive.cloud/villa-villa_diana_backend/connection.php`
    ,{method: "DELETE",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: `id=${dataId}`,
    })
    .then((response) => response.text())
    .then((responseText) => {
      readProject();
      alert(responseText);
    });
}

readProject();
