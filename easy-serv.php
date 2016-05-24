<?php
$answerJson = file_get_contents('php://input');
$answer = json_decode($answerJson, true);
 
if(isset($answer['title']) && isset($answer['mess']))
{
	$file = 'data/messages.json';
    $messages = file_get_contents($file);
    $sms = ','.$answerJson.']';
    $messages = substr($messages, 0, -1).$sms;
    echo $messages;
    file_put_contents($file, $messages);
    
    /*echo $answerJson;*/
 
}
else
{  
    echo "не верные данные aasss";
}
?>