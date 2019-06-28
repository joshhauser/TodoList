<?php
require_once("db_settings.php");

$params = file_get_contents("php://input");
$datas = json_decode($params);
$table= "tasks";

$connection = mysqli_connect($server,$login,$dbPass)
or die("Impossible to connect");

mysqli_select_db($connection,$db)
or die("Database not found.");

$insertRequest = "INSERT INTO $table(task, boardID)";
$insertRequest .= "VALUES(?,?)";

$requestPrepare = mysqli_prepare($connection, $insertRequest);
$t = 0;
mysqli_stmt_bind_param($requestPrepare,'si', $datas->data->taskContent, $t);
mysqli_stmt_execute($requestPrepare);
mysqli_close($connection);
?>