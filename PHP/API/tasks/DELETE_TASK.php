<?php
require_once("../db_settings.php");

$id = $_GET['id'];

$table= "tasks";

$connection = mysqli_connect($server,$login,$dbPass)
or die("Impossible to connect");

mysqli_select_db($connection,$db)
or die("Database not found.");

// Delete board
$deleteRequest = "DELETE FROM $table WHERE id='$id'";
$result = mysqli_query($connection, $deleteRequest);

// Delete tasks which are part of the board
$deleteRequest = "DELETE FROM tasks WHERE boardID = $id";
$result = mysqli_query($connection, $deleteRequest);

mysqli_close($connection);
?>