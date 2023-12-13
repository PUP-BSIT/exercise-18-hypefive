<?php
require_once("connection.php");

$dataProjName = $_POST["project_name"] ?? "";
$dataYarnPly = $_POST["yarn_ply"] ?? "";
$dataYarnColor = $_POST["yarn_color"] ?? "";
$dataHookSize = $_POST["hook_size"] ?? "";
$dataStitch = $_POST["types_of_stitches"] ?? "";
$dataDifficulty = $_POST["difficulty_lvl"] ?? "";

$sql = "INSERT INTO crochet_project 
            (project_name, yarn_ply, yarn_color, hook_size,
            types_of_stitches, difficulty_lvl) 
        VALUES ('${dataProjName}', '${dataYarnPly}', '${dataYarnColor}', 
            '${dataHookSize}', '${dataStitch}', 
            '${dataDifficulty}')";
if (!mysqli_query($conn, $sql)) {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    return;
}

echo "New record created successfully";
mysqli_close($conn);
?>