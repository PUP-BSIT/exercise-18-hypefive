<?php

function updateGame($servername, $username, $password, $dbname, $data) {
    $connect = mysqli_connect($servername, $username, $password, $dbname);
    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }

    foreach ($data as $key => $value) {
        $data[$key] = mysqli_real_escape_string($connect, $value);
    }

    $sql = "UPDATE mobile_games
            SET game_name = '$data[game_name]', 
                genre = '$data[genre]', 
                developer = '$data[developer]',
                release_date = '$data[release_date]', 
                rating = '$data[rating]'
            WHERE id = '$data[id]'";

    if (!$connect->query($sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connect);
    } else {
        echo "Updated successfully!";
    }

    mysqli_close($connect);
}

?>
