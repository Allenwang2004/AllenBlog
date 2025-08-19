// components/HeroSection.tsx
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-6 py-24">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 text-center md:text-left space-y-8"
      >
        <p className="text-2xl font-medium text-gray-600 dark:text-gray-400">
          HI, I AM ALLEN WANG
        </p>
        <h1 className="text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-gray-100">
          <Typewriter
            words={['Developer', 'Quant']}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={120}
            deleteSpeed={80}
            delaySpeed={1500}
          />
        </h1>
        {/* <p className="text-2xl text-gray-700 dark:text-gray-300">
          based in Los Angeles, California.
        </p> */}
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a
            href="#projects"
            className="px-8 py-4 text-lg bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-700 transition"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 text-lg border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Contact Me
          </a>
        </div> */}
      </motion.div>

      {/* Right Avatar */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 mb-12 md:mb-0 flex justify-center"
      >
        <div className="relative">
          <img
            src="/photo.jpg"
            alt="Avatar"
            className="w-64 h-64 lg:w-72 lg:h-72 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-lg"
          />
        </div>
      </motion.div>
    </section>
  );
}