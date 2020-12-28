<?php

/* CompSoc Website Redesign - 2020
 * @author Conor Mc Govern & Shane Hastings
 * 
 * The only functions that should be in this file are the ones that you want to be publicly accessible.
 * The goal of this PHP script is to allow for our discord bot and website form to make API calls.
 * This may be opened up to allow for the public to make their own API calls at some point.
 */

require_once($_SERVER["DOCUMENT_ROOT"] . "/includes/ldap.php");
require_once($_SERVER["DOCUMENT_ROOT"] . "/includes/config.php");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Post request comes up with method name, call the method specified
if (!empty($_POST["method"])) {
    if (function_exists($_POST["method"])) {
        $func = $_POST["method"];
        $func();
    }
} else {
    echo json_encode(array("code" => "400", "message" => "Method not specified"));
}

/*
 *  REST route for createAccount form, includes all responses for different eventuallities.
 */
function createAccount() {
    // TODO SHANE: Should probably double check these for trailing slashes and injections
    $ID = $_POST["ID"];
    $username = $_POST["username"];

    // check for required parameters
    $errors = array();

    // Check username is empty
    if (empty($_POST["username"]))
    {
        $errors["username"] = "empty.";
    }
    // Check username is not alphanumeric
    else if (!ctype_alnum($username)) {
        $errors["username"] = "not alphanumeric.";
    }

    // Check ID is empty
    // We don't really need to check if the ID is valid as the Socs Portal is going to do that for us
    if (empty($ID))
    {
        $errors["ID"] = "empty.";
    }

    // First we want to check if the user already exists on our side and that the username is free, then we check if they are in the society as that takes more time
    if (empty($errors)) {

        if (!searchByUsername($username)) {
            if (!searchByID($ID)) {
                if (getSocietyMember($ID)) {
                    // Passed all checks, make account
                    if (addAccount($username, $ID)) {
                        echo json_encode(array("code" => "201", "message" => "We have created your account, you should recieve an email shortly with more information. EMAIL FUNC NOT WORKING YET."));
                    } else {
                        // Had an issue emailing or connecting to LDAP
                        echo json_encode(array("code" => "500", "message" => "Unfortunetly we failed to create an account for you, we don't think this is an issue on your end. Please try again or contact us on support@compsoc.ie."));
                    }
                } else {
                    echo json_encode(array("code" => "403", "message" => "You are not a society member, please follow <a href='https://yourspace.nuigalway.ie/account/index.php?object=VXNlck9yZ2FuaXNhdGlvbk1lbWJlcg==&method=am9pbk9yZ2FuaXNhdGlvblZpZXc=&action=Nw==&actionType=YWRk'>this link</a> to join the society."));
                }
            } else {
                echo json_encode(array("code" => "409", "message" => "You already have an account."));
            }
        } else {
            echo json_encode(array("message" => "Unfortunetly that username has already been taken, please try another username.", "code" => "409"));
        }

    } else {
        echo json_encode(array("code" => "400", "errors" => $errors));
    }
}

/*
 *  REST route for checkAccount form, includes all responses for different eventuallities.
 */
function checkAccount() {
    // TODO SHANE: Should probably double check these for trailing slashes and injections
    $ID = $_POST["ID"];

    // check for required parameters
    $errors = array();

    // Check ID is empty
    // We don't really need to check if the ID is valid as the Socs Portal is going to do that for us
    if (empty($ID))
    {
        $errors["ID"] = "empty.";
    }

    if (empty($errors)) {
        $usr = searchByID($ID);

        if (empty($usr)) {
            echo json_encode(array("code" => "404", "message" => "Unfortunely we couldn't find an account associated with this ID. If you are sure you have an account, please contact accounts@compsoc.ie."));
        } else {
            echo json_encode(array("code" => "200", "message" => "We got you here " . $usr["firstName"] . " " . $usr["lastName"] . " :). Having issues? You can reset your password if you want here, a reset password link will go to your email on file."));
        }
    } else {
        echo json_encode(array("code" => "400", "errors" => $errors));
    }
}

?>