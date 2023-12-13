document.querySelector("#crud_form").addEventListener("submit", function (event) 
{
    event.preventDefault();
    submitForm();
});

document.getElementById('update').addEventListener('click', function (event) {
    event.preventDefault();
    submitUpdate();
});

function getKPOPDetails() {
    fetch("https://exercise18.hypehive.cloud/mentok_almera_backend/kpop.php", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: 
            ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const tableBody = document.getElementById("table_body");
        tableBody.innerHTML = ""; // Clear existing rows

        data.forEach(kpop => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${kpop.id}</td>
            <td>${kpop.group_name}</td>
            <td>${kpop.no_of_members}</td>
            <td>${kpop.ent_name}</td>
            <td>${kpop.debut_date}</td>
            <td>${kpop.debut_song}</td>`;

            const actionCell = document.createElement("td");

            const updateButton = document.createElement("button");
            updateButton.textContent = "Update";
            updateButton.addEventListener("click", () => updateKPOP(kpop));
            actionCell.appendChild(updateButton);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => deleteKPOP(kpop.id));
            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function submitForm() {
    const groupName = document.querySelector("#group_name").value;
    const no_of_members = document.querySelector("#no_of_members").value;
    const entName = document.querySelector("#ent_name").value;
    const debutDate = document.querySelector("#debut_date").value;
    const debutSong = document.querySelector("#debut_song").value;

    fetch("https://exercise18.hypehive.cloud/mentok_almera_backend/kpop.php", {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `group_name=${groupName}&no_of_members=${no_of_members}
        &ent_name=${entName}&debut_date=${debutDate}&debut_song=${debutSong}`,
    })
    .then((response) => response.text())
    .then((responseText) => {
        alert(responseText);
        location.reload();
    })
    .catch(error => {
        console.error('Error inserting kpop group:', error);
    });
}

function deleteKPOP(id) {
    fetch('https://exercise18.hypehive.cloud/mentok_almera_backend/kpop.php', {
        method: 'DELETE',
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `id=${id}`,
    })
    .then((response) => response.text())
    .then(responseText => {
        alert(responseText);
        location.reload();
    })
    .catch(error => {
        console.error('Error deleting from list:', error);
    });
}

function updateKPOP(kpop) {
    const updateBtn = document.getElementById('update');
    const saveBtn = document.getElementById('save');

    updateBtn.style.display = 'block';
    saveBtn.style.display = 'none';

    document.getElementById("kpop_id").value = kpop.id;
    document.getElementById("group_name").value = kpop.group_name;
    document.getElementById("no_of_members").value = kpop.no_of_members;
    document.getElementById("ent_name").value = kpop.ent_name;
    document.getElementById("debut_date").value = kpop.debut_date;
    document.getElementById("debut_song").value = kpop.debut_song;
}

function submitUpdate() {
    const kpop_id = document.getElementById("kpop_id").value;
    const groupName = document.querySelector("#group_name").value;
    const no_of_members = document.querySelector("#no_of_members").value;
    const entName = document.querySelector("#ent_name").value;
    const debutDate = document.querySelector("#debut_date").value;
    const debutSong = document.querySelector("#debut_song").value;

    fetch(`https://exercise18.hypehive.cloud/mentok_almera_backend/kpop.php`, {
        method: 'PATCH',
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `id=${kpop_id}&group_name=${groupName}
        &no_of_members=${no_of_members}&ent_name=${entName
        }&debut_date=${debutDate}&debut_song=${debutSong}`,
    })
    .then((response) => response.text())
    .then(responseText => {
        alert(responseText);
        location.reload();
    })
    .catch(error => {
        console.error('Error updating the:', error);
    });
}

// Initial data fetch
getKPOPDetails();
