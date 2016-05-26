<?php
$answerJson = file_get_contents('php://input');
$answer = json_decode($answerJson, true);

if (isset($_GET['email']) && isset($_GET['password']) && $_GET['email']!="undefined" && $_GET['password']!="undefined") {
	
	$file = 'data/users.json';
    $users = file_get_contents($file);
    $users = substr($users, 7, -2);
    $users_arr = explode("},{", $users);
 
    foreach ($users_arr as $value) {
    	if( strripos($value, '"email":"'.$_GET['email'].'"') !==false && strripos($value, '"password":"'.$_GET['password'].'"') !==false){
			$value = json_encode('{'.$value.'}');
			echo $value; die();
    	}
    }
    echo ""; die();
}

if(isset($answer['title']) && isset($answer['mess']) && !isset($answer['messId'])) {
	$file = 'data/messages.json';
    $messages = file_get_contents($file);
    $sms = ','.$answerJson.']';
    $messages = substr($messages, 0, -1).$sms;    
    file_put_contents($file, $messages);
    echo $messages; die();
 
} else if(isset($answer['messId'])) {  
    $file = 'data/answers.json';
    $answers = file_get_contents($file);
    $sms = ','.$answerJson.']';
    $answers = substr($answers, 0, -1).$sms;    
    file_put_contents($file, $answers);
    echo $answers; die();
}


?>