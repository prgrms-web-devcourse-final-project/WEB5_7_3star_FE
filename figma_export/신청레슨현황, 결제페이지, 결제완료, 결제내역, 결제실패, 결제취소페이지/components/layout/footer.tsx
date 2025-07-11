import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#D4E3FF]/20 to-[#E1D8FB]/20 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB] rounded-lg flex items-center justify-center mr-3 shadow-sm">
                <span className="text-white font-bold text-sm">WM</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#8BB5FF] to-[#C4B5F7] bg-clip-text text-transparent">
                운동메이트
              </span>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              건강한 운동 문화를 만들어가는 운동메이트 플랫폼입니다.
              <br />
              전문 트레이너와 함께하는 맞춤형 운동 레슨을 경험해보세요.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-[#8BB5FF] transition-colors duration-200">
                Instagram
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#8BB5FF] transition-colors duration-200">
                YouTube
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#8BB5FF] transition-colors duration-200">
                Blog
              </Link>
            </div>
          </div>

          {/* 서비스 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">서비스</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/lessons" className="text-gray-600 hover:text-[#8BB5FF] transition-colors duration-200">
                  레슨 찾기
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="text-gray-600 hover:text-[#8BB5FF] transition-colors duration-200">
                  트레이너 찾기
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-600 hover:text-[#8BB5FF] transition-colors duration-200">
                  커뮤니티
                </Link>
              </li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">고객지원</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-[#8BB5FF] transition-colors duration-200">
                  도움말
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#8BB5FF] transition-colors duration-200">
                  문의하기
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-[#8BB5FF] transition-colors duration-200">
                  자주 묻는 질문
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-100 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2024 운동메이트. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-500 hover:text-[#8BB5FF] text-sm transition-colors duration-200">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-[#8BB5FF] text-sm transition-colors duration-200">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
