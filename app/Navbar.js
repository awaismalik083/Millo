"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOverImage, setIsOverImage] = useState(false);
  const pathname = usePathname(); // 👈 Add this line

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const bgRef = useRef(null);
  const linksRef = useRef([]);

  // 👇 This now triggers on every route change
  useEffect(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      navRef.current,
      { y: -100 },
      { y: 0, duration: 1, ease: "power1" }
    );
  }, [pathname]);

  // Keep your ScrollTrigger effects, etc.
  useEffect(() => {
    const triggerElement = document.querySelector("#hero");
    if (!triggerElement || !navRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: triggerElement,
      start: "top top",
      end: "bottom top",
      toggleClass: { targets: navRef.current, className: "text-white" },
      onEnter: () => setIsOverImage(true),
      onLeave: () => setIsOverImage(false),
      onEnterBack: () => setIsOverImage(true),
      onLeaveBack: () => setIsOverImage(false),
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (!logoRef.current || !navRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(logoRef.current, {
        scale: 0.6,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: navRef.current,
          start: "top top%",
          end: "bottom+=100 top",
          scrub: true,
          toggleActions: "play reverse play reverse",
        },
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    const links = menuRef.current.querySelectorAll("li");
    linksRef.current = Array.from(links);

    if (isOpen) {
      menuRef.current.classList.remove("hidden");

      gsap.fromTo(
        bgRef.current,
        { y: "-100%" },
        { y: "0%", duration: 0.6, ease: "power3.out" }
      );

      gsap.fromTo(
        linksRef.current,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: "back.out(1.7)",
        }
      );
    } else {
      gsap.to(linksRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: "power1.in",
        onComplete: () => {
          gsap.to(bgRef.current, {
            y: "-100%",
            duration: 0.5,
            ease: "power3.in",
            onComplete: () => menuRef.current.classList.add("hidden"),
          });
        },
      });
    }
  }, [isOpen]);

  const textColorClass = isOverImage ? "text-white" : "text-black";

  return (
    <nav
      ref={navRef}
      className={` fixed top-6 lg:px-10 mb-20 w-full left-6 md:left-0   z-50 bg-transparent transition-colors duration-300 ease-in-out ${textColorClass}`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" passHref>
          <h2
            ref={logoRef}
            className={`text-6xl hover:opacity-70 font-bold origin-left cursor-pointer ${textColorClass}`}
          >
            Milo
          </h2>
        </Link>

        {/* Desktop Menu */}
        <ul
          className={`hidden lg:flex gap-8 font-bold text-lg ${textColorClass}`}
        >
          <li className="hover:opacity-70 transition-colors cursor-pointer">
            <Link href="/Display">Our Pieces</Link>
          </li>

          <li className="hover:opacity-70 transition-colors cursor-pointer">
            <Link href="/contact">Get in Touch</Link>
          </li>
        </ul>

        {/* Mobile Toggle Button */}
        <div className="lg:hidden mr-[4rem] md:mr-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm font-bold"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div ref={menuRef} className="lg:hidden fixed inset-0 z-40 hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 h-[21rem] bg-gray-100 rounded-b-3xl"
        ></div>

        <div className="relative p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl sm:text-6xl font-extrabold text-black">
              Milo
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold text-black"
            >
              Close
            </button>
          </div>

          <ul className="flex flex-col gap-6 mt-20 text-4xl font-bold text-black">
            <li>
              <Link href="/Display" onClick={() => setIsOpen(false)}>
                Our Pieces
              </Link>
            </li>

            <li>
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
