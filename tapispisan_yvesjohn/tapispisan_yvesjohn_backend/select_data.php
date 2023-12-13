<?php

    function getMangaDetails ($servername, $username, $password, $dbname) {

        $connect = mysqli_connect($servername, $username, $password, $dbname);

        if (!$connect) return;
        

        $sql = "SELECT * FROM manga";

        $result = $connect->query($sql);

        if (!$result) {
            echo "Error: " . $sql . "<br>" . $connect->error;
        } else {

            $mangaData = array();

            while ($row = $result->fetch_assoc()) {
                $mangaData[] = $row;
            }
            
            header('Content-Type: application/json');
            echo json_encode($mangaData);
        }

        mysqli_close($connect);
    }

?>