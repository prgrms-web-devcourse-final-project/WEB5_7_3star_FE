export default function SwaggerPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">📋 API 문서 (Swagger UI)</h1>

      <div className="mb-6">
        <p className="mb-4 text-gray-600">
          백엔드 API 문서를 확인하고 테스트할 수 있습니다.
        </p>
        <a
          href="http://43.202.206.47:8080/swagger-ui/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Swagger UI 열기
        </a>
      </div>

      <div className="rounded-lg bg-gray-100 p-4">
        <h2 className="mb-4 text-xl font-semibold">API 엔드포인트 목록:</h2>
        <div className="space-y-2">
          <div className="rounded bg-white p-3">
            <h3 className="font-semibold">인증 관련</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• POST /api/v1/users/login - 로그인</li>
              <li>• POST /api/v1/users/signup - 회원가입</li>
              <li>
                • POST /api/v1/users/verify/email-send - 이메일 인증 코드 발송
              </li>
              <li>
                • POST /api/v1/users/verify/email-check - 이메일 인증 코드 확인
              </li>
              <li>
                • GET /api/v1/users/verify/nickname-check - 닉네임 중복 확인
              </li>
            </ul>
          </div>

          <div className="rounded bg-white p-3">
            <h3 className="font-semibold">레슨 관련</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• GET /api/v1/lessons - 레슨 목록 조회</li>
              <li>• GET /api/v1/lessons/{'{id}'} - 레슨 상세 조회</li>
              <li>• POST /api/v1/lessons - 레슨 등록</li>
              <li>• PUT /api/v1/lessons/{'{id}'} - 레슨 수정</li>
              <li>• DELETE /api/v1/lessons/{'{id}'} - 레슨 삭제</li>
            </ul>
          </div>

          <div className="rounded bg-white p-3">
            <h3 className="font-semibold">랭킹 관련</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• GET /api/v1/rankings - 트레이너 랭킹 조회</li>
            </ul>
          </div>

          <div className="rounded bg-white p-3">
            <h3 className="font-semibold">쿠폰 관련</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• GET /api/v1/coupons - 쿠폰 목록 조회</li>
              <li>• POST /api/v1/coupons/{'{id}'} - 쿠폰 발급</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
