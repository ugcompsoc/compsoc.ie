<?php

// Post request comes up with method name, call the method specified
if (function_exists($_POST["method"])) {
    $func = $_POST["method"];
    $func();
}

// check ldap and shit
function checkIfUserAccountExists() {

}

function checkIfUserIsSocietyMember() {
    //url to api
  	$url = "REDACTED";
	
	
	//Data array of post fields that includes the username and password that will be checked in the rest server for the feed
	//An error will be returned if any parameter is missing a value
	//searchByOption : What field we will be searching by
	//Options are : memberID 
	//              email 
	//              userID
	// memberID is usually the student ID
	$searchByOption = "memberID"; 
	
	// The search value being used 
	$searchValue = $_POST["studentID"]; 
	
	$data = "method=" . base64_encode("REDACTED") . 
            "&username=" . base64_encode("REDACTED") . 
            "&password=" . base64_encode("REDACTED") .
            "&searchByOption=" . base64_encode($searchByOption).
			"&searchValue=" . base64_encode($searchValue).
			"&encodeOutput=" . base64_encode(TRUE); 
	
	// Set up curl options
	
	$ch = curl_init();

	curl_setopt($ch,CURLOPT_URL,$url);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch,CURLOPT_POSTFIELDS,$data);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		
	//json array returned.
	$result = json_decode(curl_exec($ch), true);
	
	// Get the array of data from the result
	$result = $result["Response"]["data"];

	//if data returned it is in the array then the member has been found
	if(is_array($result) && !empty($result))
	{
		return $result;
    }
    else
    {
        return false;
    }
}

function createAccount() {
    // check for required parameters
    $errors = array();

    if (empty($_POST["preferredUsername"]))
    {
        $errors[] = "Preferred Username";
    }

    if (empty($_POST["studentID"]))
    {
        $errors[] = "Student ID";
    }

    if (empty($errors)) {
        if (checkIfUserIsSocietyMember())
        {
            echo json_encode(array("success" => true, "message" => "We have created your account, you should recieve an email shortly with more information."));
        } else {
            echo json_encode(array("success" => false, "message" => "You are not a society member, please follow <a href='https://yourspace.nuigalway.ie/account/index.php?object=VXNlck9yZ2FuaXNhdGlvbk1lbWJlcg==&method=am9pbk9yZ2FuaXNhdGlvblZpZXc=&action=Nw==&actionType=YWRk'>this link</a> to join the society."));
        }
    } else {
        $message = "Please fill in: ";

        foreach ($errors as $error) {
            $message .= $error;

            if (count($errors) > 1) {
                $message .= ", ";
            }
        }

        echo json_encode(array("success" => false, "message" => $message));
    }
    
}

?>