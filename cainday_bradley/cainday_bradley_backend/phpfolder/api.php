<?php

include 'insert_api.php';
include 'update_api.php';
include 'delete_api.php';
include 'get_api.php';

$servername = "localhost";
$username = "root";
$password = "";
$dbname="mobile_games";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $data = [
        'game_name' => $_POST['game_name'],
        'genre' => $_POST['genre'],
        'developer' => $_POST['developer'],
        'release_date' => $_POST['release_date'],
        'rating' => $_POST['rating']
    ];
        
    insertGame($servername, $username, $password, $dbname, $data);

}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    getGameDetails($servername, $username, $password, $dbname);
}

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    parse_str(file_get_contents('php://input'), $_DELETE);
    $id = $_DELETE["id"];
    deleteGame($servername, $username, $password, $dbname, $id);
}

if ($_SERVER["REQUEST_METHOD"] == "PATCH") {

    parse_str(file_get_contents('php://input'), $_PATCH);

    $data = [
        'id' => $_PATCH['id'],
        'game_name' => $_PATCH['game_name'],
        'genre' => $_PATCH['genre'],
        'developer' => $_PATCH['developer'],
        'release_date' => $_PATCH['release_date'],
        'rating' => $_PATCH['rating']
    ];

    updateGame($servername, $username, $password, $dbname, $data);    
}
?>
