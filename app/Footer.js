"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh(); // Ensures updated positions

      gsap.from(footerRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "top center",
          toggleActions: "restart none none none",
        },
        y: 300,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, footerRef);

    // Refresh after images/layout have rendered
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500); // adjust delay if needed

    return () => {
      ctx.revert();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <footer ref={footerRef} className="p-5 h-screen text-gray-900">
      <p className="text-[9rem] mb-10  md:text-[20rem] mt-42 relative font-semibold  tracking-tighter">
        Milo
      </p>
      <div className=" p-10   mt-[-6rem]  list-none">
        <div className=" absolute flex-col md:flex-row  flex gap-2 md:gap-5 text-md font-bold left-10">
          <li>Linkedin</li>
          <li>Instagram</li>
          <li>Twitter</li>
        </div>

        <div className="absolute text-md font-bold right-5 ml-[20rem] md:right-5 mt-15 md:mt-0">
          <li>awaismalik@gmail.com</li>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
