<?php

function deleteGame($servername, $username, $password, $dbname, $id) {
    $connect = mysqli_connect($servername, $username, $password, $dbname);

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
      
    $sql = "DELETE FROM mobile_games WHERE id = '$id'";

    if (!$connect->query($sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connect);
    } else {
        echo 'Deleted successfully';
    }

    mysqli_close($connect);
}

?>
