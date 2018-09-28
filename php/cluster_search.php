<?php

  $impression = $_POST["input"];

  $text = file('./config.yml');
  $temp = explode(':', $text[0]);
  $baseurl = trim($temp[1].':'.$temp[2]);

  $url = $baseurl."metadistance?cid=".$impression;

  $curl = curl_init($url);  

  $result=curl_exec($curl);

  curl_close($curl);
?>

