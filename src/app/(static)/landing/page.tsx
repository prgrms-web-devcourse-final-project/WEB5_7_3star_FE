import { Search, Plus, Trophy, Gift } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Link from 'next/link'

export default function TrainUsLanding() {
  return (
    <div className="">
      <PageHeader
        title="TrainUs 대시보드"
        subtitle="원하는 서비스를 선택하여 시작해보세요. 모든 기능이 한 곳에서 관리됩니다."
        align="center"
      />

      {/* Service Cards Grid */}
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8">
        {/* 레슨 검색하기 */}
        <Link href="/search">
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
        </Link>

        {/* 레슨 생성하기 */}
        <Link href="/lesson/register">
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
        </Link>

        {/* 랭킹 보러가기 */}
        <Link href="/ranking">
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
        </Link>

        {/* 쿠폰 받으러가기 */}
        <Link href="/coupons">
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
        </Link>
      </div>

      {/* Quick Stats */}
    </div>
  )
}
