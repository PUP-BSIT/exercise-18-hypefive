const gameTable = document.querySelector("#game_form");

document
  .querySelector("#game_form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    submitForm();
  });

document.getElementById("update").addEventListener("click", function (event) {
  event.preventDefault();
  submitUpdate();
});

function getGameDetails() {
  fetch("https://exercise18.hypehive.cloud/cainday_bradley_backend/api.php", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      const tableBody = document.getElementById("table_body");

      data.forEach((game) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${game.id}</td>
                <td>${game.game_name}</td>
                <td>${game.genre}</td>
                <td>${game.developer}</td>
                <td>${game.release_date}</td>
                <td>${game.rating}</td>`;

        const actionCell = document.createElement("td");

        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.addEventListener("click", () => updateGame(game));
        actionCell.appendChild(updateButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteGame(game.id));
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

getGameDetails();

function submitForm() {
  const gameName = document.querySelector("#game_name").value;
  const genre = document.querySelector("#genre").value;
  const developer = document.querySelector("#developer").value;
  const releaseDate = document.querySelector("#release_date").value;
  const rating = document.querySelector("#rating").value;

  fetch("https://exercise18.hypehive.cloud/cainday_bradley_backend/api.php", {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: `game_name=${gameName}&genre=${genre}&
        developer=${developer}&release_date=${releaseDate}&rating=${rating}`,
  })
    .then((response) => response.text())
    .then((responseText) => {
      alert(responseText);
      location.reload();
    })
    .catch((error) => {
      console.error("Error inserting game:", error);
    });
}

function deleteGame(id) {
  fetch("https://exercise18.hypehive.cloud/cainday_bradley_backend/api.php", {
    method: "DELETE",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: `id=${id}`,
  })
    .then((response) => response.text())
    .then((responseText) => {
      alert(responseText);
      location.reload();
    })
    .catch((error) => {
      console.error("Error deleting game:", error);
    });
}

function updateGame(game) {
  const updateBtn = document.getElementById("update");
  const saveBtn = document.getElementById("save");

  updateBtn.style.display = "block";
  saveBtn.style.display = "none";

  document.getElementById("game_id").value = game.id;
  document.getElementById("game_name").value = game.game_name;
  document.getElementById("genre").value = game.genre;
  document.getElementById("developer").value = game.developer;
  document.getElementById("release_date").value = game.release_date;
  document.getElementById("rating").value = game.rating;
}

function submitUpdate() {
  const gameId = document.getElementById("game_id").value;
  const gameName = document.querySelector("#game_name").value;
  const genre = document.querySelector("#genre").value;
  const developer = document.querySelector("#developer").value;
  const releaseDate = document.querySelector("#release_date").value;
  const rating = document.querySelector("#rating").value;

  fetch("https://exercise18.hypehive.cloud/cainday_bradley_backend/api.php", {
    method: "PATCH",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: `id=${gameId}&game_name=${gameName}&genre=${genre}
        &developer=${developer}&release_date=${releaseDate}&rating=${rating}`,
  })
    .then((response) => response.text())
    .then((responseText) => {
      alert(responseText);
      location.reload();
    })
    .catch((error) => {
      console.error("Error updating game:", error);
    });
}
