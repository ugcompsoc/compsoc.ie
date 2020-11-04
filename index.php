<?php

/*  CompSoc Website Redesign - 2020
 *  @author Shane Hastings
 */

function error_found()
{
    echo "Unable to get events from server.";
}

set_error_handler('error_found');

require("includes/functions.php");
require("includes/allEvents.php");
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <!-- Primary Meta Tags -->
    <title>CompSoc - NUI Galway's Computer Society</title>
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
    <link href="assets/img/favicon.png" rel="icon">
    <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
          rel="stylesheet">

    <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/vendor/icofont/icofont.min.css" rel="stylesheet">
    <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
    <link href="assets/vendor/venobox/venobox.css" rel="stylesheet">
    <link href="assets/vendor/owl.carousel/assets/owl.carousel.min.css" rel="stylesheet">
    <link href="assets/vendor/aos/aos.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-178532999-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());

        gtag('config', 'UA-178532999-1');

        var nobodywilleverseethis = ["Why are you in the console?", "I'm just here for the pints","Please help me. I'm stuck inside Mojo and can't get out!","Why did the programmer quit his job? Because he didnt get arrays...", "An SEO expert walks into a bar, bars, pub, tavern, public house, irish pub, drinks, beer...",
           "A SQL query walks up to 2 tables in a restaurant and asks 'Mind if I join you?'",
            "Why did the developer leave the restaurant? Because of the table layout...", "Knock, Knock... Who's there? Very long pause...... It's me Java",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem...", "Whats the object-oriented way to become wealthy? Inheritance...",
            "Why do Java programmers have to wear glasses? Because they don't see sharp...",
            "!false ... it's funny because it's true",
            "What's the best thing about UDP jokes? Nobody cares if you get them.", "What is the most used language in programming? Profanity.",
            "4 fonts walk into a bar. Barman says \"we don't serve your type in here\""];
        console.log('%c' + nobodywilleverseethis[Math.floor(Math.random() * nobodywilleverseethis.length)], 'background: #149ddd; color: #ffffff; font-size: 24px;');
    </script>

</head>

<body>

<!-- ======= Mobile nav toggle button ======= -->
<button type="button" class="mobile-nav-toggle d-xl-none"><i class="icofont-navigation-menu"></i></button>

<!-- ======= Header ======= -->
<?php include("includes/header.php"); ?>
<!-- End Header -->

<!-- ======= Hero Section ======= -->
<section id="hero" class="d-flex flex-column justify-content-center align-items-center">
    <div class="hero-container" data-aos="fade-in">
        <h1>NUI Galway's</h1>
        <p><span class="typed" data-typed-items="Computer, Developer, Technology"></span> society</p>
    </div>

</section><!-- End Hero -->

