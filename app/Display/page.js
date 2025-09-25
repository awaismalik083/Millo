"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Navbar from "../Navbar";
import "@/app/Fonts.css";
import Footer from "../Footer";
import { hover } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    img: "/assets/img4.jpg",
    hoverimg: "/assets/hover1.jpg",
    name: "Grind",
    category: "CHAIR",
    price: "$400",
  },
  {
    img: "/assets/img5.jpg",
    hoverimg: "/assets/hover2.jpg",
    name: "Areo",
    category: "ARMCHAIR",
    price: "$330",
  },
  {
    img: "/assets/img6.jpg",
    hoverimg: "/assets/hover3.jpg",
    name: "Andy",
    category: "CHAIR",
    price: "$160",
  },
  {
    img: "/assets/img7.jpg",
    hoverimg: "/assets/hover4.jpg",
    name: "Sandra",
    category: "CHAIR",
    price: "$400",
  },
  {
    img: "/assets/img8.jpg",
    hoverimg: "/assets/hover5.jpg",
    name: "Zelda",
    category: "ArmChair",
    price: "$330",
  },
];

const imageCard = [
  {
    img: "/assets/img10.jpg",
    hoverimg: "/assets/hover7.jpg",
    name: "Rita",
    category: "ArmChair",
    price: "$249",
  },
  {
    img: "/assets/img11.jpg",
    hoverimg: "/assets/hover8.jpg",
    name: "Buldge",
    category: "ArmChair",
    price: "$249",
  },
  {
    img: "/assets/img12.jpg",
    hoverimg: "/assets/hover9.jpg",
    name: "Lance",
    category: "Vintage Sofa",
    price: "$920",
  },
];

