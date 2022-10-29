import Typed from "typed.js";
import React from "react";

const HeroComponent = () => {
    // Create reference to store the DOM element containing the animation
	const el = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    React.useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["Computer", "Developer", "Technology"], // Strings to display
            // Speed settings, try diffrent values untill you get good results
            startDelay: 300,
            typeSpeed: 120,
            backSpeed: 50,
            backDelay: 1000
        })

        // Destroying
        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <section style={{height: "100vh"}} id="hero" className="d-flex flex-column justify-content-center align-items-center">
            <div className="hero-container" data-aos="fade-in">
                <h1>University Of Galway's</h1>
                <p><span style={{ whiteSpace: 'pre' }} ref={el} /> Society</p>
            </div>
        </section>
    );
}

export default HeroComponent;