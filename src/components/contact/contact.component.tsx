import { useEffect } from "react";

const ContactComponent = () =>{
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        document.getElementsByClassName("twitter-embed")[0].appendChild(script);
    }, []);

    return ( 
        <>
        <section id="contact" className="contact">
            <div className="container">

                <div className="section-title">
                    <h2>Social Media</h2>
                    <p>You can get in touch with us by email, social media or by attending one of our events (everyone is
                        welcome!).</p>
                </div>

                <div className="row" data-aos="fade-in">

                    <div className="col-lg-5 d-flex align-items-stretch">
                        <div className="info">
                            <div className="address">
                                <i className="icofont-google-map"></i>
                                <h4>Location</h4>
                                <p>CompSoc, c/o Societies Office, Áras na Mac Léinn, University Of Galway, University Road, Galway,
                                    Ireland</p>
                            </div>

                            <div className="email">
                                <i className="icofont-envelope"></i>
                                <h4>Email</h4>
                                <p>compsoc@socs.nuigalway.ie</p>
                            </div>

                            <div className="email">
                                <i className="icofont-twitter"></i>
                                <h4>Tweet</h4>
                                <p><a href="https://twitter.com/UGCompsoc">@UGCompsoc</a></p>
                            </div>

                            <div className="email">
                                <i className="icofont-facebook"></i>
                                <h4>Facebook</h4>
                                <p><a href="https://www.facebook.com/nuigcompsoc/">/NUIGCompSoc</a></p>
                            </div>

                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1192.8049748746676!2d-9.060928941645427!3d53.27860804875015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485b96f199468d6b%3A0x38d894c0eee8ab25!2sNUI%20Galway%20Computer%20Society!5e0!3m2!1sen!2sie!4v1600623742256!5m2!1sen!2sie" style={{border: "0", width: "100%", height: "290px"}}></iframe>
                        </div>
                    </div>

                    <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                        <div className="info">
                            <div className="twitterContainer">
                                <i className="icofont-twitter"></i>
                                <h4>Tweets by UGCompsoc</h4>
                                <section className="twitter-embed" style={{ padding: "12px 0" }}>
                                    <a
                                        className="twitter-timeline"
                                        data-theme="light"
                                        data-tweet-limit="1"
                                        data-chrome="noheader nofooter noborders"
                                        href="https://twitter.com/UGCompSoc"
                                    ></a>
                                </section>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
        </>
    );
}

export default ContactComponent;
