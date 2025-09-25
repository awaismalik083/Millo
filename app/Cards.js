"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import "./Fonts.css";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaArrowRight } from "react-icons/fa";

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

const Cards = () => {
  const cardRefs = useRef([]);
  const containerRef = useRef(null);
  const paraRef = useRef(null);

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
    // Set initial state - all cards invisible
    gsap.set(cardRefs.current, { opacity: 0 });

    // Create scroll trigger for the container
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        // Animate cards with stagger when container enters viewport
        gsap.to(cardRefs.current, {
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        });
      },
      // Optional: if you want cards to fade out when scrolling back up
      onLeaveBack: () => {
        gsap.to(cardRefs.current, {
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.in",
        });
      },
      // markers: true // for debugging
    });

    // Clean up function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Your existing hover effect code remains the same
  useEffect(() => {
    cardRefs.current.forEach((card) => {
      const hoverBg = card.querySelector(".hover-bg");
      const mainImage = card.querySelector(".main-image");
      const hoverImage = card.querySelector(".hover-image");
      const imageContainer = card.querySelector(".image-container");

      // Set initial states
      gsap.set(hoverImage, { opacity: 0, scale: 1.1 });
      gsap.set(mainImage, { opacity: 1, scale: 1 });

      // Store animation instances for cleanup
      let moveAnimation;

      const handleMouseEnter = () => {
        // Create a timeline for coordinated animations
        const tl = gsap.timeline();

        // White background animation (your original effect)
        tl.to(hoverBg, {
          backgroundColor: "#ffffff",
          opacity: 0.5,
          top: "1.5%",
          height: "110%",
          width: "99%",
          duration: 0.1,
          ease: "power2.out",
        });

        // Image transition effects
        if (hoverImage) {
          tl.to(
            mainImage,
            {
              opacity: 0,
              scale: 0.95,
              duration: 0.5,
              ease: "power2.out",
            },
            0
          )
            .to(
              hoverImage,
              {
                opacity: 1,
                scale: 1,
                duration: 0.7,
                ease: "power2.out",
              },
              0
            )
            .to(
              imageContainer,
              {
                scale: 1.02,
                duration: 0.5,
                ease: "power2.out",
              },
              0
            );
        }
      };

      const handleMouseLeave = () => {
        // Create a timeline for coordinated animations
        const tl = gsap.timeline();

        // White background animation (your original effect)
        tl.to(hoverBg, {
          opacity: 0,
          width: "98%",
          duration: 0.2,
          ease: "power2.out",
        });

        // Image transition effects
        if (hoverImage) {
          tl.to(
            hoverImage,
            {
              opacity: 0,
              scale: 1.1,
              duration: 0.5,
              ease: "power2.out",
            },
            0
          )
            .to(
              mainImage,
              {
                opacity: 1,
                scale: 1,
                duration: 0.7,
                ease: "power2.out",
              },
              0
            )
            .to(
              imageContainer,
              {
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
              },
              0
            );
        }

        // Reset image position
        if (moveAnimation) {
          moveAnimation.kill();
        }
        gsap.to([mainImage, hoverImage], {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      const handleMouseMove = (e) => {
        if (!hoverImage) return;

        // Get mouse position relative to the card
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate percentage position (0 to 1)
        const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
        const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1

        // Calculate movement amount (adjust these values for more/less movement)
        const moveX = xPercent * 20; // ±10px movement
        const moveY = yPercent * 20; // ±10px movement

        // Animate the images to follow cursor
        if (moveAnimation) {
          moveAnimation.kill();
        }

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

      // Cleanup
      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
        card.removeEventListener("mousemove", handleMouseMove);
        if (moveAnimation) {
          moveAnimation.kill();
        }
      };
    });
  }, []);

  return (
    <section className="mt-20" ref={containerRef}>
      <div className=" mx-auto">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 overflow-x-hidden justify-items-center">
          {products.map((product, index) => (
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
                ref={(el) => (cardRefs.current[index] = el)}
                id="hero"
                className={`relative 
        w-[18rem] md:mx-5  md:w-[27rem] lg:w-[25rem] 
        h-[21rem] md:h-[25rem] 
        rounded-2xl overflow-hidden cursor-pointer 
        ${
          product.name === "Sandra" || product.name === "Zelda"
            ? "md:w-[37rem] overflow-x-hidden lg:w-[35rem] md:ml-[11rem] md:h-[25rem]"
            : ""
        }
        ${product.name === "Zelda" ? "md:ml-[45rem]" : ""}
      `}
              >
                <div className="hover-bg absolute inset-0 rounded-2xl transition-all duration-300 z-0" />

                <div id="hero" className="relative z-10 mr-1 h-full p-4">
                  <div
                    className={`image-container w-full h-56 md:h-72 relative rounded-2xl overflow-hidden`}
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
                      <h3 className="font-extrabold dm-san text-[20px] text-black">
                        {product.name}
                      </h3>
                      <p className="text-[12px] mb-5 text-gray-500">
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

        <div className="flex items-center mt-10 justify-center text-center">
          <Link href="/Display">
            <button className="w-[8rem] py-3 bg-[#d2cece] hover:text-white hover:bg-black text-sm font-semibold transition-colors duration-300 ease-out cursor-pointer  rounded-4xl">
              see them all
            </button>
          </Link>
        </div>
      </div>
      <div
        ref={paraRef}
        className="flex w-[19rem] md:w-full flex-col items-center justify-center mt-40"
      >
        <h3 className="text-3xl sm:text-5xl md:text-7xl tracking-tighter text-gray-900 mb-5 font-bold">
          Keep your eyes on us
        </h3>

        <p className="flex mb-10  items-center text-center text-sm sm:text-lg md:text-2xl text-gray-500 font-semibold">
          Sign up to have access to new drops in advance <br /> and get special
          discounts for the launch.
        </p>

        <div className="relative   ">
          <input
            className="bg-[#cfcfcf] w-[15rem] md:w-[20rem] rounded-full text-start placeholder:text-black text-sm sm:text-md font-semibold px-4  py-4 sm:py-5
         outline-none focus:outline-2 focus:outline-blue-500"
            placeholder="Your email"
          />
          <button className="absolute hover:cursor-pointer top-1/2 right-1 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 mr-1 sm:mr-2 bg-black text-white flex items-center justify-center rounded-full">
            <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 hover:translate-x-2 duration-200 ease-linear" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cards;
