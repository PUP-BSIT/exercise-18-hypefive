<?php

function getOpmBandDetails ($servername, $username, $password, $dbname) {

    $connect = mysqli_connect($servername, $username, $password, $dbname);

    if (!$connect) return;
    

    $sql = "SELECT * FROM opmband";

    $result = $connect->query($sql);

    if (!$result) {
        echo "Error: " . $sql . "<br>" . $connect->error;
    } else {

        $opmBandData = array();

        while ($row = $result->fetch_assoc()) {
            $opmBandData[] = $row;
        }
        
        header('Content-Type: application/json');
        echo json_encode($opmBandData);
    }

    mysqli_close($connect);
}

