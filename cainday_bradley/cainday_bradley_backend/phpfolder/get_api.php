<?php

function getGameDetails($servername, $username, $password, $dbname) {
    $connect = mysqli_connect($servername, $username, $password, $dbname);
    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "SELECT * FROM mobile_games";
    $result = $connect->query($sql);

    if (!$result) {
        echo "Error: " . $sql . "<br>" . $connect->error;
    } else {
        $gameData = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $gameData[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($gameData);
        } else {
            echo json_encode(['message' => 'No records found']);
        }
    }

    mysqli_close($connect);
}

?>
