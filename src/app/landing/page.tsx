import { Search, Plus, Trophy, Gift } from 'lucide-react'

export default function TrainUsLanding() {
  return (
    <div className="">
      {/* Welcome Section */}
      <div className="mb-16 text-center">
        <div className="mb-6 inline-block rounded-full bg-purple-200 px-4 py-2 text-sm font-medium text-gray-700">
          환영합니다! 🎉
        </div>
        <h1 className="mb-6 text-5xl leading-tight font-extrabold text-gray-900">
          <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
            TrainUs
          </span>{' '}
          대시보드
        </h1>
        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
          원하는 서비스를 선택하여 시작해보세요. 모든 기능이 한 곳에서
          관리됩니다.
        </p>
      </div>

      {/* Service Cards Grid */}
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8">
        {/* 레슨 검색하기 */}
        <div className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:shadow-xl">
          <div className="mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-200 to-purple-200 transition-transform group-hover:scale-110">
              <Search className="h-8 w-8 text-gray-700" />
            </div>
          </div>
          <h3 className="mb-3 text-2xl font-bold text-gray-900">
            레슨 검색하기
          </h3>
          <p className="mb-6 leading-relaxed text-gray-600">
            다양한 카테고리의 레슨을 검색하고 원하는 강의를 찾아보세요.
          </p>
        </div>

        {/* 레슨 생성하기 */}
        <div className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:shadow-xl">
          <div className="mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-200 to-blue-200 transition-transform group-hover:scale-110">
              <Plus className="h-8 w-8 text-gray-700" />
            </div>
          </div>
          <h3 className="mb-3 text-2xl font-bold text-gray-900">
            레슨 생성하기
          </h3>
          <p className="mb-6 leading-relaxed text-gray-600">
            나만의 레슨을 만들고 다른 사용자들과 공유해보세요.
          </p>
        </div>

        {/* 랭킹 보러가기 */}
        <div className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:shadow-xl">
          <div className="mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-200 to-orange-200 transition-transform group-hover:scale-110">
              <Trophy className="h-8 w-8 text-gray-700" />
            </div>
          </div>
          <h3 className="mb-3 text-2xl font-bold text-gray-900">
            랭킹 보러가기
          </h3>
          <p className="mb-6 leading-relaxed text-gray-600">
            전체 사용자 랭킹을 확인하고 나의 위치를 파악해보세요.
          </p>
        </div>

        {/* 쿠폰 받으러가기 */}
        <div className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:shadow-xl">
          <div className="mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-200 to-orange-200 transition-transform group-hover:scale-110">
              <Gift className="h-8 w-8 text-gray-700" />
            </div>
          </div>
          <h3 className="mb-3 text-2xl font-bold text-gray-900">
            쿠폰 받으러가기
          </h3>
          <p className="mb-6 leading-relaxed text-gray-600">
            다양한 혜택과 할인 쿠폰을 받아보세요.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
    </div>
  )
}
