import RegisterForm from '@/components/lesson/register-form'

export default async function LessonRegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E3FF]/30 via-white to-[#E1D8FB]/30">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="bg-gradient-to-r from-[#8BB5FF] via-[#A5C7FF] to-[#C4B5F7] bg-clip-text text-4xl font-bold text-transparent">
            레슨 등록
          </h1>
          <p className="mt-3 text-gray-600">
            새로운 레슨을 등록하고 수강생들을 모집해보세요
          </p>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#D4E3FF] to-[#E1D8FB]"></div>
        </div>

        <RegisterForm />
      </div>
    </div>
  )
}
