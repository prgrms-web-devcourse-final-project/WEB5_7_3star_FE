import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu, User } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#D4E3FF]/50 bg-white/80 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB] shadow-sm">
              <span className="text-sm font-bold text-white">T</span>
            </div>
            <span className="bg-gradient-to-r from-[#8BB5FF] via-[#A5C7FF] to-[#C4B5F7] bg-clip-text text-xl font-bold text-transparent">
              TrainUs
            </span>
          </Link>

          {/* 네비게이션 */}
          <nav className="hidden space-x-8 md:flex">
            <Link
              href="/search"
              className="font-medium text-gray-600 transition-all duration-200 hover:scale-105 hover:text-[#8BB5FF]"
            >
              레슨 찾기
            </Link>
            <Link
              href="/lesson/register"
              className="font-medium text-gray-600 transition-all duration-200 hover:scale-105 hover:text-[#8BB5FF]"
            >
              레슨 등록
            </Link>
            <Link
              href="/lesson/list"
              className="font-medium text-gray-600 transition-all duration-200 hover:scale-105 hover:text-[#8BB5FF]"
            >
              레슨 목록
            </Link>
            <Link
              href="/about"
              className="font-medium text-gray-600 transition-all duration-200 hover:scale-105 hover:text-[#8BB5FF]"
            >
              소개
            </Link>
          </nav>

          {/* 우측 메뉴 */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#D4E3FF]/30 hover:to-[#E1D8FB]/30"
                >
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="hidden text-gray-700 sm:block">김운동</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border-primary-100 w-48 bg-white/95 backdrop-blur-sm"
              >
                <DropdownMenuItem asChild>
                  <Link
                    href="/mypage/applications"
                    className="hover:bg-gradient-card"
                  >
                    신청레슨 현황
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/mypage/payments"
                    className="hover:bg-gradient-card"
                  >
                    결제 내역
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/mypage/edit" className="hover:bg-gradient-card">
                    프로필 설정
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-gradient-card">
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              className="transition-all duration-200 hover:bg-gradient-to-r hover:from-[#D4E3FF]/30 hover:to-[#E1D8FB]/30 md:hidden"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
