<?php

function insertOpmBand ($servername, $username, $password, $dbname, $data) {
    
    $connect = mysqli_connect($servername, $username, $password, $dbname);
    if (!$connect) return;
        
    foreach ($data as $key => $value) {
        $data[$key] = mysqli_real_escape_string($connect, $value);
    }
    
    $sql = "INSERT INTO opmband (opmband_name, origin, leadvocalist_name, formation_date, 
                first_album) 
            VALUES ('$data[opmband_name]', '$data[origin]', '$data[leadvocalist_name]', 
                '$data[formation_date]', '$data[first_album]')";
   
    if (!$connect->query($sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connect);
    } 

    echo "New record created successfully";
    mysqli_close($connect);
}