const Page = () => {
  const cardRefs = useRef([]);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  // Text animation
  useEffect(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current,
      { y: 300, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top bottom", // animation starts when the text enters bottom of viewport
          end: "top center", // end when it's closer to center
          scrub: false,
        },
      }
    );
  }, []);

  // Cards fade-in animation
  useEffect(() => {
    gsap.set(cardRefs.current, { opacity: 0 });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        gsap.to(cardRefs.current, {
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(cardRefs.current, {
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.in",
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Card hover animations
  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (!card) return;

      const hoverBg = card.querySelector(".hover-bg");
      const mainImage = card.querySelector(".main-image");
      const hoverImage = card.querySelector(".hover-image");
      const imageContainer = card.querySelector(".image-container");

      gsap.set(hoverImage, { opacity: 0, scale: 1.1 });
      gsap.set(mainImage, { opacity: 1, scale: 1 });

      let moveAnimation;

      const handleMouseEnter = () => {
        const tl = gsap.timeline();
        tl.to(hoverBg, {
          backgroundColor: "#ffffff",
          opacity: 0.5,
          top: "1.5%",
          height: "110%",
          width: "99%",
          duration: 0.1,
          ease: "power2.out",
        });

        if (hoverImage) {
          tl.to(
            mainImage,
            { opacity: 0, scale: 0.95, duration: 0.5, ease: "power2.out" },
            0
          )
            .to(
              hoverImage,
              { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" },
              0
            )
            .to(
              imageContainer,
              { scale: 1.02, duration: 0.5, ease: "power2.out" },
              0
            );
        }
      };

      const handleMouseLeave = () => {
        const tl = gsap.timeline();
        tl.to(hoverBg, {
          opacity: 0,
          width: "98%",
          duration: 0.2,
          ease: "power2.out",
        });

        if (hoverImage) {
          tl.to(
            hoverImage,
            { opacity: 0, scale: 1.1, duration: 0.5, ease: "power2.out" },
            0
          )
            .to(
              mainImage,
              { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" },
              0
            )
            .to(
              imageContainer,
              { scale: 1, duration: 0.5, ease: "power2.out" },
              0
            );
        }

        if (moveAnimation) moveAnimation.kill();
        gsap.to([mainImage, hoverImage], {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      const handleMouseMove = (e) => {
        if (!hoverImage) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = (x / rect.width - 0.5) * 2;
        const yPercent = (y / rect.height - 0.5) * 2;
        const moveX = xPercent * 20;
        const moveY = yPercent * 20;

        if (moveAnimation) moveAnimation.kill();
        moveAnimation = gsap.to([mainImage, hoverImage], {
          x: moveX,
          y: moveY,
          duration: 0.8,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
      card.addEventListener("mousemove", handleMouseMove);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
        card.removeEventListener("mousemove", handleMouseMove);
        if (moveAnimation) moveAnimation.kill();
      };
    });
  }, []);

  return (
    <>
      <section className="mb-20 px-4 sm:px-8 lg:px-0" ref={containerRef}>
        <Navbar />
        <h1 className="text-4xl md:text-6xl dm-san font-bold mt-[10rem] lg:ml-16 ">
          Our pieces
        </h1>

        <div className="max-w-7xl mx-auto text-center">
          {/* Products Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 place-items-center mt-[2rem]">
            {products.map((product, index) => (
              <Link
                href={{
                  pathname: "/buy",
                  query: {
                    name: product.name,
                    price: product.price,
                    category: product.category,
                    img: product.img,
                    hoverImg: product.hoverimg,
                  },
                }}
                key={index}
              >
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    product.name === "Sandra" || product.name === "Zelda"
                      ? "w-[20rem] md:w-[40rem] lg:w-[37rem] md:ml-[12rem]  h-[28rem]"
                      : "w-[20rem] md:w-[30rem] lg:w-[24rem] h-[21rem]"
                  } ${product.name === "Zelda" ? "md:ml-[42rem]" : ""}`}
                >
                  <div className="hover-bg absolute inset-0 rounded-2xl transition-all duration-300 z-0" />
                  <div className="relative z-10 mr-1 h-full p-4">
                    <div
                      className={`image-container w-full h-[220px] relative rounded-2xl overflow-hidden ${
                        product.name === "Sandra" || product.name === "Zelda"
                          ? "h-[348px]"
                          : ""
                      }`}
                    >
                      <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        className="main-image object-cover rounded-2xl"
                      />
                      {product.hoverimg && (
                        <Image
                          src={product.hoverimg}
                          alt={product.name}
                          fill
                          className="hover-image object-cover rounded-2xl absolute inset-0"
                        />
                      )}
                    </div>
                    <div className="mt-5 flex justify-between items-start bg-transparent">
                      <div>
                        <h3 className="font-bold dm-san text-[20px] text-black">
                          {product.name}
                        </h3>
                        <p className="text-[12px] mb-2 text-gray-500">
                          {product.category}
                        </p>
                      </div>
                      <p className="text-gray-500 dm-san text-xl font-semibold">
                        {product.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* ImageCard Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 place-items-center mt-12">
            {imageCard.map((product, index) => (
              <Link
                key={index}
                href={{
                  pathname: "/buy",
                  query: {
                    name: product.name,
                    price: product.price,
                    category: product.category,
                    img: product.img,
                    hoverImg: product.hoverimg,
                  },
                }}
              >
                <div
                  ref={(el) => (cardRefs.current[products.length + index] = el)}
                  className={`relative w-[20rem] md:w-[27rem] lg:w-[24rem] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
              `}
                >
                  <div className="hover-bg absolute inset-0 rounded-2xl transition-all duration-300 z-0" />
                  <div className="relative z-10 mr-1 h-full p-4">
                    <div
                      className={`image-container w-full h-[220px] relative rounded-2xl overflow-hidden ${
                        product.name === "Sandra" || product.name === "Zelda"
                          ? "h-[348px]"
                          : ""
                      }`}
                    >
                      <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        className="main-image object-cover rounded-2xl"
                      />
                      {product.hoverimg && (
                        <Image
                          src={product.hoverimg}
                          alt={product.name}
                          fill
                          className="hover-image object-cover rounded-2xl absolute inset-0"
                        />
                      )}
                    </div>
                    <div className="mt-5 flex justify-between items-start bg-transparent">
                      <div>
                        <h3 className="font-bold dm-san text-[20px] text-black">
                          {product.name}
                        </h3>
                        <p className="text-[12px] mb-2 text-gray-500">
                          {product.category}
                        </p>
                      </div>
                      <p className="text-gray-500 dm-san text-xl font-semibold">
                        {product.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div
            ref={textRef}
            className="text-4xl md:text-6xl dm-san mt-40  text-right font-bold md:mr-10 mb-12"
          >
            ..and more yet to come
          </div>
        </div>
        {/* Text Section */}
      </section>
      <Footer />
    </>
  );
};

export default Page;
