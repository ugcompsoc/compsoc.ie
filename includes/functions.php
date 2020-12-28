<?php

/* CompSoc Website Redesign - 2020
 * @author Conor Mc Govern & Shane Hastings
 * 
 * In here we have pretty much all utility functions that aren't related to LDAP
 */

require_once($_SERVER["DOCUMENT_ROOT"] . "/includes/config.php");

// It is what it looks like.
function getCompsocYearsInExistance(){

    $foundingYear = 1977;
    $currentYear = date("Y");
    $yearsInExistance = $currentYear - $foundingYear;
    return $yearsInExistance;

}

/*
 *  Dear WhoeverMayHaveToDebugThisInTheFuture,
 *      I profusely apologise for ever intergrating APIs into CompSoc, but alas, they are here now and they are wanted.
 *      Please see compsoc_api.zip, somewhere in the admin docs, it is an example (exact replica) of what Dara from
 *      I&C Digital sent us when I asked for the API to be set up. The only ammendmeant that has been made is so that
 *      it returns a nice formated number string of how many members we currently have. If this stops working, its likely
 *      that the password has been changed or something has stopped working on their side.
 *      Le dea-ghuí,
 *      Conor
 * 
 *  On a seperate note, this does add a good few MSs to the load time of the webpage, so it may be an idea to make some
 *  sort of function that does an async-multicurl yoke with this as well as all of the events?
 */
function getNumberOfMembers() {
	$results = getAllSocietyMembers();
    
    $members = strval(count($results));

    if ($members >= 1000) {
        $members = substr_replace($members, ",", 1, 0);
    }

    return $members;
}

/*
 *  Returns all information the Socs Portal has on a person given their student/staff ID
 */
function getSocietyMember($searchValue = null) {
    //url to api
  	$url = SOCS_PORTAL_WEBSERVICES_URL;
	
	
	//Data array of post fields that includes the username and password that will be checked in the rest server for the feed
	//An error will be returned if any parameter is missing a value
	//searchByOption : What field we will be searching by
	$searchByOption = SOCS_PORTAL_WEBSERVICES_SEARCH_BY_OPTION; 
	
    // The search value being used 
    if (empty($searchValue)) {
        $searchValue = $_POST["studentID"]; 
    }
	
	$data = "method=" . base64_encode(SOCS_PORTAL_WEBSERVICES_SINGLE_METHOD) . 
            "&username=" . base64_encode(SOCS_PORTAL_WEBSERVICES_USER) . 
            "&password=" . base64_encode(SOCS_PORTAL_WEBSERVICES_PASSWORD) .
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
    if (empty($result["Response"]["data"])) {
        return false;
    } else {
        $result = $result["Response"]["data"];
    }

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

/*
 *  Returns all information on all members from the Socs Portal
 */
function getAllSocietyMembers() {
    //url to api
  	$url = SOCS_PORTAL_WEBSERVICES_URL;
	
	//Data array of post fields that includes the username and password that will be checked in the rest server for the feed
	//An error will be returned if any parameter is missing a value

	$data = "method=" . base64_encode(SOCS_PORTAL_WEBSERVICES_ALL_METHOD) . 
            "&username=" . base64_encode(SOCS_PORTAL_WEBSERVICES_USER) . 
            "&password=" . base64_encode(SOCS_PORTAL_WEBSERVICES_PASSWORD).
            "&encodeOutput=" . base64_encode(TRUE);
	
	// Set up curl options
	
	$ch = curl_init();

	curl_setopt($ch,CURLOPT_URL,$url);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch,CURLOPT_POSTFIELDS,$data);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		
	//json array returned.
	$result = json_decode(curl_exec($ch), true);

    // Get the array of events
    if (!empty($result)) $result = $result["Response"]["data"];
	
	$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return $result;
}
