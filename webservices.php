<?php

/* CompSoc Website Redesign - 2020
 * @author Conor Mc Govern & Shane Hastings
 * 
 * The only functions that should be in this file are the ones that you want to be publicly accessible.
 * The goal of this PHP script is to allow for our discord bot and website form to make API calls.
 * This may be opened up to allow for the public to make their own API calls at some point.
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once($_SERVER["DOCUMENT_ROOT"] . "/includes/ldap.php");
require_once($_SERVER["DOCUMENT_ROOT"] . "/includes/config.php");
require_once($_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php");

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
    // TODO CONOR/DAVID: When discord bot is implemented we will need a way to bypass reCAPTCHA
    $ID = $_POST["ID"];
    $username = $_POST["username"];
    $grecaptcharesponse = $_POST["g-recaptcha-response"];

    // check for required parameters
    $errors = array();

    // Check username is empty
    if (empty($_POST["username"]))
    {
        $errors["Username"] = "empty.";
    }
    // Check username is not alphanumeric
    else if (!ctype_alnum($username)) {
        $errors["Username"] = "not alphanumeric.";
    }

    // Check ID is empty
    // We don't really need to check if the ID is valid as the Socs Portal is going to do that for us
    if (empty($ID))
    {
        $errors["ID"] = "empty.";
    }

    if (empty($_POST["termsCheckBox"])) {
        $errors["Terms Check Box"] = "unchecked.";
    }

    if (empty($grecaptcharesponse)) {
        $errors["reCAPTCHA"] = "invalid.";
    } else {
        $secret = RECAPTCHA_SECRET_KEY;

        $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $grecaptcharesponse);
        $responseData = json_decode($verifyResponse);
        if(!$responseData->success) $errors["reCAPTCHA"] = "invalid.";
    }

    // First we want to check if the user already exists on our side and that the username is free, then we check if they are in the society as that takes more time
    if (empty($errors)) {

        if (!searchByUsername($username)) {
            if (!searchByID($ID)) {
                $checkUsername = checkUsername($username);
                if ($checkUsername === true) {
                    if (getSocietyMember($ID)) {
                        // Passed all checks, make account
                        if (addAccount($username, $ID)) {
                            echo json_encode(array("code" => "201", "message" => "We have created your account, you should recieve an email shortly with more information."));
                        } else {
                            // Had an issue emailing or connecting to LDAP
                            echo json_encode(array("code" => "500", "message" => "Unfortunetly we failed to create an account for you, we don't think this is an issue on your end. Please try again or contact us on support@compsoc.ie."));
                        }
                    } else {
                        echo json_encode(array("code" => "401", "message" => "You are not a society member, please follow <a href='https://yourspace.nuigalway.ie/account/index.php?object=VXNlck9yZ2FuaXNhdGlvbk1lbWJlcg==&method=am9pbk9yZ2FuaXNhdGlvblZpZXc=&action=Nw==&actionType=YWRk'>this link</a> to join the society."));
                    }
                } else {
                    echo json_encode(array("code" => "401", "message" => "This username is or contains a string which we deem to be sensitive. Please pick another username. Clashing string: " . $checkUsername));
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

        echo json_encode(array("code" => "200", "message" => "If an account exists under this ID, we will send an email to email address we have on file."));

        if (!empty($usr["email"])) {
            // Email the person
            
            // PHPMailer Object
            $mail = new PHPMailer(true);

            $mail->IsSMTP();
            $mail->Host = SMTP_HOST;
            $mail->SMTPAuth = true;
            $mail->Username = SMTP_USER;
            $mail->Password = SMTP_PASSWORD;

            // From email address and name
            $mail->From = "accounts@compsoc.ie";
            $mail->FromName = "NUI Galway CompSoc Accounts";

            $mail->addAddress($usr["email"], $usr["firstName"] . " " . $usr["lastName"]);
            $mail->addReplyTo("accounts@compsoc.ie", "Reply");
            $mail->addBCC("admin@compsoc.ie");

            $mail->isHTML(true);

            $mail->Subject = "Account Check Request";

            $message = "<p>Hi " . $usr["firstName"] . ",<br><br>

            We have recently have had a request made through <a href='https://compsoc.ie/accounts'>our website</a> to check if you have an account.<br>
            We are emailing you to confirm that we do have your account here. Your username is " . $usr['uid'] . ".<br><br>

            If you have not made this request, you can safely ignore this email. Though, if you continually receive these emails please <a href='mailto:support@compsoc.ie'>contact us</a> and we will be happy to help.<br><br>

            Please do not hesitate to <a href='mailto:support@compsoc.ie'>contact us</a> if you have any other issues.<br><br>
            
            Kind Regards,<br>
            CompSoc Admins";

            $mail->Body = $message;

            try {
                $mail->send();
                return true;
            } catch (Exception $e) {
                //echo "Mailer Error: " . $mail->ErrorInfo;
                return false;
            }
        }
    } else {
        echo json_encode(array("code" => "400", "errors" => $errors));
    }
}

/*
 *  REST route for resetPassword form, includes all responses for different eventuallities.
 */
