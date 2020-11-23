<?php

/*  CompSoc Events from the Societies Portal
    for compsoc.ie.
 *
 * @author shanehastings@compsoc.ie (shanehastings.eu)
 */

date_default_timezone_set('Europe/Dublin');

// jsonEvents (all CompSoc events)
$compsocEvents = "ENDPOINTURL";
// jsonEvent (URL + $eventID)
$eventDetail = "ENDPOINTURL";

// Import events from Socs Portal endpoint
$allEventsImport = file_get_contents("$compsocEvents");
$allEvents = json_decode($allEventsImport, true);

/*
 * Takes all evenings in $allEvents array and does a jsonEvent async curl request on each
 */


//create the multiple cURL handle
$mh = curl_multi_init();
$requests = array();
$results = array();

// init all requests
foreach ($allEvents as $i => $e)
{
    $requests[$i] = curl_init();

    curl_setopt($requests[$i], CURLOPT_URL, $eventDetail . $e['eventDetailsID']);
    curl_setopt($requests[$i], CURLOPT_POST, false);
    curl_setopt($requests[$i], CURLOPT_RETURNTRANSFER, true);

    curl_multi_add_handle($mh, $requests[$i]);
}

$index=null;

// Exec all requests
do {
    curl_multi_exec($mh,$index);
} while($index > 0);

// get content and remove handles
foreach($requests as $k => $ch) {
    $res = json_decode(curl_multi_getcontent($ch), true);
    $allEvents[$k]['descriptionHTML'] = $res[0]['descriptionHTML'];
    $allEvents[$k]['eventReadUrl'] = $res[0]['eventReadUrl'];
    $allEvents[$k]['description'] = $res[0]['description'];
    $allEvents[$k]['eventICalUrl'] = $res[0]['eventICalUrl'];
    curl_multi_remove_handle($mh, $ch);
}

// close
curl_multi_close($mh);

/*
 * jsonEvent - get more details about a specific event based on the eventID returned from YourSpace.
 * @param eventID (the event ID returned from YourSpace. e.g. 26120)
 */
function getEventDetails($eventID)
{

    global $eventDetail;
    $eventURL = $eventDetail . $eventID;
    $eventDataImport = file_get_contents("$eventURL");
    $eventDetails = json_decode($eventDataImport, true);
    return $eventDetails;
}

/*
 * Lists all events. Past, future, present.
 * This is actually used to list past events, so I'll have to change this at some point.
 */
function listEvents()
{
    global $allEvents;
    foreach ($allEvents as $events) {

        echo "<h3> " . $events['descriptionAbbrev'] . "</h3>";
        echo date("F j, Y", strtotime($events['start']));
        echo " | " . date("g:i a", strtotime($events['start'])) . " to " . date("g:i a", strtotime($events['end']));

        echo "<br>" . html_entity_decode($events['descriptionHTML']) ;


        $eventURL = "https://www.google.com/calendar/render?action=TEMPLATE&ctz=Europe%2FDublin&text=NUIG+CompSoc: ".$events['descriptionAbbrev']."&dates=".date("Ymd\THis\Z",strtotime($events['start'])). "/" .date("Ymd\THis\Z",strtotime($events['end'])) ;
        echo "<div class='btn-toolbar'><a target='_blank' href='https://socs.nuigalway.ie/" . $events['eventReadUrl'] . "'><button type='button' class='btn btn-success'>View event info</button></a> </div><hr>";
    }

}

/*
 * Lists all upcoming events. (Based on today and beyond)
 * Provides a link to add the event to Google Calendar, or download the ics file for adding to other calendars.
 */
function listUpcomingEvents()
{
    // Count how many events there are, and also how many events happened in the past. If these are equal, there are no upcoming events.
    $counterOfNoUpcomingEvents = 0;
    $counterOfEvents = 0;

    global $allEvents;

    foreach ($allEvents as $events) {
        // Add to total event counter (this is a lazy way of doing sizeof($array);
        $counterOfEvents++;
        // Check for events where thee event date is >= today's date.
        $today = date("F j, Y");
        $eventDate = date("Y-m-d G:i:s", strtotime(($events['start'])));
        if ($eventDate >= $today) {
            echo "<h3> " . $events['descriptionAbbrev'] . "</h3>";
            echo date("F j, Y", strtotime($events['start']));
            echo " | " . date("g:i a", strtotime($events['start'])) . " to " . date("g:i a", strtotime($events['end']));

            // html_entity_decode to actually parse and render the YourSpace HTML on the page for images/links.
            echo "<br>" . html_entity_decode($events['descriptionHTML']) . "<br>";
            $eventURL = "https://www.google.com/calendar/render?action=TEMPLATE&ctz=Europe%2FDublin&text=NUIG+CompSoc: ".$events['descriptionAbbrev']."&dates=".date("Ymd\THis\Z",strtotime($events['start'])). "/" .date("Ymd\THis\Z",strtotime($events['end'])) ;
            echo "<div class='btn-toolbar'><a target='_blank' href='https://socs.nuigalway.ie/" . $events['eventReadUrl'] . "'><button type='button' class='btn btn-success'>View / Join event</button></a> &nbsp;<button type='button' class='btn btn-info dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Add to calendar</button><div class='dropdown-menu'><a class='dropdown-item' target='_blank' href='" . $eventURL . "'>Google Calendar</a><div class='dropdown-divider'></div><a class='dropdown-item' href='". $events['eventICalUrl']."'>.ics file</a></div></div><hr>";
        } else {

            // No upcoming events
            $counterOfNoUpcomingEvents++;
        }


    }

    if ($counterOfEvents == $counterOfNoUpcomingEvents) {
        echo "There are no scheduled events. Keep an eye on our Twitter for updates! You can also view our past events below to get a feel for the events we run during the academic year.";
    } else {
        // Event(s) are displayed.
    }

}






