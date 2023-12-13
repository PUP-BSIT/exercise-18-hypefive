<?php

include 'insert_opmband.php';
include 'update_opmband.php';
include 'delete_opmband.php';
include 'get_opmband_details.php';

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'opmband_database';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $data = [
        'opmband_name' => $_POST['opmband_name'],
        'origin' => $_POST['origin'],
        'leadvocalist_name' => $_POST['leadvocalist_name'],
        'formation_date' => $_POST['formation_date'],
        'first_album' => $_POST['first_album']
    ];
        
    insertOpmBand($servername, $username, $password, $dbname, $data);

}
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    getOpmBandDetails($servername, $username, $password, $dbname);
}
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    parse_str(file_get_contents('php://input'), $_DELETE);
    $id = $_DELETE["id"];
    deleteOpmBand($servername, $username, $password, $dbname, $id);
}
if ($_SERVER["REQUEST_METHOD"] == "PATCH") {

    parse_str(file_get_contents('php://input'), $_PATCH);

    $data = [
        'id' => $_PATCH['id'],
        'opmband_name' => $_PATCH['opmband_name'],
        'origin' => $_PATCH['origin'],
        'leadvocalist_name' => $_PATCH['leadvocalist_name'],
        'formation_date' => $_PATCH['formation_date'],
        'first_album' => $_PATCH['first_album']
    ];

    updateOpmBand ($servername, $username, $password, $dbname, $data);    
}