<?php
require_once("db_settings.php");

$task = $_GET["task"];

$table= "tasks";

$connection = mysqli_connect($server,$login,$dbPass)
or die("Impossible to connect");

mysqli_select_db($connection,$db)
or die("Databse not found.");

$insertRequest = "DELETE FROM $table WHERE task = $task";

mysqli_close($connection);
?>