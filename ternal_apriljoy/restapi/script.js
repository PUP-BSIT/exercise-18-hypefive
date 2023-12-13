const opmBandTable = document.querySelector("#crud_form");

document
  .querySelector("#crud_form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    submitForm();
  });

document.getElementById("update").addEventListener("click", function (event) {
  event.preventDefault();
  console.log("Update button clicked");
  submitUpdate();
});

function getOpmBandDetails() {
  fetch(
    "https://exercise18.hypehive.cloud/ternal_apriljoy_backend/opmband.php",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: 
            ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      const tableBody = document.getElementById("table_body");

      data.forEach((opmband) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${opmband.id}</td>
            <td>${opmband.opmband_name}</td>
            <td>${opmband.origin}</td>
            <td>${opmband.leadvocalist_name}</td>
            <td>${opmband.formation_date}</td>
            <td>${opmband.first_album}</td>`;

        const actionCell = document.createElement("td");

        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.addEventListener("click", () => updateOpmBand(opmband));
        actionCell.appendChild(updateButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteOpmBand(opmband.id));
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

getOpmBandDetails();

function submitForm() {
  const opmband_name = document.querySelector("#opmband_name").value;
  const origin = document.querySelector("#origin").value;
  const leadvocalist_name = document.querySelector("#leadvocalist_name").value;
  const formation_date = document.querySelector("#formation_date").value;
  const first_album = document.querySelector("#first_album").value;
  console.log(
    "Submitting form with values:",
    opmband_name,
    origin,
    leadvocalist_name,
    formation_date,
    first_album
  );

  fetch(
    "https://exercise18.hypehive.cloud/ternal_apriljoy_backend/opmband.php",
    {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: `opmband_name=${opmband_name}&origin=${origin}
    &leadvocalist_name=${leadvocalist_name}
    &formation_date=${formation_date}&first_album=${first_album}`,
    }
  )
    .then((response) => response.text())
    .then((responseText) => {
      alert(responseText);
      location.reload();
    })
    .catch((error) => {
      console.error("Error inserting opm band:", error);
    });
}

function deleteOpmBand(id) {
  fetch(
    "https://exercise18.hypehive.cloud/ternal_apriljoy_backend/opmband.php",
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: `id=${id}`,
    }
  )
    .then((response) => response.text())
    .then((responseText) => {
      alert(responseText);
      location.reload();
    })
    .catch((error) => {
      console.error("Error deleting opm band:", error);
    });
}

function updateOpmBand(opmband) {
  console.log("Updating OpmBand:", opmband);

  const updateBtn = document.getElementById("update");
  const saveBtn = document.getElementById("save");

  updateBtn.style.display = "block";
  saveBtn.style.display = "none";

  document.getElementById("opmband_id").value = opmband.id;
  document.getElementById("opmband_name").value = opmband.opmband_name;
  document.getElementById("origin").value = opmband.origin;
  document.getElementById("leadvocalist_name").value =
    opmband.leadvocalist_name;
  document.getElementById("formation_date").value = opmband.formation_date;
  document.getElementById("first_album").value = opmband.first_album;
}

function submitUpdate() {
  const opmband_id = document.getElementById("opmband_id").value;
  const opmband_name = document.querySelector("#opmband_name").value;
  const origin = document.querySelector("#origin").value;
  const leadvocalist_name = document.querySelector("#leadvocalist_name").value;
  const formation_date = document.querySelector("#formation_date").value;
  const first_album = document.querySelector("#first_album").value;
  console.log(
    "Submitting update with values:",
    opmband_id,
    opmband_name,
    origin,
    leadvocalist_name,
    formation_date,
    first_album
  );

  fetch(
    `https://exercise18.hypehive.cloud/ternal_apriljoy_backend/opmband.php`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: `id=${opmband_id}&opmband_name=${opmband_name}
    &origin=${origin}&leadvocalist_name=${leadvocalist_name}
    &formation_date=${formation_date}&first_album=${first_album}`,
    }
  )
    .then((response) => response.text())
    .then((responseText) => {
      alert(responseText);
      location.reload();
    })
    .catch((error) => {
      console.error("Error updating opm band:", error);
    });
}
