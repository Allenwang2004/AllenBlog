"use client"

import { ChevronDown } from "lucide-react"

export default function ScrollIndicator() {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
      <button
        onClick={scrollToNext}
        className="group flex flex-col items-center space-y-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
        aria-label="Scroll down"
      >
        <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">Click Down</span>
        <div className="relative">
          <ChevronDown className="w-8 h-6 animate-pulse" />
          <ChevronDown className="w-8 h-6 absolute top-0 left-0 animate-ping opacity-30" />
        </div>
      </button>

      {/* 滑動線條動畫 */}
      <div className="mt-4 w-px h-16 bg-gradient-to-b from-gray-400 to-transparent relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-blue-500 to-transparent animate-scroll-line"></div>
      </div>
    </div>
  )
}
