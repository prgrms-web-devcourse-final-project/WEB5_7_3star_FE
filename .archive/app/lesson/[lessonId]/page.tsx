import LessonDetailClient from './_components/LessonDetailClient'

// 더미 데이터
const lessonData = {
  id: 1,
  title: '테니스 기초반 - 완전 초보자 환영',
  instructor: {
    id: 1,
    name: '김수영 강사',
    profileImage: 'https://s3.ap-northeast-2.amazonaws.com/mybucket/puppy.jpg',
    rating: 4.8,
    reviewCount: 127,
    experience: '15년',
    introduction:
      '15년 경력의 테니스 전문 강사입니다. 초보자부터 고급자까지 체계적인 지도를 제공합니다.',
  },
  price: 45000,
  originalPrice: 60000,
  maxParticipants: 8,
  currentParticipants: 6,
  status: 'RECRUITING',
  startDate: '2024-03-15',
  endDate: '2024-04-15',
  schedule: '매주 토요일 14:00-16:00',
  location: '서초구 테니스장',
  address: '서울특별시 서초구 테니스로 123',
  description:
    '테니스를 처음 배우시는 분들을 위한 기초 레슨입니다. 라켓 잡는 법부터 기본 스트로크까지 차근차근 가르쳐드립니다.',
  curriculum: [
    '1주차: 라켓 잡는 법과 기본 자세',
    '2주차: 포핸드 스트로크 기초',
    '3주차: 백핸드 스트로크 기초',
    '4주차: 서브와 리턴 기초',
    '5주차: 기본 게임 룰과 매치 플레이',
  ],
  requirements: [
    '테니스 라켓 (없으시면 대여 가능)',
    '운동복과 운동화',
    '물과 수건',
    '긍정적인 마음가짐!',
  ],
  images: [
    '/placeholder.svg?height=400&width=600',
    '/placeholder.svg?height=400&width=600',
    '/placeholder.svg?height=400&width=600',
  ],
  reviews: [
    {
      id: 1,
      author: '박수영',
      rating: 5,
      date: '2024.02.15',
      content:
        '정말 좋은 레슨이에요! 강사님이 너무 친절하시고 실력도 뛰어나세요. 초보자인데도 쉽게 따라할 수 있었습니다.',
      lesson: '테니스 기초반',
    },
    {
      id: 2,
      author: '이헬스',
      rating: 4,
      date: '2024.02.10',
      content:
        '체계적으로 잘 가르쳐주셔서 실력이 많이 늘었어요. 다음에도 수강하고 싶습니다!',
      lesson: '테니스 기초반',
    },
  ],
}

export default function LessonDetailPage() {
  return (
    <div className="lesson-detail-page">
      <main className="lesson-main">
        <LessonDetailClient lessonData={lessonData} />
      </main>
    </div>
  )
}
