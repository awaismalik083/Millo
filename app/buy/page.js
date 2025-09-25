// "use client";
// import React, { useRef, useEffect, useState } from "react";
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import { FaPlus, FaMinus } from "react-icons/fa";
// import Image from "next/image";
// import gsap, { Linear } from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import { useSearchParams } from "next/navigation";
// import Marquee from "../Marquee";

// gsap.registerPlugin(ScrollTrigger);

// const Page = () => {
//   const searchParams = useSearchParams();

//   const [openSection, setOpenSection] = useState(null);
//   const leftRef = useRef(null);
//   const cardRefs = useRef([]);
//   const containerRef = useRef(null);
//   const marqueeRef = useRef(null);

//   const toggleSection = (section) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   // Pinning Left Section
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       ScrollTrigger.create({
//         trigger: containerRef.current,
//         start: "top+=100 top",
//         end: () =>
//           `+=${containerRef.current.scrollHeight - window.innerHeight}`,
//         pin: leftRef.current,
//         pinSpacing: false,
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   // useEffect(() => {
//   //   gsap.set(cardRefs.current, { opacity: 0 });

//   //   ScrollTrigger.create({
//   //     trigger: containerRef.current,
//   //     start: "top 80%",
//   //     end: "bottom 20%",
//   //     onEnter: () => {
//   //       gsap.to(cardRefs.current, {
//   //         opacity: 1,
//   //         duration: 0.8,
//   //         stagger: 0.15,
//   //         ease: "power2.out",
//   //       });
//   //     },
//   //     onLeaveBack: () => {
//   //       gsap.to(cardRefs.current, {
//   //         opacity: 0,
//   //         duration: 0.5,
//   //         stagger: 0.1,
//   //         ease: "power2.in",
//   //       });
//   //     },
//   //   });

//   //   return () => {
//   //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//   //   };
//   // }, []);

//   // useEffect(() => {
//   //   cardRefs.current.forEach((card) => {
//   //     const hoverBg = card.querySelector(".hover-bg");
//   //     const mainImage = card.querySelector(".main-image");
//   //     const hoverImage = card.querySelector(".hover-image");
//   //     const imageContainer = card.querySelector(".image-container");

//   //     gsap.set(hoverImage, { opacity: 0, scale: 1.1 });
//   //     gsap.set(mainImage, { opacity: 1, scale: 1 });

//   //     let moveAnimation;

//   //     const handleMouseEnter = () => {
//   //       const tl = gsap.timeline();
//   //       tl.to(hoverBg, {
//   //         backgroundColor: "#ffffff",
//   //         opacity: 0.5,
//   //         top: "1.5%",
//   //         height: "110%",
//   //         width: "99%",
//   //         duration: 0.1,
//   //         ease: "power2.out",
//   //       });
//   //       if (hoverImage) {
//   //         tl.to(
//   //           mainImage,
//   //           {
//   //             opacity: 0,
//   //             scale: 0.95,
//   //             duration: 0.5,
//   //             ease: "power2.out",
//   //           },
//   //           0
//   //         )
//   //           .to(
//   //             hoverImage,
//   //             {
//   //               opacity: 1,
//   //               scale: 1,
//   //               duration: 0.7,
//   //               ease: "power2.out",
//   //             },
//   //             0
//   //           )
//   //           .to(
//   //             imageContainer,
//   //             {
//   //               scale: 1.02,
//   //               duration: 0.5,
//   //               ease: "power2.out",
//   //             },
//   //             0
//   //           );
//   //       }
//   //     };

//   //     const handleMouseLeave = () => {
//   //       const tl = gsap.timeline();
//   //       tl.to(hoverBg, {
//   //         opacity: 0,
//   //         width: "98%",
//   //         duration: 0.2,
//   //         ease: "power2.out",
//   //       });
//   //       if (hoverImage) {
//   //         tl.to(
//   //           hoverImage,
//   //           {
//   //             opacity: 0,
//   //             scale: 1.1,
//   //             duration: 0.5,
//   //             ease: "power2.out",
//   //           },
//   //           0
//   //         )
//   //           .to(
//   //             mainImage,
//   //             {
//   //               opacity: 1,
//   //               scale: 1,
//   //               duration: 0.7,
//   //               ease: "power2.out",
//   //             },
//   //             0
//   //           )
//   //           .to(
//   //             imageContainer,
//   //             {
//   //               scale: 1,
//   //               duration: 0.5,
//   //               ease: "power2.out",
//   //             },
//   //             0
//   //           );
//   //       }
//   //       if (moveAnimation) {
//   //         moveAnimation.kill();
//   //       }
//   //       gsap.to([mainImage, hoverImage], {
//   //         x: 0,
//   //         y: 0,
//   //         duration: 0.5,
//   //         ease: "power2.out",
//   //       });
//   //     };

//   //     const handleMouseMove = (e) => {
//   //       if (!hoverImage) return;
//   //       const rect = card.getBoundingClientRect();
//   //       const x = e.clientX - rect.left;
//   //       const y = e.clientY - rect.top;
//   //       const xPercent = (x / rect.width - 0.5) * 2;
//   //       const yPercent = (y / rect.height - 0.5) * 2;
//   //       const moveX = xPercent * 20;
//   //       const moveY = yPercent * 20;
//   //       if (moveAnimation) moveAnimation.kill();
//   //       moveAnimation = gsap.to([mainImage, hoverImage], {
//   //         x: moveX,
//   //         y: moveY,
//   //         duration: 0.8,
//   //         ease: "power2.out",
//   //       });
//   //     };

//   //     card.addEventListener("mouseenter", handleMouseEnter);
//   //     card.addEventListener("mouseleave", handleMouseLeave);
//   //     card.addEventListener("mousemove", handleMouseMove);

//   //     return () => {
//   //       card.removeEventListener("mouseenter", handleMouseEnter);
//   //       card.removeEventListener("mouseleave", handleMouseLeave);
//   //       card.removeEventListener("mousemove", handleMouseMove);
//   //       if (moveAnimation) moveAnimation.kill();
//   //     };
//   //   });
//   // }, []);

//   // useEffect(() => {
//   //   const marquee = marqueeRef.current;
//   //   const totalWidth = marquee.scrollWidth / 2; // half, because of duplication
//   //   const tweenRef = { tween: null };

//   //   let ctx = gsap.context(() => {
//   //     tweenRef.tween = gsap.to(marquee, {
//   //       x: -totalWidth,
//   //       duration: 25,
//   //       ease: "linear",
//   //       repeat: -1,
//   //       modifiers: {
//   //         x: gsap.utils.unitize((x) => parseFloat(x) % -totalWidth),
//   //       },
//   //     });
//   //   }, marqueeRef);

//   //   // 🟢 Hover listeners for all cards
//   //   cardRefs.current.forEach((card) => {
//   //     card.addEventListener("mouseenter", () => {
//   //       tweenRef.tween.timeScale(0.5); // slow down
//   //     });
//   //     card.addEventListener("mouseleave", () => {
//   //       tweenRef.tween.timeScale(1); // back to normal
//   //     });
//   //   });

//   //   return () => {
//   //     ctx.revert();
//   //     tweenRef.tween?.kill();
//   //   };
//   // }, []);

//   const name = searchParams.get("name");
//   const price = searchParams.get("price");
//   const category = searchParams.get("category");
//   const img = searchParams.get("img");
//   const hoverimg = searchParams.get("hoverImg");
//   console.log("this is our data", name, price, category, img, hoverimg);

//   return (
//     <>
//       <Navbar />

//       {/* Main pinned/scrollable section */}
//       <section
//         ref={containerRef}
//         className="flex px-10 justify-between gap-15 h-[300vh] md:h-[300vh]"
//       >
//         {/* Left - pinned */}
//         <div
//           ref={leftRef}
//           className="w-[30%] hidden h-fit md:flex mt-50 flex-col justify-center space-y-6"
//         >
//           <h1 className="text-8xl hidden md:flex justify-center font-bold tracking-tight">
//             {name}
//           </h1>
//           <button className="bg-black text-white py-3 w-full text-sm rounded-full tracking-wider">
//             Order – {price}
//           </button>

//           {/* Accordion */}
//           <div className="flex flex-col mt-10 w-full space-y-5">
//             {["info", "materials", "details"].map((key) => (
//               <div key={key} className="w-full">
//                 <div
//                   className={`transition-all duration-300 ${
//                     openSection === key ? "" : "border-b border-gray-400"
//                   }`}
//                   onClick={() => toggleSection(key)}
//                 >
//                   <div className="flex justify-between items-center py-7 cursor-pointer">
//                     <p className="font-semibold text-sm hover:translate-x-2 transition-transform duration-200">
//                       {key.charAt(0).toUpperCase() + key.slice(1)}
//                     </p>
//                     {openSection === key ? (
//                       <FaMinus className="w-3 h-3" />
//                     ) : (
//                       <FaPlus className="w-3 h-3" />
//                     )}
//                   </div>

//                   <div
//                     className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                       openSection === key
//                         ? "max-h-40 opacity-100 mb-4"
//                         : "max-h-0 opacity-0"
//                     }`}
//                   >
//                     <p className="text-sm text-gray-500">
//                       {key === "info" &&
//                         "Crafted with intention, this piece merges bold design with everyday function."}
//                       {key === "materials" &&
//                         "Made from sustainably sourced oak and finished with non-toxic oil."}
//                       {key === "details" &&
//                         "Dimensions: 24” W x 18” H. Weight: 10 lbs. Wipe clean with a dry cloth."}
//                     </p>
//                   </div>
//                   {openSection === key && (
//                     <div className="border-b border-gray-400" />
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//           <h1 className="mt-40 hidden md:flex font-bold text-4xl">
//             Looking for More ?
//           </h1>
//         </div>

//         {/* Right - big images */}
//         <div className="w-[20rem]  md:w-[60%] flex flex-col md:mt-33 mt-45 gap-8">
//           <h1 className="text-5xl font-extrabold md:hidden tracking-tight">
//             Grind
//           </h1>
//           {[img, hoverimg, img].map((src, index) => (
//             <div
//               id="hero"
//               key={index}
//               className="h-screen relative rounded-4xl overflow-hidden shadow-xl"
//             >
//               <Image
//                 src={src} // use directly
//                 alt={`Image ${index + 1}`}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           ))}

//           <button className="bg-black md:hidden text-white py-3 w-full text-sm rounded-full tracking-wider">
//             Order – {price}
//           </button>
//           <div className=" flex md:hidden flex-col mt-10 w-full space-y-5">
//             {["info", "materials", "details"].map((key) => (
//               <div key={key} className="w-full">
//                 <div
//                   className={`transition-all duration-300 ${
//                     openSection === key ? "" : "border-b border-gray-400"
//                   }`}
//                   onClick={() => toggleSection(key)}
//                 >
//                   <div className="flex justify-between items-center py-7 cursor-pointer">
//                     <p className="font-semibold text-sm hover:translate-x-2 transition-transform duration-200">
//                       {key.charAt(0).toUpperCase() + key.slice(1)}
//                     </p>
//                     {openSection === key ? (
//                       <FaMinus className="w-3 h-3" />
//                     ) : (
//                       <FaPlus className="w-3 h-3" />
//                     )}
//                   </div>

//                   <div
//                     className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                       openSection === key
//                         ? "max-h-40 opacity-100 mb-4"
//                         : "max-h-0 opacity-0"
//                     }`}
//                   >
//                     <p className="text-sm text-gray-500">
//                       {key === "info" &&
//                         "Crafted with intention, this piece merges bold design with everyday function."}
//                       {key === "materials" &&
//                         "Made from sustainably sourced oak and finished with non-toxic oil."}
//                       {key === "details" &&
//                         "Dimensions: 24” W x 18” H. Weight: 10 lbs. Wipe clean with a dry cloth."}
//                     </p>
//                   </div>
//                   {openSection === key && (
//                     <div className="border-b border-gray-400" />
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//           <h1 className="mt-20 md:hidden font-bold text-2xl">
//             Looking for More ?
//           </h1>
//         </div>
//       </section>

//       <Marquee />

//       <Footer />
//     </>
//   );
// };

// export default Page;
// app/buy/page.tsx
import { Suspense } from "react";
import BuyContent from "./BuyContext.js";

export default function BuyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BuyContent/>
    </Suspense>
  );
}
