import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bell, User, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-[#D4E3FF]/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB] rounded-lg flex items-center justify-center mr-3 shadow-sm">
              <span className="text-white font-bold text-sm">WM</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] bg-clip-text text-transparent">
              운동메이트
            </span>
          </Link>

          {/* 네비게이션 */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/lessons"
              className="text-gray-600 hover:text-[#8BB5FF] font-medium transition-all duration-200 hover:scale-105"
            >
              레슨 찾기
            </Link>
            <Link
              href="/trainers"
              className="text-gray-600 hover:text-[#8BB5FF] font-medium transition-all duration-200 hover:scale-105"
            >
              트레이너
            </Link>
            <Link
              href="/community"
              className="text-gray-600 hover:text-[#8BB5FF] font-medium transition-all duration-200 hover:scale-105"
            >
              커뮤니티
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-[#8BB5FF] font-medium transition-all duration-200 hover:scale-105"
            >
              소개
            </Link>
          </nav>

          {/* 우측 메뉴 */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-gradient-to-r hover:from-[#D4E3FF]/30 hover:to-[#E1D8FB]/30 transition-all duration-200"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                2
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 hover:bg-gradient-to-r hover:from-[#D4E3FF]/30 hover:to-[#E1D8FB]/30 transition-all duration-200"
                >
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="hidden sm:block text-gray-700">김운동</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm border-primary-100">
                <DropdownMenuItem asChild>
                  <Link href="/mypage/applications" className="hover:bg-gradient-card">
                    신청레슨 현황
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/mypage/payments" className="hover:bg-gradient-card">
                    결제 내역
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/mypage/profile" className="hover:bg-gradient-card">
                    프로필 설정
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-gradient-card">로그아웃</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover:bg-gradient-to-r hover:from-[#D4E3FF]/30 hover:to-[#E1D8FB]/30 transition-all duration-200"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
