<?php
require_once("connection.php");

$sql = "SELECT id, project_name, yarn_ply, yarn_color, hook_size,
    types_of_stitches, difficulty_lvl FROM crochet_project";
$result = mysqli_query($conn, $sql);
$response = [];

while ($content = mysqli_fetch_assoc($result)) {
    array_push($response, array(
        'id' => $content["id"],
        'project_name' => $content["project_name"],
        'yarn_ply' => $content["yarn_ply"],
        'yarn_color' => $content["yarn_color"],
        'hook_size' => $content["hook_size"],
        'types_of_stitches' => $content["types_of_stitches"],
        'difficulty_lvl' => $content["difficulty_lvl"]
    ));
}
echo json_encode($response);
$conn->close();
?>