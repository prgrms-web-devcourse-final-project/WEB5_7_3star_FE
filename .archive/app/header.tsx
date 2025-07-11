"use client"

import Link from "next/link"

export function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] rounded-full flex items-center justify-center mr-3 shadow-lg">
              <span className="text-white font-bold text-sm">운</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] bg-clip-text text-transparent">
              TrainUs
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#" className="text-gray-700 hover:text-[#8BB5FF] transition-colors duration-200">
              레슨 목록
            </Link>
            <Link href="#" className="text-gray-700 hover:text-[#8BB5FF] transition-colors duration-200">
              레슨 찾기
            </Link>
            <Link href="#" className="text-gray-700 hover:text-[#8BB5FF] transition-colors duration-200">
              레슨 조회
            </Link>
            <Link href="#" className="text-gray-700 hover:text-[#8BB5FF] transition-colors duration-200">
              소개
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1 0-15 0v5h5l-5 5-5-5h5V7a12 12 0 1 1 24 0v10z"
                ></path>
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </div>
            <span className="text-gray-700">관리자님, 안녕하세요!</span>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              ← 홈으로
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
