<?php
require_once("../db_settings.php");

// Get datas
$params = file_get_contents('php://input');
$datas = json_decode($params);
$table = "boards";

$connection = mysqli_connect($server,$login,$dbPass)
or die('Impossible to establish a connection.');

mysqli_select_db($connection, $db)
or die('Databse not found.');

// Create variables that will be stored in DB
$id = $datas->data->id;
$name = $datas->data->name;
$color = $datas->data->color;


// SQL Request
$updateRequest = "UPDATE $table SET ";
$updateRequest .= "name = '$name', ";
$updateRequest .= "color = '$color' ";
$updateRequest .= "WHERE id = $id";

mysqli_query($connection, $updateRequest);
mysqli_close($connection);
?>