'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu, Settings, User, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'

interface HeaderProps {
  isAdmin?: boolean
  isInstructor?: boolean
}

export function Header({ isAdmin = false, isInstructor = false }: HeaderProps) {
  const { isAuthenticated, user, isLoading, logout } = useAuth()
  const [mounted, setMounted] = useState(false)

  // 디버깅을 위한 로그
  console.log('Header - Auth State:', { isAuthenticated, user, isLoading })

  // 상태 변경 감지를 위한 useEffect
  useEffect(() => {
    console.log('Header - 상태 변경됨:', { isAuthenticated, user, isLoading })
  }, [isAuthenticated, user, isLoading])

  // 클라이언트 사이드에서만 렌더링하도록 설정
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청
      fetch('/api/proxy/api/v1/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch((error) => {
        console.error('로그아웃 서버 요청 오류:', error)
      })

      // 클라이언트 상태 정리
      logout()
      window.location.href = '/'
    } catch (error) {
      console.error('로그아웃 처리 오류:', error)
      logout()
      window.location.href = '/'
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-xs backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] shadow-xs">
              <span className="text-sm font-bold text-white">T</span>
            </div>
            <span className="bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] bg-clip-text text-xl font-bold text-transparent">
              TrainUs
            </span>
          </Link>

          {/* 네비게이션 */}
          <nav className="hidden space-x-8 md:flex">
            <Link
              href="/search"
              className="cursor-pointer font-medium text-gray-600 transition-all duration-200 hover:text-blue-600"
            >
              레슨 찾기
            </Link>
            <Link
              href="/lesson/register"
              className="cursor-pointer font-medium text-gray-600 transition-all duration-200 hover:text-blue-600"
            >
              레슨 등록
            </Link>
            <Link
              href="/lesson/list"
              className="cursor-pointer font-medium text-gray-600 transition-all duration-200 hover:text-blue-600"
            >
              레슨 목록
            </Link>
            <Link
              href="/about"
              className="cursor-pointer font-medium text-gray-600 transition-all duration-200 hover:text-blue-600"
            >
              소개
            </Link>
          </nav>

          {/* 우측 메뉴 */}
          <div className="flex items-center space-x-2">
            {!mounted || isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                <span className="text-sm text-gray-500">확인 중...</span>
              </div>
            ) : (
              <>
                {/* 관리자 드롭다운 */}
                {isAdmin && isAuthenticated && user && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex cursor-pointer items-center space-x-2 transition-all duration-200 hover:bg-gray-100"
                      >
                        <Settings className="h-5 w-5 text-gray-600" />
                        <span className="hidden text-gray-700 sm:block">
                          관리자
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 rounded-lg border border-gray-200 bg-white shadow-sm"
                    >
                      <DropdownMenuItem asChild>
                        <Link
                          href="/admin/coupon"
                          className="cursor-pointer hover:bg-gray-50"
                        >
                          쿠폰 관리
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {/* 로그인된 사용자 드롭다운 */}
                {isAuthenticated && user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex cursor-pointer items-center space-x-2 transition-all duration-200 hover:bg-gray-100"
                      >
                        <User className="h-5 w-5 text-gray-600" />
                        <span className="hidden text-gray-700 sm:block">
                          {user.nickname}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 rounded-lg border border-gray-200 bg-white shadow-sm"
                    >
                      <DropdownMenuItem asChild>
                        <Link
                          href="/mypage/applications"
                          className="cursor-pointer hover:bg-gray-50"
                        >
                          신청레슨 현황
                        </Link>
                      </DropdownMenuItem>
                      <>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/profile/${user.id}`}
                            className="cursor-pointer hover:bg-gray-50"
                          >
                            내 프로필
                          </Link>
                        </DropdownMenuItem>
                      </>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/mypage/edit"
                          className="cursor-pointer hover:bg-gray-50"
                        >
                          마이페이지
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={handleLogout}
                      >
                        로그아웃
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  /* 로그인 버튼 */
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex cursor-pointer items-center space-x-2 transition-all duration-200 hover:bg-gray-100"
                  >
                    <Link href="/login">
                      <LogIn className="h-5 w-5 text-gray-600" />
                      <span className="hidden text-gray-700 sm:block">
                        로그인
                      </span>
                    </Link>
                  </Button>
                )}
              </>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer transition-all duration-200 hover:bg-gray-100 md:hidden"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
