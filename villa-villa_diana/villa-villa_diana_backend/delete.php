<?php
require_once("connection.php");

parse_str(file_get_contents('php://input'), $_DELETE);

$id = $_DELETE["id"] ?? "";

$sql = "DELETE FROM crochet_project WHERE id=${id}";
if (!mysqli_query($conn, $sql)) {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

echo "Deleted successfully!";
mysqli_close($conn);
?>