<?php

function updateManga ($servername, $username, $password, $dbname, $manga) {
    $connect = mysqli_connect($servername, $username, $password, $dbname);
    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }

    foreach ($manga as $key => $value) {
        $manga[$key] = mysqli_real_escape_string($connect, $value);
    }

    $sql = "UPDATE manga
        SET manga_name = '$manga[manga_name]', author = '$manga[author_name]',
        volume_number = '$manga[volume_number]', genre = '$manga[genre]', 
        rating = '$manga[rating]'
        WHERE id = '$manga[id]'";

    if (!$connect->query($sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connect);
    } 

    echo "Updated successfully!";
    mysqli_close($connect);
}


?>