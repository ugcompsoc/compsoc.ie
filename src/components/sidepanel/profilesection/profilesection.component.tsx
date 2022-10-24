const ProfileSectionComponent = () => {
    return (
        <div className="profile">
            <img src="/assets/img/apple-touch-icon.png" alt="" className="img-fluid"></img>
            <h1 className="text-light"><a href="/">CompSoc<br></br>NUI Galway</a></h1>
            <div className="social-links mt-3 text-center">
                <a href="https://twitter.com/NUIGCompsoc" className="twitter"><i className="bx bxl-twitter"></i></a>
                <a href="https://www.facebook.com/nuigcompsoc/" className="facebook"><i className="bx bxl-facebook"></i></a>
                <a href="https://www.linkedin.com/company/nuig-compsoc?originalSubdomain=ie" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                <a href="https://discord.compsoc.ie" className="discord"><i className="bx bxl-discord"></i></a>
                <a href="mailto:compsoc@socs.nuigalway.ie" className="linkedin"><i className="bx bx-mail-send"></i></a>
            </div>
        </div>
    );
}

export default ProfileSectionComponent;