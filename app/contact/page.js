// app/page.jsx
import React from "react";
import Navbar from "../Navbar";
import Image from "next/image";
import Footer from "../Footer";

const Page = () => {
  return (
    <section className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24 mt-20 sm:mt-28 lg:mt-40 gap-10 lg:gap-16">
        {/* Text Section */}
        <div className="w-full lg:max-w-2xl text-center lg:text-left">
          <h3 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-black leading-snug sm:leading-tight lg:leading-[1.2]">
            Visit us in store <br /> or drop us a line
          </h3>

          <div className="flex flex-row text-sm md:text-2xl sm:flex-row gap-8 sm:gap-16 mt-8 sm:mt-10 justify-center lg:justify-start">
            <div className="font-semibold text-gray-700 space-y-2">
              <p>Cophagen</p>
              <p>Flaesketrovat, 10</p>
              <p>+39(0)4 25 26 92 00</p>
            </div>

            <ul className="font-semibold text-gray-600 space-y-2">
              <li className="hover:cursor-pointer hover:text-gray-800">
                hello@milo.com
              </li>
              <li className="hover:cursor-pointer hover:text-gray-800">
                Instagram
              </li>
              <li className="hover:cursor-pointer hover:text-gray-800">
                LinkedIn
              </li>
            </ul>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/assets/image.jpg"
            width={900}
            height={900}
            alt="Store Interior"
            className="w-full h-auto object-cover"
            id="hero"
          />
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default Page;
