<?php

function deleteOpmBand ($servername, $username, $password, $dbname, $id) {
    $connect = mysqli_connect($servername, $username, $password, $dbname);

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
      
    $sql = "DELETE FROM opmband WHERE id = '$id'";

    if (!$connect->query($sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connect);
    } 

    echo 'Deleted succesfully';
    mysqli_close($connect);
}
?>
