import { Search, Plus, Trophy, Gift, User, Settings, LogOut } from "lucide-react"

export default function TrainUsLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-200 to-purple-200 rounded-lg flex items-center justify-center text-gray-700 font-bold text-sm">
                T
              </div>
              <span className="text-2xl font-bold text-gray-900">TrainUs</span>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            환영합니다! 🎉
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">TrainUs</span>{" "}
            대시보드
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            원하는 서비스를 선택하여 시작해보세요. 모든 기능이 한 곳에서 관리됩니다.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* 레슨 검색하기 */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search className="w-8 h-8 text-gray-700" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">레슨 검색하기</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              다양한 카테고리의 레슨을 검색하고 원하는 강의를 찾아보세요.
            </p>
          </div>

          {/* 레슨 생성하기 */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-blue-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-8 h-8 text-gray-700" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">레슨 생성하기</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">나만의 레슨을 만들고 다른 사용자들과 공유해보세요.</p>
          </div>

          {/* 랭킹 보러가기 */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-orange-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Trophy className="w-8 h-8 text-gray-700" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">랭킹 보러가기</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">전체 사용자 랭킹을 확인하고 나의 위치를 파악해보세요.</p>
          </div>

          {/* 쿠폰 받으러가기 */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-orange-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Gift className="w-8 h-8 text-gray-700" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">쿠폰 받으러가기</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">다양한 혜택과 할인 쿠폰을 받아보세요.</p>
          </div>
        </div>

        {/* Quick Stats */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-purple-200 rounded-lg flex items-center justify-center text-gray-700 font-bold text-xs">
                T
              </div>
              <span className="text-lg font-bold">TrainUs</span>
            </div>
            <div className="text-gray-400 text-sm">© 2024 TrainUs. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