<main id="main">
    <!-- ======= Events Section ======= -->
    <section id="about1" class="about section-bg">
        <div class="container">

            <div id="accordion">


                <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true"
                            aria-controls="collapseOne">
                        <div class="section-title"><h2>Upcoming events</h2></div>
                    </button>
                </h5>
                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                        <?php listUpcomingEvents(); ?>
                    </div>
                </div>

                <hr>

                <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true"
                            aria-controls="collapseTwo">
                        <div class="section-title"><h2>Past events <i class="bx bx-chevron-down"></i></h2></div>
                    </button>
                </h5>


                <div id="collapseTwo" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                        <?php listEvents(); ?>
                    </div>
                </div>


            </div>

        </div>


        </div>
    </section><!-- End Events Section -->


    <!-- ======= About Section ======= -->
    <section id="about" class="about">
        <div class="container">
            <img src="assets/img/compsoc_banner-web-blue-purple-whitebg.png" width="30%"><br>
            <hr>
            <div class="row">
                <div class="col-sm">

                    <div class="section-title"><h2>Who we are</h2></div>
                    <p>
                        CompSoc is NUI Galway’s Computer and Networking Society. We host events for everything computing
                        related from how to setup your own blog to System Administration and Programming Tutorials. We
                        also host a number of services on our Society run servers for our members. CompSoc is the oldest
                        computer-related society in Ireland, while many Alumni believe it was much earlier, was formally
                        established in 1977 during the days that the University was known as UCG.</p>
                </div>
                <div class="col-sm">
                    <div class="section-title"><h2>Our mission</h2></div>
                    <p>CompSoc’s main goal is to try and foster a love and passion for all things technology related in
                        NUI Galway. We host a wide variety of events to work towards this goal, including workshops
                        about Linux, hardware and programming.

                        As outlined under our Constitution, our aims is to “promote and increase awareness of electronic
                        communication and related computer systems, a forum to discuss and gain experience in computer
                        networking and systems and to help educate people in the usage of Internet utilities and
                        resources”.</p>
                </div>
            </div>

            <div class="row">
                <div class="col-sm">
                    <div class="section-title"><h2>Our constitution</h2></div>
                    <p>You can find our constitution <b><a href="constitution/">here</a></b>, as ratified by the USCG
                        (<i>"University Societies Coordination Group"</i>) on 30th November, 2015.</p>
                </div>
            </div>

        </div>
    </section><!-- End About Section -->
    <hr>
    <!-- ======= Facts Section ======= -->
    <section id="facts" class="facts">
        <div class="container">


            <div class="row no-gutters">
                <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch" data-aos="fade-up">
                    <div class="count-box">
                        <i class="icofont-calendar"></i>
                        <span data-toggle="counter-up"><?php echo getCompsocYearsInExistance(); ?></span>
                        <p><strong>years</strong> established</p>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch" data-aos="fade-up" data-aos-delay="100">
                    <div class="count-box">
                        <i class="icofont-document-folder"></i>
                        <span data-toggle="counter-up">1,000</span>
                        <p><strong>members</strong> and growing each year</p>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch" data-aos="fade-up" data-aos-delay="200">
                    <div class="count-box">
                        <i class="icofont-live-support"></i>
                        <span data-toggle="counter-up">13</span>
                        <p><strong>committee members</strong> in 2020/21</p>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch" data-aos="fade-up" data-aos-delay="300">
                    <div class="count-box">
                        <i class="icofont-users-alt-5"></i>
                        <span data-toggle="counter-up">5</span>
                        <p><strong>GB </strong> free server space per member</p>
                    </div>
                </div>

            </div>

        </div>
    </section><!-- End Facts Section -->


    <!-- ======= CompSoc Account Section ======= -->
    <section id="services" class="services section-bg">
        <div class="container">

            <div class="section-title">
                <h2>CompSoc Account</h2>
                <p>We offer all CompSoc members free access to an account on our servers. This gives you access to:</p>
            </div>

            <div class="row">
                <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up">
                    <div class="icon"><i class="icofont-database"></i></div>
                    <h4 class="title"><a href="">Storage Space</a></h4>
                    <p class="description">All accounts come provisioned with 5GB server space by default.</p>
                </div>
                <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="100">
                    <div class="icon"><i class="icofont-console"></i></div>
                    <h4 class="title"><a href="">SSH Access</a></h4>
                    <p class="description">You will have SSH access to your account, with support for tunnelling if
                        needed.</p>
                </div>
                <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="200">
                    <div class="icon"><i class="icofont-envelope"></i></div>
                    <h4 class="title"><a href="">Email</a></h4>
                    <p class="description">CompSoc members will receive their own @compsoc.ie email account.</p>
                </div>


            </div>
            If you are a CompSoc member* and would like an account, please email us at <b>accounts@compsoc.ie</b> with
            the following
            information:<br><br>

            <li>Name</li>
            <li>NUI Galway Email Address</li>
            <li>NUI Galway Student ID</li>
            <li>Preferred username</li>

            <br>*To become a CompSoc member, you can <a href="https://yourspace.nuigalway.ie/">login to YourSpace and
                join</a> or include a membership request in your email.

    </section><!-- End CompSoc Account Section -->


    <!-- ======= Social Media  Section ======= -->
    <section id="contact" class="contact">
        <div class="container">

            <div class="section-title">
                <h2>Social Media</h2>
                <p>You can get in touch with us by email, social media or by attending one of our events (everyone is
                    welcome!).</p>
            </div>

            <div class="row" data-aos="fade-in">

                <div class="col-lg-5 d-flex align-items-stretch">
                    <div class="info">
                        <div class="address">
                            <i class="icofont-google-map"></i>
                            <h4>Location</h4>
                            <p>CompSoc, c/o Societies Office, Áras na Mac Léinn, NUI Galway, University Road, Galway,
                                Ireland</p>
                        </div>

                        <div class="email">
                            <i class="icofont-envelope"></i>
                            <h4>Email</h4>
                            <p>compsoc@socs.nuigalway.ie</p>
                        </div>

                        <div class="email">
                            <i class="icofont-twitter"></i>
                            <h4>Tweet</h4>
                            <p><a href="https://twitter.com/NUIGCompsoc">@NUIGCompsoc</a></p>
                        </div>

                        <div class="email">
                            <i class="icofont-facebook"></i>
                            <h4>Facebook</h4>
                            <p><a href="https://www.facebook.com/nuigcompsoc/">/NUIGCompSoc</a></p>
                        </div>

                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1192.8049748746676!2d-9.060928941645427!3d53.27860804875015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485b96f199468d6b%3A0x38d894c0eee8ab25!2sNUI%20Galway%20Computer%20Society!5e0!3m2!1sen!2sie!4v1600623742256!5m2!1sen!2sie"
                                frameborder="0" style="border:0; width: 100%; height: 290px;" allowfullscreen></iframe>

                    </div>

                </div>

                <div class="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                    <div class="info">
                        <a class="twitter-timeline" data-height="650"
                           href="https://twitter.com/NUIGCompsoc?ref_src=twsrc%5Etfw">Tweets by NUIGCompsoc</a>
                        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                    </div>

                </div>

            </div>
    </section><!-- End Social Media Section -->

    <!-- End Contact Section -->
    <section id="external" class="services section-bg">
        <div class="container">

            <div class="section-title">
                <h2>CompSoc Policies</h2>
                <p>Insert some things here about privacy and server use.</p>
            </div>


    </section>


</main><!-- End #main -->

<!-- ======= Footer ======= -->
<?php include("includes/footer.php"); ?>
<!-- End  Footer -->

<a href="#" class="back-to-top"><i class="icofont-simple-up"></i></a>

<!-- Vendor JS Files -->
<script src="assets/vendor/jquery/jquery.min.js"></script>
<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="assets/vendor/jquery.easing/jquery.easing.min.js"></script>
<script src="assets/vendor/php-email-form/validate.js"></script>
<script src="assets/vendor/waypoints/jquery.waypoints.min.js"></script>
<script src="assets/vendor/counterup/counterup.min.js"></script>
<script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
<script src="assets/vendor/venobox/venobox.min.js"></script>
<script src="assets/vendor/owl.carousel/owl.carousel.min.js"></script>
<script src="assets/vendor/typed.js/typed.min.js"></script>
<script src="assets/vendor/aos/aos.js"></script>

<!-- Template Main JS File -->
<script src="assets/js/main.js"></script>

</body>

</html>