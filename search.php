<?php

  $impression = $_POST["input"];

  $baseurl = "localhost:5000/distance?img=";

  $url = $baseurl.$impression;

  $curl = curl_init($url);  

  $result=curl_exec($curl);

  curl_close($curl);
?>

