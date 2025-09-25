"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Image_card = [
  {
    img: "/assets/img1.jpg",
    title: "A comfy icon",
    description: "Discover Buldge",
  },
  {
    img: "/assets/img2.jpg",
    title: "A Classy Seat",
    description: "Discover Rogue",
  },
  {
    img: "/assets/img3.jpg",
    title: "An elegant crib",
    description: "Discover Andy",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const paraRef = useRef(null);

  const changeSlide = (newIndex) => {
    const tl = gsap.timeline();
    tl.to([headingRef.current, descriptionRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power1.out",
      onComplete: () => {
        setCurrentIndex(newIndex);
      },
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        paraRef.current,
        {
          opacity: 0,
          y: 100,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: paraRef.current,
            start: "top 85%",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      [headingRef.current, descriptionRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power1.out" }
    );
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide((currentIndex + 1) % Image_card.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="w-full px-6 mt-30     sm:px-6 md:px-8  md:mt-20 lg:w-full lg:mt-30 ">
      {/* HERO IMAGE SECTION */}
      <div className="w-full h-[15rem] sm:h-[30rem] md:h-[40rem] rounded-3xl relative overflow-hidden">
        {/* Image Transition */}
        <div className="relative w-full h-full">
          {Image_card.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                id="hero"
                src={item.img}
                alt={item.title}
                fill
                className="object-cover heroImage rounded-3xl"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Overlay Text and Navigation */}
        <div className="absolute inset-0 z-20 flex items-end justify-center pl-10 sm:pl-20 md:pl-40 pr-4 sm:pr-10 md:pr-20">
          {/* Text Block */}
          <div className="flex-col absolute right-4 sm:right-10 md:right-20 top-32 sm:top-40 md:top-60">
            <div className="text-right text-white max-w-md">
              <h3
                ref={headingRef}
                className="text-2xl sm:text-3xl md:text-6xl font-extrabold mb-2 sm:mb-4 leading-snug"
              >
                {Image_card[currentIndex].title}
              </h3>
              <p
                ref={descriptionRef}
                className="text-sm sm:text-base md:text-md font-bold mr-2 sm:mr-6 md:mr-10 hover:underline tracking-wide"
              >
                {Image_card[currentIndex].description}
              </p>
            </div>
          </div>

          {/* Dot Navigation */}
          <div className="absolute flex flex-col gap-1 right-2 sm:right-6 md:right-10 top-28 sm:top-40 md:top-60">
            {Image_card.map((_, index) => (
              <button
                key={index}
                onClick={() => changeSlide(index)}
                className="focus:outline-none"
              >
                <GoDotFill
                  className={`text-xl sm:text-2xl transition-all duration-300 ${
                    index === currentIndex
                      ? "text-white scale-110"
                      : "text-white/50 hover:text-white/80"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PARAGRAPH SECTION */}
      <div className="min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center mx-auto mt-20">
        <div ref={paraRef} className="max-w-4xl text-left px-2">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-black">
            Milo is a danish small independent design studio crafting furniture
            and timeless interior pieces with the uttermost love and attention
            to details since 1996.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
