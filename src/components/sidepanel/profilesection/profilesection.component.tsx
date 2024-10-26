const ProfileSectionComponent = () => {
    return (
        <div className="profile">
            <div className="title">
                <img
                    src="/assets/img/apple-touch-icon.png"
                    alt=""
                    className="img-fluid"
                ></img>

                <a className="text-light" href="/">
                    <h1>CompSoc</h1>
                    <span>University of Galway</span>
                </a>
            </div>

            <div className="social-links mt-3 text-center">
                <a href="https://twitter.com/ugcompsoc" className="twitter">
                    <i className="bx bxl-twitter"></i>
                </a>
                <a
                    href="https://www.facebook.com/nuigcompsoc/"
                    className="facebook"
                >
                    <i className="bx bxl-facebook"></i>
                </a>
                <a
                    href="https://www.linkedin.com/company/nuig-compsoc?originalSubdomain=ie"
                    className="linkedin"
                >
                    <i className="bx bxl-linkedin"></i>
                </a>
                <a href="https://discord.compsoc.ie" className="discord">
                    <i className="bx bxl-discord"></i>
                </a>
                <a href="mailto:compsoc@socs.nuigalway.ie" className="linkedin">
                    <i className="bx bx-mail-send"></i>
                </a>
            </div>
        </div>
    )
}

export default ProfileSectionComponent
