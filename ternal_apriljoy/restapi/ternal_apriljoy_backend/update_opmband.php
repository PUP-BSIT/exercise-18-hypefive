<?php

function updateOpmBand($servername, $username, $password, $dbname, $data)
{
    $connect = mysqli_connect($servername, $username, $password, $dbname);
    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }

    foreach ($data as $key => $value) {
        $data[$key] = mysqli_real_escape_string($connect, $value);
    }

    $sql = "UPDATE opmBand
        SET opmband_name = '$data[opmband_name]', origin = '$data[origin]', 
        leadvocalist_name = '$data[leadvocalist_name]', 
        formation_date = '$data[formation_date]', 
        first_album = '$data[first_album]'
        WHERE id = '$data[id]'";

    if (!$connect->query($sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connect);
    }

    echo "Updated successfully!";
    mysqli_close($connect);
}

?>
