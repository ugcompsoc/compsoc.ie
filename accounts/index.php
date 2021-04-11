<?php

/*  CompSoc Website Redesign - 2020
 *  @author Conor Mc Govern & Shane Hastings
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

    <!-- reCaptcha -->
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>

    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());

        gtag('config', 'UA-178532999-1');
    </script>

    <style>
        .btn-primary {
            color: #fff;
            background-color: #149DDD;
            border-color: #007bff;
        }

        .form-control:focus {
            color: #495057;
            background-color: #fff;
            border-color: #149DDD;
            outline: 0;
            box-shadow: 0 0 0 0.1rem #149DDD;
        }

        h3 {
            font-size: 22px;
            font-weight: bold;
            position: relative;
            color: #173b6c;
        }
    </style>
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
                <li class="active"><a href="https://compsoc.ie/accounts" target="_blank"><i class="bx bx-log-in"></i> Account Self Service
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

    <!-- ======= Breadcrumbs ======= -->
    <section class="breadcrumbs">
        <div class="container">

            <div class="d-flex justify-content-between align-items-center">
                <h2>Manage your account </h2>
                <ol>

                </ol>
            </div>

        </div>
    </section><!-- End Breadcrumbs -->

    <!-- Account utilities go in this section -->
    <section id="about" class="inner-page">
        <div class="container">
            <div class="section-title">
                <h2>CompSoc Account Utilities</h2>
                <p>
                    If you are here to create an account, I highly recommend you go away and think of creative username and not to use MoeLovesDuff.
                    This username will become the unique identifier for every service we provide. Here you can also check if you have account, and reset your password.
                </p>
            </div>

            <div id="ajaxMessage"></div>

            <!-- Form Functions in main.js -->
            <div class="row">

                <div class="col-md">
                    <h3>Create an account</h3>
                    To create an account, enter your NUI Galway Student ID number below alongside your desired username. We'll send you an email with all the details shortly after.
                    <hr>
                    <form id="createAccountForm">
                        <input name="method" value="createAccount" type="hidden">
                        <div class="form-group">
                            <label for="ID">Student ID</label>
                            <input type="text" class="form-control" name="ID" id="ID" aria-describedby="studentid" placeholder="e.g. 17XXXXXX">
                        </div>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" class="form-control" name="username" id="username" placeholder="e.g. MoeLovesDuff">
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="termsCheckBox" name="termsCheckBox">
                            <label class="form-check-label" for="termsCheckBox">I confirm that I have read and agree to the <b><a href="https://wiki.compsoc.ie/About-CompSoc/Terms-Of-Use">CompSoc Terms of Use</a></b> and <b><a href="http://www.nuigalway.ie/information-solutions-services/ictpolicies/">NUI Galway IT policies</a></b>.</label>
                        </div>
                        <hr>
                        <button class="btn btn-primary mb-2 g-recaptcha" data-sitekey="6Lf8YRoaAAAAAFHvxu8SJ7MGzp7sajovZWANk3OA" data-callback='recaptcha_callback_create_submit'>Create Account</button>
                    </form>
                </div>

                <div class="col-md">
                    <h3>Not sure if you have an account?</h3>
                    Enter your NUI Galway Student ID number below and we'll check if you have an account. If you do, we'll send you an email with your username.
                    <hr>
                    <form id="checkAccountForm">
                        <input name="method" value="checkAccount" type="hidden">
                        <div class="form-group">
                            <label for="ID">Student ID</label>
                            <input type="text" class="form-control" name="ID" id="ID" aria-describedby="studentID" placeholder="e.g. 17XXXXXX">
                        </div>
                        <hr>
                        <button class="btn btn-primary mb-2 g-recaptcha" data-sitekey="6Lf8YRoaAAAAAFHvxu8SJ7MGzp7sajovZWANk3OA" data-callback='recaptcha_callback_check_submit'>Check for Account</button>
                    </form>
                </div>
            </div>

            <hr>

            <div class="row">
                <div class="col-md">
                    <h3>Reset your password</h3>
                    To reset your password you will need to go to <a href="https://sso.compsoc.ie/auth/realms/base/account">this site</a> and click 'Forgot Password?'. Enter your username and click submit.
                    We will send you an email with a link to our SSO where you can reset your password.
                </div>
            </div>
        </div>

    </section>

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
