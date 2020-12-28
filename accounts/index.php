<?php

/*  CompSoc Website Redesign - 2020
 *  @author Conor Mc Govern
 */

require("../includes/functions.php");

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <!-- Primary Meta Tags -->
    <title>Manage Account - CompSoc - NUI Galway's Computer Society</title>
    <meta name="title" content="CompSoc - NUI Galway's Computer Society">
    <meta name="description"
          content="CompSoc is the longest running Computer Society in Ireland, and a social outlet for NUI Galway students interested in technology.">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https:/compsoc.ie">
    <meta property="og:title" content="CompSoc - NUI Galway's Computer Society">
    <meta property="og:description"
          content="CompSoc is the longest running Computer Society in Ireland, and a social outlet for NUI Galway students interested in technology.">
    <meta property="og:image"
          content="/assets/img/compsoc-meta-social-banner.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https:/compsoc.ie">
    <meta property="twitter:title" content="CompSoc - NUI Galway's Computer Society">
    <meta property="twitter:description"
          content="CompSoc is the longest running Computer Society in Ireland, and a social outlet for NUI Galway students interested in technology.">
    <meta property="twitter:image"
          content="/assets/img/compsoc-meta-social-banner.png">

    <!-- Favicons -->
    <link href="../assets/img/favicon.png" rel="icon">
    <link href="../assets/img/apple-touch-icon.png" rel="apple-touch-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
          rel="stylesheet">
    <link href="../assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="../assets/vendor/icofont/icofont.min.css" rel="stylesheet">
    <link href="../assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
    <link href="../assets/vendor/venobox/venobox.css" rel="stylesheet">
    <link href="../assets/vendor/owl.carousel/assets/owl.carousel.min.css" rel="stylesheet">
    <link href="../assets/vendor/aos/aos.css" rel="stylesheet">
    <link href="../assets/css/style.css" rel="stylesheet">

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-178532999-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());

        gtag('config', 'UA-178532999-1');
    </script>

</head>

<body>

<!-- ======= Mobile nav toggle button ======= -->
<button type="button" class="mobile-nav-toggle d-xl-none"><i class="icofont-navigation-menu"></i></button>

<!-- ======= Header ======= -->
<header id="header">
    <div class="d-flex flex-column">

        <div class="profile">
            <img src="/assets/img/apple-touch-icon.png" alt="" class="img-fluid">
            <h1 class="text-light"><a href="/">CompSoc<br>NUI Galway</a></h1>
            <div class="social-links mt-3 text-center">
                <a href="https://twitter.com/NUIGCompsoc" class="twitter"><i class="bx bxl-twitter"></i></a>
                <a href="https://www.facebook.com/nuigcompsoc/" class="facebook"><i class="bx bxl-facebook"></i></a>
                <a href="https://www.linkedin.com/company/nuig-compsoc?originalSubdomain=ie" class="linkedin"><i
                            class="bx bxl-linkedin"></i></a>
                <a href="https://discord.compsoc.ie" class="discord"><i class="bx bxl-discord"></i></a>
                <a href="mailto:commitee@compsoc.ie" class="linkedin"><i class="bx bx-mail-send"></i></a>
            </div>
        </div>

        <nav class="nav-menu">
            <ul>
                <li><a href="/"><i class="bx bx-home"></i> <span>Home</span></a></li>
                <li ><a href="/#about"><i class="bx bx-user"></i> <span>About us</span></a></li>
                <li><a href="/#services"><i class="bx bx-server"></i> CompSoc Account</a></li>
                <li><a href="/#contact"><i class="bx bx-share-alt"></i> Social Media</a></li>
                <li><a href="/committee"><i class="bx bx-group"></i>Committee 2020/21</a></li>


            </ul>
        </nav><!-- .nav-menu -->
        <nav class="nav-menu">
            <ul>
                <li><a href="https://webmail.compsoc.ie/" target="_blank"><i class="bx bx-envelope"></i> Webmail &nbsp;<svg
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true" focusable="false" width="1em" height="1em"
                                style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
                                preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                            <path d="M13 3l3.293 3.293l-7 7l1.414 1.414l7-7L21 11V3z" fill="#626262"/>
                            <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"
                                  fill="#626262"/>
                            <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)"/>
                        </svg>
                    </a></li>
                <li><a href="https://wiki.compsoc.ie/" target="_blank"><i class="bx bxl-wikipedia"></i> Wiki &nbsp;<svg
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true" focusable="false" width="1em" height="1em"
                                style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
                                preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                            <path d="M13 3l3.293 3.293l-7 7l1.414 1.414l7-7L21 11V3z" fill="#626262"/>
                            <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"
                                  fill="#626262"/>
                            <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)"/>
                        </svg>
                    </a></li>
                <li class="active"><a href="https://my.compsoc.ie/" target="_blank"><i class="bx bx-log-in"></i> Account Self Service
                        &nbsp;<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                   aria-hidden="true" focusable="false" width="1em" height="1em"
                                   style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
                                   preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                            <path d="M13 3l3.293 3.293l-7 7l1.414 1.414l7-7L21 11V3z" fill="#626262"/>
                            <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"
                                  fill="#626262"/>
                            <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)"/>
                        </svg>
                    </a></li>


            </ul>
        </nav><!-- .nav-menu -->
        <button type="button" class="mobile-nav-toggle d-xl-none"><i class="icofont-navigation-menu"></i></button>

    </div>
