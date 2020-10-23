<?php

// It is what it looks like.
function getCompsocYearsInExistance(){

    $foundingYear = 1977;
    $currentYear = date("Y");
    $yearsInExistance = $currentYear - $foundingYear;
    return $yearsInExistance;

}

