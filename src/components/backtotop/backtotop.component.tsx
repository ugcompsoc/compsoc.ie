import { useLayoutEffect, useState } from "react";

const BackToTopComponent = () => {
  const [show, doShow] = useState(false);

  useLayoutEffect(() => {
    // 👇️ scroll to top on page load
    const onScroll = () => {
      const scrollPos = window.scrollY;
      if (scrollPos > 1) {
        doShow(true);
      } else {
        doShow(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={show ? "back-to-top" : "back-to-top fade-out"}
    >
      <i className="icofont-simple-up color"></i>
    </button>
  );
};

export default BackToTopComponent;