</header>
<!-- End Header -->

<main id="main">

            <!-- I promise to make this look nice later shane -->
            <script src="../assets/vendor/jquery/jquery.min.js"></script>
            <script>
                $(function() {
                    $("#createSubmit").click(function (event) {
                        event.preventDefault();
                        $.ajax({
                            type: "POST",
                            url: "https://compsoc.ie/webservices.php",
                            data: $('#createAccountForm').serialize(),
                            dataType: 'json',
                            success: function(json) {
                                if (json.code.charAt(0) == '4') {
                                    $('#ajaxMessage').html('<div class="alert alert-danger" role="alert">We encountered errors while processing your request.<br>' + json.message + '<div id="ajaxMessageErrors"></div></div>');
                                    $.each(json.errors, function( index ) { $('#ajaxMessageErrors').html("<li>" + index + ": " + json.errors[index] + "</li>") } );
                                } else {
                                    $('#ajaxMessage').html('<div class="alert alert-success" role="alert">' + json.message + '</div>');
                                }
                            },
                            error: function(error) {
                                console.log(error);
                                //alert("failure");
                            }
                        });
                    });

                    $("#checkSubmit").click(function (event) {
                        event.preventDefault();
                        $.ajax({
                            type: "POST",
                            url: "https://compsoc.ie/webservices.php",
                            data: $('#checkAccountForm').serialize(),
                            dataType: 'json',
                            success: function(json) {
                                if (json.code.charAt(0) == '4') {
                                    $('#ajaxMessage').html('<div class="alert alert-danger" role="alert">We encountered errors while processing your request.<br>' + json.message + '<div id="ajaxMessageErrors"></div></div>');
                                    $.each(json.errors, function( index ) { $('#ajaxMessageErrors').html("<li>" + index + ": " + json.errors[index] + "</li>") } );
                                } else {
                                    $('#ajaxMessage').html("<div class='alert alert-success' role='alert'>" + json.message + "</div>");
                                }
                            },
                            error: function(error) {
                                console.log(error);
                                //alert("failure");
                            }
                        });
                    });
                });
            </script>


            <div class="section-title">
                <h2>CompSoc Account Utilities</h2>
                <p>
                    If you are here to create an account, I highly recommend you go away and think of creative username and not to use seamus. 
                    This username will become the unique identifier for every service we provide.<br/>
                    Here you can also check if you have account, clicking this link will also send a password reset link to the email address we have for you.
                </p>
            </div>

            <div id="ajaxMessage"></div>
            <div class="row">
                <div class="col-7">
                    <div class="row">
                        <form id="createAccountForm" class="form-inline">
                            <input name="method" value="createAccount" type="hidden">

                            <label class="sr-only" for="ID">Student ID</label>
                            <input name="ID" type="text" class="form-control mb-2 mr-sm-2" id="ID" placeholder="183XXXXX">

                            <label class="sr-only" for="username">Username</label>
                            <div class="input-group mb-2 mr-sm-2">
                                <div class="input-group-prepend">
                                <div class="input-group-text">@</div>
                                </div>
                                <input name="username" type="text" class="form-control" id="username" placeholder="seamus">
                            </div>

                            <button id="createSubmit" type="submit" class="btn btn-primary mb-2">Create Account</button>
                        </form>
                    </div>
                </div>

                <div class="col">
                    <div class="row">
                        <form id="checkAccountForm" class="form-inline">
                            <input name="method" value="checkAccount" type="hidden">

                            <label class="sr-only" for="ID">Student ID</label>
                            <input name="ID" type="text" class="form-control mb-2 mr-sm-2" id="ID" placeholder="183XXXXX">

                            <button id="checkSubmit" type="submit" class="btn btn-primary mb-2">Check for account</button>
                        </form>
                    </div>
                </div>
            </div>

            <!--If you are a CompSoc member* and would like an account, please email us at <b>accounts@compsoc.ie</b> with
            the following
            information:<br><br>

            <li>Name</li>
            <li>NUI Galway Email Address</li>
            <li>NUI Galway Student ID</li>
            <li>Preferred username</li>

            <br>*To become a CompSoc member, you can <a href="https://yourspace.nuigalway.ie/">login to YourSpace and
                join</a> or include a membership request in your email.-->

    </section><!-- End CompSoc Account Section -->

</main><!-- End #main -->

<!-- ======= Footer ======= -->
<?php include("../includes/footer.php"); ?>
<!-- End  Footer -->

<a href="#" class="back-to-top"><i class="icofont-simple-up"></i></a>

<!-- Vendor JS Files -->
<script src="../assets/vendor/jquery/jquery.min.js"></script>
<script src="../assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="../assets/vendor/jquery.easing/jquery.easing.min.js"></script>
<script src="../assets/vendor/php-email-form/validate.js"></script>
<script src="../assets/vendor/waypoints/jquery.waypoints.min.js"></script>
<script src="../assets/vendor/counterup/counterup.min.js"></script>
<script src="../assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
<script src="../assets/vendor/venobox/venobox.min.js"></script>
<script src="../assets/vendor/owl.carousel/owl.carousel.min.js"></script>
<script src="../assets/vendor/typed.js/typed.min.js"></script>
<script src="../assets/vendor/aos/aos.js"></script>

<!-- Template Main JS File -->
<script src="../assets/js/main.js"></script>

</body>

</html>