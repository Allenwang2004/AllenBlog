"use client"

import { TypeAnimation } from "react-type-animation"
import ScrollIndicator from "./Scroll-indicator"

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16 overflow-hidden">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full flex-1 max-w-6xl">
        {/* 左邊文字區塊 */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <p className="text-2xl font-medium text-gray-600 dark:text-gray-400">HI, I AM</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            <span className="text-blue-600 dark:text-blue-400">ALLEN</span>{" "}
            <span className="text-gray-900 dark:text-white">WANG</span>
          </h1>

          <h2 className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-semibold">
            <TypeAnimation
              sequence={["Software Engineer", 2000, "AI Engineer", 2000, "Robot Engineer", 2000]}
              speed={50}
              repeat={Number.POSITIVE_INFINITY}
            />
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
            I architect end-to-end AI systems, high-throughput automation pipelines, and scalable web/service applications. Deeply passionate about refining code craft and building with emerging technologies. Currently in the robotics sector, specializing in the deployment and optimization of Vision-Language-Action (VLA) models.
          </p>

          {/* <div className="pt-4">
            <a
              href="#contact"
              className="inline-block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Contact Me
            </a>
          </div> */}
        </div>

        {/* 右邊圖片區塊 */}
        <div className="flex-1 mb-12 md:mb-0 flex justify-center">
          <div className="relative">
            <div className="animate-pulse-slow absolute -inset-1 rounded-full opacity-20 blur-xl"></div>
            <img
              src="/photo.jpg"
              alt="Avatar"
              className="relative z-10 w-64 h-64 lg:w-72 lg:h-72 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* <ScrollIndicator /> */}
    </section>
  )
}
