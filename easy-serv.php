<?php
$answerJson = file_get_contents('php://input');
$answer = json_decode($answerJson, true);
 
if(isset($answer['title']) && isset($answer['mess']) && !isset($answer['messId']))
{
	$file = 'data/messages.json';
    $messages = file_get_contents($file);
    $sms = ','.$answerJson.']';
    $messages = substr($messages, 0, -1).$sms;
    echo $messages;
    file_put_contents($file, $messages);
    
    /*echo $answerJson;*/
 
}
else if(isset($answer['messId']))
{  
    $file = 'data/answers.json';
    $answers = file_get_contents($file);
    $sms = ','.$answerJson.']';
    $answers = substr($answers, 0, -1).$sms;
    echo $answers;
    file_put_contents($file, $answers);
}


?>