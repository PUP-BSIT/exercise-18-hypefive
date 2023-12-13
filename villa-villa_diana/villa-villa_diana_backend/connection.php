<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

$servername = "127.0.0.1:3306";
$username = "u621905585_hypefive";
$password = "Hypefive_exercise18";
$db = "u621905585_hypefive_18";
$conn = mysqli_connect($servername, $username, $password, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    include 'create.php';
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    include 'read.php';
}

if ($_SERVER["REQUEST_METHOD"] === "PATCH") {
    include 'update.php';
}

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    include 'delete.php';
}
?>