function resetPassword() {
    // check for required parameters
    $errors = array();

    // TODO SHANE: Should probably double check these for trailing slashes and injections
    if (!empty($_POST["ID"])) $ID = $_POST["ID"];
    else $errors["ID"] = "empty.";
    if (!empty($_POST["oldPassword"])) $oldPassword = $_POST["oldPassword"];
    else $errors["Old Password"] = "empty.";
    if (!empty($_POST["newPassword"])) $newPassword = $_POST["newPassword"];
    else $errors["New Password"] = "empty.";
    if (!empty($_POST["newConfirmedPassword"])) $newConfirmedPassword = $_POST["newConfirmedPassword"];
    else $errors["New Confirmed Password"] = "empty.";
    if (!empty($_POST["g-recaptcha-response"])) $grecaptcharesponse = $_POST["g-recaptcha-response"];
    else $errors["reCAPTCHA"] = "invalid.";

    if ($_POST["newPassword"] != $_POST["newConfirmedPassword"]) $errors["New Password & New Confirmed Password"] = "not the same.";

    // Validate password strength
    $uppercase = preg_match('@[A-Z]@', $_POST["newPassword"]);
    $lowercase = preg_match('@[a-z]@', $_POST["newPassword"]);
    $number    = preg_match('@[0-9]@', $_POST["newPassword"]);
    $specialChars = preg_match('@[^\w]@', $_POST["newPassword"]);

    if(!$uppercase || !$lowercase || !$number || !$specialChars || strlen($_POST["newPassword"]) < 8) {
        $errors["Password Strength"] = 'Password should be at least 8 characters in length and should include at least one upper case letter, one number, and one special character.';
    }

    if (empty($grecaptcharesponse)) {
        $errors["reCAPTCHA"] = "invalid.";
    } else {
        $secret = RECAPTCHA_SECRET_KEY;

        $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $grecaptcharesponse);
        $responseData = json_decode($verifyResponse);
        if(!$responseData->success) $errors["reCAPTCHA"] = "invalid.";
    }

    if (empty($errors)) {
        $usr = searchByID($ID);

        if (verifyPassword($oldPassword, $usr["userpassword"])) {
            if (changePassword($usr["dn"], $usr["userpassword"], $newPassword)) {
                echo json_encode(array("code" => "200", "message" => "Password Successfully Changed."));

                // PHPMailer Object
                $mail = new PHPMailer(true);

                $mail->IsSMTP();
                $mail->Host = SMTP_HOST;
                $mail->SMTPAuth = true;
                $mail->Username = SMTP_USER;
                $mail->Password = SMTP_PASSWORD;

                // From email address and name
                $mail->From = "accounts@compsoc.ie";
                $mail->FromName = "NUI Galway CompSoc Accounts";

                $mail->addAddress($usr["email"], $usr["firstName"] . " " . $usr["lastName"]);
                $mail->addReplyTo("accounts@compsoc.ie", "Reply");
                $mail->addBCC("admin@compsoc.ie");

                $mail->isHTML(true);

                $mail->Subject = "Account Password Reset";

                $message = "<html><body><p>Hi " . $usr["firstName"] . ",<br><br>

                We are emailing you to let you know that your password has recently been changed for " . $usr['uid'] . ". If it was not you who changed your password, please <a href='mailto:support@compsoc.ie'>contact us</a> immediately.<br><br>

                If you have any other issues, please do not hesitate to <a href='mailto:support@compsoc.ie'>contact us</a>.<br><br>

                Kind Regards,<br>
                CompSoc Admins</body></html>";

                $mail->Body = $message;

                try {
                    $mail->send();
                } catch (Exception $e) {
                    //echo "Mailer Error: " . $mail->ErrorInfo;
                }
            } else {
                echo json_encode(array("code" => "500", "message" => "Error changing password, please try again."));
            } 
        } else {
            echo json_encode(array("code" => "401", "message" => "Old password incorrect, try again."));
        }
    } else {
        echo json_encode(array("code" => "400", "errors" => $errors));
    }

}

?>