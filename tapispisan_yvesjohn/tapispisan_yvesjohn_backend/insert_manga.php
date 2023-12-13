<?php

function insertManga ($servername, $username, $password, $dbname, $manga) {
    
    $connect = mysqli_connect($servername, $username, $password, $dbname);
    if (!$connect) return;
        
    foreach ($manga as $key => $value) {
        $manga[$key] = mysqli_real_escape_string($connect, $value);
    }
    
    $sql = "INSERT INTO manga (manga_name, author, volume_number, genre, 
            rating) 
        VALUES ('$manga[manga_name]', '$manga[author_name]', '$manga[volume_number]',
                '$manga[genre]', '$manga[rating]')";
   
    if (!$connect->query($sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connect);
    } 

    echo "New record created successfully";
    mysqli_close($connect);
}
?>