const ServicesComponent = () =>{
    return ( 
        <>
        <section id="services" className="services section-bg">
            <div className="container">

                <div className="section-title">
                    <h2>CompSoc Account</h2>
                    <p>We offer all CompSoc members free access to an account on our servers. This gives you access to:</p>
                </div>

                <div className="row">
                    <div className="col-lg-4 col-md-6 icon-box aos-init aos-animate" data-aos="fade-up">
                        <div className="icon"><i className="icofont-database"></i></div>
                        <h4 className="title">Storage Space</h4>
                        <p className="description">All accounts come provisioned with 5GB server space by default.</p>
                    </div>
                    <div className="col-lg-4 col-md-6 icon-box aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                        <div className="icon"><i className="icofont-console"></i></div>
                        <h4 className="title">SSH Access</h4>
                        <p className="description">You will have SSH access to your account, with support for tunnelling if
                            needed.</p>
                    </div>
                    <div className="col-lg-4 col-md-6 icon-box aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
                        <div className="icon"><i className="icofont-envelope"></i></div>
                        <h4 className="title">Email</h4>
                        <p className="description">CompSoc members will receive their own @compsoc.ie email account.</p>
                    </div>


                </div>
                If you are a CompSoc member* and would like an account, you can simply go <a href="https://compsoc.ie/accounts">get an account </a> 
                or alternatively, can email us at <b>accounts@compsoc.ie</b> with the following information:<br></br><br></br>

                <li>Name</li>
                <li>University of Galway Email Address</li>
                <li>University of Galway Student ID</li>
                <li>Preferred username</li>
                <br></br>

                <p>*To become a CompSoc member, you can <a href="https://yourspace.nuigalway.ie/">login to YourSpace and
                    join</a> or include a membership request in your email.</p>

            </div>
        </section>
        </>
    );
}

export default ServicesComponent;
