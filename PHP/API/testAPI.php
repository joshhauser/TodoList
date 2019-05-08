<?php

$params = file_get_contents("php://input");
$datas = json_decode($params);

$file="test.txt";
if($datas != ''){
    
    if(file_exists($file)){
        $p = fopen($file,'a');
        fputs($p, $datas->datas->id);
        fclose($p);
    }
    else{
        $p = fopen($file,"w");
        fputs($p, $datas);
        fclose($p);
    }
}

?>