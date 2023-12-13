<?php
require_once("connection.php");

parse_str(file_get_contents('php://input'), $_PATCH);
$dataProjId = $_PATCH["id"] ?? "";
$dataProjName = $_PATCH["project_name"] ?? "";
$dataYarnPly = $_PATCH["yarn_ply"] ?? "";
$dataYarnColor = $_PATCH["yarn_color"] ?? "";
$dataHookSize = $_PATCH["hook_size"] ?? "";
$dataStitch = $_PATCH["types_of_stitches"] ?? "";
$dataDifficulty = $_PATCH["difficulty_lvl"] ?? "";

$sql = "UPDATE crochet_project
        SET project_name='${dataProjName}', 
            yarn_ply='${dataYarnPly}', 
            yarn_color='${dataYarnColor}', 
            hook_size='${dataHookSize}', 
            types_of_stitches='${dataStitch}', 
            difficulty_lvl='${dataDifficulty}'
        WHERE id=${dataProjId}";

if (!mysqli_query($conn, $sql)) {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
} else {
    echo "Data updated successfully";
}

mysqli_close($conn);
?>