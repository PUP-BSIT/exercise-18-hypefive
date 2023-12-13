<?php

function insertGame($servername, $username, $password, $dbname, $data) {
    $connect = mysqli_connect($servername, $username, $password, $dbname);
    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }

    foreach ($data as $key => $value) {
        $data[$key] = mysqli_real_escape_string($connect, $value);
    }

    $sql = "INSERT INTO mobile_games (game_name, genre, developer, release_date, 
                    rating) 
            VALUES ('$data[game_name]', '$data[genre]', '$data[developer]', 
                    '$data[release_date]', '$data[rating]')";
   
    if (!$connect->query($sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connect);
    } else {
        echo "New record created successfully";
    }

    mysqli_close($connect);
}

?>
