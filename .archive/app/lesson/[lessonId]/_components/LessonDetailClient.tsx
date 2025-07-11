'use client'

import { useState } from 'react'
import {
  Heart,
  Share2,
  Calendar,
  MapPin,
  Users,
  Star,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Image from 'next/image'

interface LessonData {
  id: number
  title: string
  instructor: {
    id: number
    name: string
    profileImage: string
    rating: number
    reviewCount: number
    experience: string
    introduction: string
  }
  price: number
  originalPrice: number
  maxParticipants: number
  currentParticipants: number
  status: string
  startDate: string
  endDate: string
  schedule: string
  location: string
  address: string
  description: string
  curriculum: string[]
  requirements: string[]
  images: string[]
  reviews: {
    id: number
    author: string
    rating: number
    date: string
    content: string
    lesson: string
  }[]
}

interface LessonDetailClientProps {
  lessonData: LessonData
}

export default function LessonDetailClient({
  lessonData,
}: LessonDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState('introduction')

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite)
  }

  const handleBookingClick = () => {
    alert('레슨 신청 페이지로 이동합니다.')
  }

  const handleInstructorClick = () => {
    alert('강사 프로필 페이지로 이동합니다.')
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="lesson-detail-container">
      {/* 메인 콘텐츠 */}
      <div className="lesson-main-content">
        {/* 이미지 슬라이더 */}
        <div className="lesson-image-slider">
          <div className="lesson-image-container">
            <Image
              src={lessonData.images[currentImageIndex]}
              alt={`레슨 이미지 ${currentImageIndex + 1}`}
              className="lesson-image"
            />
          </div>

          {/* 이미지 네비게이션 */}
          <div className="image-navigation">
            {lessonData.images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleImageClick(index)}
                className={`image-dot ${index === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>

          {/* 화살표 버튼 */}
          <button
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === 0 ? lessonData.images.length - 1 : prev - 1,
              )
            }
            className="image-nav-button left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === lessonData.images.length - 1 ? 0 : prev + 1,
              )
            }
            className="image-nav-button right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* 레슨 정보 */}
        <div className="lesson-info-card">
          <div className="lesson-header">
            <div className="lesson-title-section">
              <h1 className="lesson-title">{lessonData.title}</h1>
              <div className="lesson-meta">
                <div className="meta-item">
                  <MapPin className="h-4 w-4" />
                  {lessonData.location}
                </div>
                <div className="meta-item">
                  <Calendar className="h-4 w-4" />
                  {lessonData.startDate} ~ {lessonData.endDate}
                </div>
                <div className="meta-item">
                  <Users className="h-4 w-4" />
                  {lessonData.currentParticipants}/{lessonData.maxParticipants}
                  명
                </div>
              </div>
            </div>
            <div className="lesson-actions">
              <button
                onClick={handleFavoriteClick}
                className={`favorite-button ${isFavorite ? 'active' : ''}`}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`}
                />
              </button>
              <button className="share-button">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* 탭 메뉴 */}
          <div className="lesson-tabs">
            {[
              { key: 'introduction', label: '레슨 소개' },
              { key: 'curriculum', label: '커리큘럼' },
              { key: 'reviews', label: '리뷰' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 탭 콘텐츠 */}
          <div className="tab-content">
            {activeTab === 'introduction' && (
              <div className="introduction-content">
                <p className="lesson-description">{lessonData.description}</p>

                <div className="requirements-section">
                  <h3 className="section-title">준비물</h3>
                  <ul className="requirements-list">
                    {lessonData.requirements.map((requirement, index) => (
                      <li key={index} className="requirement-item">
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="curriculum-content">
                <h3 className="section-title">커리큘럼</h3>
                <ul className="curriculum-list">
                  {lessonData.curriculum.map((item, index) => (
                    <li key={index} className="curriculum-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <h3 className="section-title">
                  리뷰 ({lessonData.reviews.length})
                </h3>
                <div className="reviews-list">
                  {lessonData.reviews.map((review) => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <div className="review-author">{review.author}</div>
                        <div className="review-rating">
                          {renderStars(review.rating)}
                        </div>
                        <div className="review-date">{review.date}</div>
                      </div>
                      <p className="review-content">{review.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 사이드바 */}
      <div className="lesson-sidebar">
        {/* 강사 정보 */}
        <div className="instructor-card">
          <div className="instructor-header">
            <div className="instructor-avatar">
              <img
                src={lessonData.instructor.profileImage}
                alt={lessonData.instructor.name}
                className="avatar-image"
              />
            </div>
            <div className="instructor-info">
              <h3 className="instructor-name">{lessonData.instructor.name}</h3>
              <div className="instructor-rating">
                {renderStars(lessonData.instructor.rating)}
                <span className="rating-text">
                  {lessonData.instructor.rating} (
                  {lessonData.instructor.reviewCount}개 리뷰)
                </span>
              </div>
              <div className="instructor-experience">
                경력 {lessonData.instructor.experience}
              </div>
            </div>
          </div>
          <p className="instructor-intro">
            {lessonData.instructor.introduction}
          </p>
          <button
            onClick={handleInstructorClick}
            className="instructor-profile-button"
          >
            <User className="h-4 w-4" />
            강사 프로필 보기
          </button>
        </div>

        {/* 가격 정보 */}
        <div className="price-card">
          <div className="price-info">
            <div className="price-section">
              <span className="price-label">레슨 비용</span>
              <div className="price-amount">
                <span className="current-price">
                  {lessonData.price.toLocaleString()}원
                </span>
                <span className="original-price">
                  {lessonData.originalPrice.toLocaleString()}원
                </span>
              </div>
            </div>
            <div className="discount-badge">
              {Math.round(
                ((lessonData.originalPrice - lessonData.price) /
                  lessonData.originalPrice) *
                  100,
              )}
              % 할인
            </div>
          </div>

          <div className="booking-info">
            <div className="participants-info">
              <Users className="h-4 w-4" />
              <span>
                {lessonData.currentParticipants}/{lessonData.maxParticipants}명
                신청
              </span>
            </div>
            <div className="schedule-info">
              <Clock className="h-4 w-4" />
              <span>{lessonData.schedule}</span>
            </div>
          </div>

          <button onClick={handleBookingClick} className="booking-button">
            레슨 신청하기
          </button>
        </div>
      </div>
    </div>
  )
}
