<?php

    /* CompSoc Website Redesign - 2020
    * @author Conor Mc Govern & Shane Hastings
    * 
    * This script interfaces with our LDAP directory hosted on mona, this might be changed to interface with KeyCloak at some point
    */

    require_once($_SERVER["DOCUMENT_ROOT"] . "/webservices.php");
    require_once($_SERVER["DOCUMENT_ROOT"] . "/includes/config.php");
    require_once($_SERVER["DOCUMENT_ROOT"] . "/includes/functions.php");

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    // Connects to LDAP
    function bind() {
        $ds=ldap_connect(LDAP_URL)
            or die("Could not connect to {" . LDAP_URL . "}");
        $ldapbind=false;
        if(ldap_set_option($ds, LDAP_OPT_PROTOCOL_VERSION, 3))
            if(ldap_set_option($ds, LDAP_OPT_REFERRALS, 0))
            // Start TLS disabled until we can figure out how to import the ssl cert
                //if(ldap_start_tls($ds))
                    $ldapbind = @ldap_bind($ds, LDAP_ADMIN_USER, LDAP_ADMIN_PASSWORD);
        
        return $ds;
    }

    /*
     *  Returns the entry related to a student/staff ID
     */
    function searchByID($id) {
        $ds = bind();

        $filter = "(|(employeeNumber=$id))";
        $returnValues = array("givenName", 
                            "sn", 
                            "mail", 
                            "employeeNumber",
                            "uid",
                            "userpassword",
                            "dn"
                        );

        $sr = ldap_search($ds, BASE_DN, $filter, $returnValues);
        $values = ldap_get_entries($ds, $sr);
        ldap_close($ds);

        if ($values["count"] == 0) {
            return false;
        } else {
            $info = $values[0];
            return array("ID" => $info["employeenumber"][0], 
                        "firstName" => $info["givenname"][0], 
                        "lastName" => $info["sn"][0], 
                        "email" => $info["mail"][0],
                        "uid" => $info["uid"][0],
                        "userpassword" => $info["userpassword"][0],
                        "dn" => $info["dn"]
                    );
        }
    }

    /*
     *  Returns the entry related to a particular UID
     */
    function searchByUsername($username) {
        $ds = bind();

        $filter = "(|(uid=$username))";
        $returnValues = array("givenName", 
                            "sn", 
                            "mail", 
                            "employeeNumber", 
                            "uid"
                        );

        $sr = ldap_search($ds, BASE_DN, $filter, $returnValues);
        $values = ldap_get_entries($ds, $sr);
        ldap_close($ds);

        if ($values["count"] == 0) {
            return false;
        } else {
            $info = $values[0];
            return array("ID" => $info["employeenumber"][0], 
                        "firstName" => $info["givenname"][0], 
                        "lastName" => $info["sn"][0], 
                        "email" => $info["mail"][0], 
                        "uid" => $info["uid"][0]
                    );
        }
    }

    /*
     *  Returns all entries under BASE_DN
     */
    function searchAll() {
        $ds = bind();

        $filter = "uid=*";
        $returnValues = array("givenName", 
                            "sn", 
                            "mail", 
                            "employeeNumber", 
                            "uid", 
                            "uidNumber"
                        );
        
        $sr = ldap_search($ds, BASE_DN, $filter, $returnValues);
        $values = ldap_get_entries($ds, $sr);
        ldap_close($ds);

        unset($values["count"]);

        return $values;
    }

    /*
     * Takes in all entries in LDAP, inclusive of all groups, servers, everything.
     * Loops over all entries and returns the highest uidNumber + 1
     */
    function getNextUIDNumber() {
        $entries = searchAll();
        $highestUID = 0;

        foreach ($entries as $key => $e) {
            if($highestUID < $e["uidnumber"][0]) {
                $highestUID = $e["uidnumber"][0];
            }
        }
        
        $highestUID += 1;
        return $highestUID;
    }

    /*
     *  Add account says as it does on the tin. The only time this will fallover is if LDAP cannot
     *  be contacted or if socs.nuigalway.ie cannot be contacted. We're just taking the info from
     *  the socs website and popping it into LDAP. We're setting a lot of defaults here like gidNumber: 100
     *  but I don't know how we can get the info that someone is an admin (realistically none without
     *  forfiting some security). We're also emailing the user with all their info, might as well give them
     *  access to the account that they want!
     */
     function addAccount($username, $ID) {
        $ds = bind();
        $socsInfo = getSocietyMember($ID);
        $func = PASSWORD_GEN_FUNC_NAME;
        $password = $func(PASSWORD_GEN_FUNC_PARAM);

        $info["cn"][0] = $socsInfo["FirstName"] . " " . $socsInfo["LastName"];
        $info["givenname"][0] = $socsInfo["FirstName"];
        $info["sn"][0] = $socsInfo["LastName"];
        $info["employeenumber"][0] = $socsInfo["MemberID"];
        $info["mail"][0] = $socsInfo["Email"];
        $info["mobile"][0] = $socsInfo["PhoneNumber"];
        $info["uid"][0] = $username;
        $info["objectclass"][0] = "inetOrgPerson";
        $info["objectclass"][1] = "posixAccount";
        $info["objectclass"][2] = "top";
        $info["loginshell"][0] = "/bin/bash";
        $info["homedirectory"][0] = "/home/users/" . $username;
        $info["gidnumber"][0] = "100";
        $info["userPassword"][0] = $password;
        $info["uidnumber"][0] = getNextUIDNumber();
        $info["gecos"][0] = $info["cn"][0];

        // Taking all info in $info and putting it into LDAP under uid=username,peopleDN
        $a = ldap_add($ds, "uid=" . $username . "," . PEOPLE_DN, $info);
        ldap_close($ds);

        // Email the person
        $to = $socsInfo["Email"];
        $subject = 'Account Creation Request';

        $headers = "From: accounts@compsoc.ie\r\n";
        $headers .= "Reply-To: accounts@compsoc.ie\r\n";
        $headers .= "BCC: admin@compsoc.ie\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

        $message = "<p>Hi " . $socsInfo["FirstName"] . ",<br><br>

        You have requested an account for the NUI Galway's Computer Society's server. If you have not requested this account, please <a href='mailto:support@compsoc.ie'>contact us</a> and we will happily undo this request.<br><br>

        Here are the details for your account and the information that we currently hold:<br>
        Name: " . $socsInfo["FirstName"] . " " . $socsInfo["LastName"] . "<br>
        Username: " . $username . "<br>
        Password: " . $password . " (We highly recommend you reset this password, visit our <a href='https://wiki.compsoc.ie'>wiki</a> to learn how)<br>
        Primary Email: " . $socsInfo["Email"] . "<br>
        CompSoc Email: " . $username . "@compsoc.ie<br>
        Student/Staff ID: " . $socsInfo["MemberID"] . "<br>";
        if (!empty($socsInfo["PhoneNumber"])) $message .= "Mobile: " . $socsInfo["PhoneNumber"] . "<br><br>

        If you take issue with us holding any of the above information, please do not hesitate to <a href='mailto:support@compsoc.ie'>contact us</a><br><br>
        
        Kind Regards,<br>
        CompSoc Admins";

        // return true or false depending on if mail and account was added
        return $a;
        
        // Mail on mojo not working currently (probably security in front of it)
        //if (mail($to, $subject, $message, $headers)) return $a;
        //else return false;
    }

    function verifyPassword($password, $hash)
    {
        if ($hash == '') // no password
        {
            return FALSE;
        }
        
        if ($hash{0} != '{') // plaintext password
        {
            if ($password == $hash) return TRUE;
            return FALSE;
        }
        
        if (substr($hash,0,7) == '{crypt}')
        {
            if (crypt($password, substr($hash,7)) == substr($hash,7)) return TRUE;
            return FALSE;
        }
        elseif (substr($hash,0,5) == '{MD5}')
        {
            $encrypted_password = '{MD5}' . base64_encode(md5( $password,TRUE));
        }
        elseif (substr($hash,0,6) == '{SHA1}')
        {
            $encrypted_password = '{SHA}' . base64_encode(sha1( $password, TRUE ));
        }
        elseif (substr($hash,0,6) == '{SSHA}')
        {
            $salt = substr(base64_decode(substr($hash,6)),20);
            $encrypted_password = '{SSHA}' . base64_encode(sha1( $password . $salt, TRUE ). $salt);
        }
        else
        {
            //echo "Unsupported password hash format";
            return FALSE;
        }
        
        if ($hash == $encrypted_password) return $encrypted_password;
        
        return FALSE;
    }

    function changePassword($dn, $oldPasswordHash, $newPassword) {
        $ds = bind();
        $values = array();

        if ($oldPasswordHash == '') // no password
        {
            return FALSE;
        }
        elseif ($oldPasswordHash{0} != '{') // plaintext password
        {
            $values["userpassword"][0] = $newPassword;
        }
        elseif (substr($oldPasswordHash,0,7) == '{crypt}')
        {
            $values["userpassword"][0] = crypt($newPassword, substr($oldPasswordHash,7));
        }

        elseif (substr($oldPasswordHash,0,5) == '{MD5}')
        {
            $values["userpassword"][0] = '{MD5}' . base64_encode(md5($newPassword,TRUE));
        }
        elseif (substr($oldPasswordHash,0,6) == '{SHA1}')
        {
            $values["userpassword"][0] = '{SHA}' . base64_encode(sha1( $newPassword, TRUE ));
        }
        elseif (substr($oldPasswordHash,0,6) == '{SSHA}')
        {
            $salt = substr(base64_decode(substr($oldPasswordHash,6)),20);
            $values["userpassword"][0] = '{SSHA}' . base64_encode(sha1( $newPassword . $salt, TRUE ). $salt);
        }
        else
        {
            return FALSE;
        }

        $m = ldap_modify($ds, $dn, $values);
        return $m;
    }
        
?>