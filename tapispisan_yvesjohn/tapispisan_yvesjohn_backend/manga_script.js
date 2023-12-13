const mangaTable = document.querySelector("#crud_form");

document.querySelector("#crud_form").addEventListener("submit", 
    function (event) {
    event.preventDefault();     
    submitForm(); 
});

document.getElementById('update').addEventListener('click', function (event) {
    event.preventDefault(); 
    submitUpdate();    
})

function getMangaDetails() {

    fetch
    ("https://exercise18.hypehive.cloud/tapispsan_yvesjohn_backend/manga.php", {
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
        
        data.forEach(manga => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${manga.id}</td>
            <td>${manga.manga_name}</td>
            <td>${manga.author}</td>
            <td>${manga.volume_number}</td>
            <td>${manga.genre}</td>
            <td>${manga.rating }</td>`;
            
            const actionCell = document.createElement("td");
            
            const updateButton = document.createElement("button");
            updateButton.textContent = "Update";
            updateButton.addEventListener("click", () => updateManga(manga)); 
            actionCell.appendChild(updateButton);
            
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => deleteManga(manga.id)); 
            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);
            
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

}

getMangaDetails();

function submitForm() {    
    const mangaName = document.querySelector("#manga_name").value;
    const authorName = document.querySelector("#author_name").value;
    const volumeNumber = document.querySelector("#volume_number").value;
    const genre = document.querySelector("#genre").value;
    const rating = document.querySelector("#rating").value;
    fetch
    ("https://exercise18.hypehive.cloud/tapispsan_yvesjohn_backend/manga.php", {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `manga_name=${mangaName}&author=${authorName}
        &volume_number=${volumeNumber}&genre=${genre}&rating=${rating}`,
    })
    .then((response) => response.text())
    .then((responseText) => {
        alert(responseText);
        location.reload()
    })
    .catch(error => {
        console.error('Error inserting manga:', error);
    });   
}

function deleteManga(id) {     
    fetch
    ('https://exercise18.hypehive.cloud/tapispsan_yvesjohn_backend/manga.php', {
        method: 'DELETE',
        headers: {            
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `id=${id}`,
    })
    .then((response) => response.text())
    .then(responseText => {
        alert(responseText); 
        location.reload()
    })
    .catch(error => {
        console.error('Error deleting manga:', error);
    });
   
}

function updateManga(manga) {    
    const updateBtn = document.getElementById('update');
    const saveBtn = document.getElementById('save');

    updateBtn.style.display = 'block'
    saveBtn.style.display = 'none'

    document.getElementById("manga_id").value = manga.id;
    document.getElementById("manga_name").value = manga.manga_name;
    document.getElementById("author_name").value = manga.author;
    document.getElementById("volume_number").value = manga.volume_number
    document.getElementById("genre").value = manga.genre;
    document.getElementById("rating").value = manga.rating;
}

function submitUpdate() {
    const mangaId = document.getElementById("manga_id").value
    const mangaName = document.querySelector("#manga_name").value;
    const mangaAuthor = document.querySelector("#author_name").value;
    const volumeNumber = document.querySelector("#volume_number").value;
    const genre = document.querySelector("#genre").value;
    const rating = document.querySelector("#rating").value;

    fetch
    (`https://exercise18.hypehive.cloud/tapispsan_yvesjohn_backend/manga.php`, {
        method: 'PATCH',   
        headers: {            
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `id=${mangaId}&manga_name=${mangaName}&author_name=${mangaAuthor}
        &volume_number=${volumeNumber}&genre=${genre}&rating=${rating}`,
    }) 
    .then((response) => response.text())
    .then(responseText => {
        alert(responseText); 
        location.reload()
    })
    .catch(error => {
        console.error('Error updating manga:', error);
    });
}

