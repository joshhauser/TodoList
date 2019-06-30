<?php
require_once("../db_settings.php");
$boardID = $_GET['boardID'];
$table = "tasks";
$tasks = [];
$index = 0;


$connection = mysqli_connect($server,$login,$dbPass)
or die("Impossible to connect");

mysqli_select_db($connection,$db)
or die("Database not found.");

$request = "SELECT * from $table WHERE boardID = $boardID";
$result = mysqli_query($connection,$request);

while($row = mysqli_fetch_row($result)){
    $tasks[$index]['id'] = $row[0];
    $tasks[$index]['content'] = $row[1];
    $tasks[$index]['boardID'] = $row[2];
    $index++;
}

echo json_encode(['data' => $tasks]);
?>