import { useEffect, useState, useImperativeHandle, forwardRef, Ref } from "react";

export interface PropsType {}

export interface RefType {
    toggleMobileNavBar: () => void;
}

const NavigationMenuComponent = (props: PropsType, ref: Ref<RefType>) => {
    const [isMobileNavIconAHamburger, setMobileNavIconAHamburger] = useState(true);
    const [isMobileNavShowing, setMobileNavShowing] = useState(
        !window.matchMedia("(min-width: 1200px)").matches
    )
    
    // We're watching here for the width of the screen to fall below 1200. When that happens we can say that the mobile nav is showing.
    useEffect(() => {
        window
        .matchMedia("(min-width: 1200px)")
        .addEventListener('change', e => setMobileNavShowing( !e.matches ));
    }, []);

    // Could put this method in the parent but since the icon needs to have access to isNavIconActive there is always going to be some
    // amount of jiggery between the two components. We could simply put the isNavIconActive in context, but this works, so, eh.
    const toggleMobileNavBar = () => {
        if (isMobileNavShowing) {
            document.body.classList.toggle("mobile-nav-active");
            setMobileNavIconAHamburger(!isMobileNavIconAHamburger)
        }
    }

    useImperativeHandle(ref, () => ({ toggleMobileNavBar }));

    const executeScroll = (event: React.MouseEvent<HTMLElement, MouseEvent>, section: string) => {
        if (window.location.pathname == "/") {
            event.preventDefault();
        }
        
        const sectionRef = document.querySelector(section);
        sectionRef?.scrollIntoView({ behavior: 'smooth' });
        
        const activeLink = document.querySelector("li.active");
        activeLink?.classList.remove("active");
        event.currentTarget.parentElement?.classList.add("active");
    }

    return (
        <div>
            <button type="button" className="mobile-nav-toggle d-xl-none">
                <i className={isMobileNavIconAHamburger ? "icofont-navigation-menu" : "icofont-close"} style={{ color: "#149ddd" }}></i>
            </button>
            <nav className="nav-menu">
                <ul>
                    <li className="active"><a href="/"><i className="bx bx-home"></i> <span>Home</span></a></li>
                    <li><a onClick={(e) => executeScroll(e, '#about')} href="/#about"><i className="bx bx-user"></i> <span>About us</span></a></li>
                    <li><a onClick={(e) => executeScroll(e, '#services')} href="/#services"><i className="bx bx-server"></i> CompSoc Account</a></li>
                    <li><a onClick={(e) => executeScroll(e, '#contact')} href="/#contact"><i className="bx bx-share-alt"></i> Social Media</a></li>
                    <li><a href="/committee"><i className="bx bx-group"></i>Our Committee</a></li>
                    <li><a href="/ctf"><i className="bx bx-flag"></i>CTF 2025</a></li>
                    <li><a href="https://webmail.compsoc.ie/" target="_blank"><i className="bx bx-envelope"></i> Webmail  &nbsp;<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M13 3l3.293 3.293l-7 7l1.414 1.414l7-7L21 11V3z" fill="#626262"/><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z" fill="#626262"/><rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" /></svg></a></li>
                    <li><a href="https://wiki.compsoc.ie/" target="_blank"><i className="bx bxl-wikipedia"></i> Wiki  &nbsp;<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M13 3l3.293 3.293l-7 7l1.414 1.414l7-7L21 11V3z" fill="#626262"/><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z" fill="#626262"/><rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" /></svg></a></li>
                    <li><a href="https://compsoc.ie/accounts" target="_blank"><i className="bx bx-log-in"></i> Account Self Service  &nbsp;<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M13 3l3.293 3.293l-7 7l1.414 1.414l7-7L21 11V3z" fill="#626262"/><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z" fill="#626262"/><rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" /></svg></a></li>
                </ul>
            </nav>
        </div>
    );
}

export default forwardRef(NavigationMenuComponent);
