<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

function deleteKPOP($servername, $username, $password, $dbname, $id) {
    $connect = mysqli_connect($servername, $username, $password, $dbname);

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
      
    $sql = "DELETE FROM kpop WHERE id = '$id'";

    if (!$connect->query($sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connect);
    } 

    echo 'Deleted successfully';
    mysqli_close($connect);
}

function getKPOPDetails($servername, $username, $password, $dbname) {
    $connect = mysqli_connect($servername, $username, $password, $dbname);

    if (!$connect) return;
    
    $sql = "SELECT * FROM kpop";

    $result = $connect->query($sql);

    if (!$result) {
        echo "Error: " . $sql . "<br>" . $connect->error;
    } else {
        $kpopData = array();

        while ($row = $result->fetch_assoc()) {
            $kpopData[] = $row;
        }
        
        header('Content-Type: application/json');
        echo json_encode($kpopData);
    }

    mysqli_close($connect);
}

function insertKPOP($servername, $username, $password, $dbname, $data) {
    $connect = mysqli_connect($servername, $username, $password, $dbname);
    
    if (!$connect) return;
        
    foreach ($data as $key => $value) {
        $data[$key] = mysqli_real_escape_string($connect, $value);
    }
    
    $sql = "INSERT INTO kpop (group_name, no_of_members, ent_name, debut_date, 
        debut_song) 
            VALUES ('$data[group_name]', '$data[no_of_members]', 
            '$data[ent_name]', '$data[debut_date]', '$data[debut_song]')";
   
    if (!$connect->query($sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connect);
    } 

    echo "New record created successfully";
    mysqli_close($connect);
}

function updateKPOP($servername, $username, $password, $dbname, $data) {
    $connect = mysqli_connect($servername, $username, $password, $dbname);
    
    if (!$connect) return;
        
    foreach ($data as $key => $value) {
        $data[$key] = mysqli_real_escape_string($connect, $value);
    }
    
    $sql = "UPDATE kpop SET 
            group_name='$data[group_name]', 
            no_of_members='$data[no_of_members]', 
            ent_name='$data[ent_name]', 
            debut_date='$data[debut_date]', 
            debut_song='$data[debut_song]' 
            WHERE id='$data[id]'";
   
    if (!$connect->query($sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connect);
    } 

    echo "Record updated successfully";
    mysqli_close($connect);
}

$servername = "127.0.0.1:3306";
$username = "u621905585_hypefive";
$password = "Hypefive_exercise18";
$dbname="u621905585_hypefive_18";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = [
        'group_name' => $_POST['group_name'],
        'no_of_members' => $_POST['no_of_members'],
        'ent_name' => $_POST['ent_name'],
        'debut_date' => $_POST['debut_date'],
        'debut_song' => $_POST['debut_song']
    ];
        
    insertKPOP($servername, $username, $password, $dbname, $data);
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    getKPOPDetails($servername, $username, $password, $dbname);
}

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    parse_str(file_get_contents('php://input'), $_DELETE);
    $id = $_DELETE["id"];
    deleteKPOP($servername, $username, $password, $dbname, $id);
}

if ($_SERVER["REQUEST_METHOD"] == "PATCH") {
    parse_str(file_get_contents('php://input'), $_PATCH);
    $data = [
        'id' => $_PATCH['id'],
        'group_name' => $_PATCH['group_name'],
        'no_of_members' => $_PATCH['no_of_members'],
        'ent_name' => $_PATCH['ent_name'],
        'debut_date' => $_PATCH['debut_date'],
        'debut_song' => $_PATCH['debut_song']
    ];
    updateKPOP($servername, $username, $password, $dbname, $data);    
}
?>
