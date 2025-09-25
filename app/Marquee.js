import React from "react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

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

gsap.registerPlugin(ScrollTrigger);
const Marquee = () => {
  const cardRefs = useRef([]);
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

  const router = useRouter();

  const handleCardClick = (product) => {
    const query = new URLSearchParams({
      name: product.name,
      price: product.price,
      category: product.category,
      img: product.img,
      hoverImg: product.hoverimg,
    }).toString();

    router.push(`/buy?${query}`);
  };

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

  // Hover effects (unchanged from your code)
  useEffect(() => {
    cardRefs.current.forEach((card) => {
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

  // ✅ Infinite marquee loop
  // ✅ Infinite marquee with hover speed control
  useEffect(() => {
    const marquee = marqueeRef.current;
    const totalWidth = marquee.scrollWidth / 2; // half, because of duplication
    const tweenRef = { tween: null };

    let ctx = gsap.context(() => {
      tweenRef.tween = gsap.to(marquee, {
        x: -totalWidth,
        duration: 25,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % -totalWidth),
        },
      });
    }, marqueeRef);

    // 🟢 Hover listeners for all cards
    cardRefs.current.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        tweenRef.tween.timeScale(0.5); // slow down
      });
      card.addEventListener("mouseleave", () => {
        tweenRef.tween.timeScale(1); // back to normal
      });
    });

    return () => {
      ctx.revert();
      tweenRef.tween?.kill();
    };
  }, []);

  return (
    <div className="overflow-hidden w-full mt-[4rem] md:mt-[24rem] lg:mt-[30rem] px-10">
      <div ref={marqueeRef} className="flex w-max gap-10">
        {[...products, ...products].map((product, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            onClick={() => handleCardClick(product)}
            className="relative 
                 sm:w-[27rem] w-[8%] md:w-[13%] 
                h-[21rem] md:h-[25rem] 
                rounded-2xl overflow-hidden cursor-pointer 
                flex-shrink-0"
          >
            <div className="hover-bg absolute inset-0 rounded-2xl transition-all duration-300 z-0" />
            <div className="relative z-10 mr-1 h-full p-4">
              <div className="image-container w-full h-56 md:h-72 relative rounded-2xl overflow-hidden">
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
                  <h3 className="font-extrabold text-[20px] text-black">
                    {product.name}
                  </h3>
                  <p className="text-[12px] mb-5 text-gray-500">
                    {product.category}
                  </p>
                </div>
                <p className="text-gray-500 text-xl font-semibold">
                  {product.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
