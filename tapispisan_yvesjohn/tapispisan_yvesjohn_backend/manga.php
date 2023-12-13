<?php

    include 'insert_manga.php';
    include 'update_manga.php';
    include 'delete_manga.php';
    include 'select_data.php';

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: *");
    
    $servername = "127.0.0.1:3306";
    $username = "u621905585_hypefive";
    $password = "Hypefive_exercise18";
    $dbname="u621905585_hypefive_18";


    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $manga = [
            'manga_name' => $_POST['manga_name'],
            'author_name' => $_POST['author_name'],
            'volume_number' => $_POST['volume_number'],
            'genre' => $_POST['genre'],
            'rating' => $_POST['rating']
        ];
            
        insertManga($servername, $username, $password, $dbname, $manga);

    }
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        getMangaDetails($servername, $username, $password, $dbname);
    }
    if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
        parse_str(file_get_contents('php://input'), $_DELETE);
        $id = $_DELETE["id"];
        deleteManga($servername, $username, $password, $dbname, $id);
    }
    if ($_SERVER["REQUEST_METHOD"] == "PATCH") {

        parse_str(file_get_contents('php://input'), $_PATCH);

        $manga = [
            'id' => $_PATCH['id'],
            'manga_name' => $_PATCH['manga_name'],
            'author' => $_PATCH['author_name'],
            'volume_number' => $_PATCH['volume_number'],
            'genre' => $_PATCH['genre'],
            'rating' => $_PATCH['rating']
        ];

        updateManga ($servername, $username, $password, $dbname, $manga);    
    }
?>