'use client'

import { useState, useEffect } from 'react'

interface Comment {
  id: string
  author: string
  content: string
  date: string
  isMyComment: boolean
  isDeleted?: boolean
  replies?: Comment[]
}

const initialComments: Comment[] = [
  {
    id: '1',
    author: '박수영',
    content:
      '정말 좋은 레슨이에요! 강사님이 너무 친절하시고 실력도 뛰어나세요.',
    date: '2024.02.15 14:30',
    isMyComment: false,
    replies: [
      {
        id: '2',
        author: '김수영 강사',
        content: '감사합니다! 앞으로도 열심히 지도하겠습니다 😊',
        date: '2024.02.15 15:00',
        isMyComment: false,
      },
    ],
  },
  {
    id: '3',
    author: '이헬스',
    content: '수영장 위치가 어디인가요? 레슨 받고 싶어요!',
    date: '2024.02.16 10:20',
    isMyComment: false,
  },
  {
    id: '4',
    author: '나',
    content: '레슨 시간이 어떻게 되나요? 평일 저녁에도 가능한지 궁금합니다.',
    date: '2024.02.16 16:45',
    isMyComment: true,
  },
]

export default function LessonDetailPage() {
  const [activeTab, setActiveTab] = useState('introduction')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null)
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set())
  const [startDate, setStartDate] = useState('')

  const images = [
    '/placeholder.svg?height=400&width=600',
    '/placeholder.svg?height=400&width=600',
    '/placeholder.svg?height=400&width=600',
  ]

  // 오늘 날짜를 시작 날짜의 최소값으로 설정
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setStartDate(today)
  }, [])

  const getCurrentDateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year}.${month}.${day} ${hours}:${minutes}`
  }

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite)
  }

  const handleBookingClick = () => {
    if (!startDate) {
      alert('시작 날짜를 선택해주세요.')
      return
    }
    alert('예약 페이지로 이동합니다.')
  }

  const handleProfileClick = () => {
    alert('강사 프로필 페이지로 이동합니다.')
  }

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      alert('댓글을 입력해주세요.')
      return
    }

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      author: '나',
      content: newComment,
      date: getCurrentDateTime(),
      isMyComment: true,
      replies: [],
    }

    setComments((prev) => [newCommentObj, ...prev])
    setNewComment('')
  }

  const handleModalSubmit = () => {
    if (!modalContent.trim()) {
      alert('내용을 입력해주세요.')
      return
    }

    if (editingCommentId) {
      // 댓글 수정
      const updateComment = (comments: Comment[]): Comment[] => {
        return comments.map((comment) => {
          if (comment.id === editingCommentId) {
            return {
              ...comment,
              content: modalContent,
              date: getCurrentDateTime() + ' (수정됨)',
            }
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: updateComment(comment.replies),
            }
          }
          return comment
        })
      }
      setComments((prev) => updateComment(prev))
    } else if (replyTargetId) {
      // 답글 작성
      const newReply: Comment = {
        id: Date.now().toString(),
        author: '나',
        content: modalContent,
        date: getCurrentDateTime(),
        isMyComment: true,
      }

      setComments((prev) =>
        prev.map((comment) => {
          if (comment.id === replyTargetId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            }
          }
          return comment
        }),
      )
    }

    closeModal()
  }

  const openModal = (
    title: string,
    content = '',
    commentId: string | null = null,
    isReply = false,
  ) => {
    setModalTitle(title)
    setModalContent(content)
    setShowModal(true)

    if (isReply) {
      setReplyTargetId(commentId)
      setEditingCommentId(null)
    } else {
      setEditingCommentId(commentId)
      setReplyTargetId(null)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setModalContent('')
    setEditingCommentId(null)
    setReplyTargetId(null)
  }

  const toggleMenu = (commentId: string) => {
    const newOpenMenus = new Set(openMenus)
    if (newOpenMenus.has(commentId)) {
      newOpenMenus.delete(commentId)
    } else {
      newOpenMenus.add(commentId)
    }
    setOpenMenus(newOpenMenus)
  }

  const deleteComment = (commentId: string) => {
    const updateComment = (comments: Comment[]): Comment[] => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            content: '삭제된 댓글입니다.',
            isDeleted: true,
          }
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: updateComment(comment.replies),
          }
        }
        return comment
      })
    }
    setComments((prev) => updateComment(prev))
    setOpenMenus((prev) => {
      const newSet = new Set(prev)
      newSet.delete(commentId)
      return newSet
    })
  }

  const renderComment = (comment: Comment, isReply = false) => (
    <div
      key={comment.id}
      className={`comment-item ${comment.isMyComment ? 'my-comment' : ''} ${
        comment.isDeleted ? 'deleted-comment' : ''
      } ${isReply ? 'reply' : ''}`}
    >
      <div className="comment-header">
        <div className="comment-info">
          <div className="comment-author">{comment.author}</div>
          <div className="comment-date">{comment.date}</div>
        </div>
        {comment.isMyComment && !comment.isDeleted && (
          <div className="comment-menu">
            <button className="menu-btn" onClick={() => toggleMenu(comment.id)}>
              ⋯
            </button>
            {openMenus.has(comment.id) && (
              <div className="menu-dropdown">
                <button
                  className="menu-item"
                  onClick={() =>
                    openModal('댓글 수정', comment.content, comment.id)
                  }
                >
                  수정
                </button>
                <button
                  className="menu-item delete-btn"
                  onClick={() => deleteComment(comment.id)}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="comment-content">
        {comment.isDeleted ? (
          <p className="deleted-message">{comment.content}</p>
        ) : (
          <p>{comment.content}</p>
        )}
      </div>
      {!comment.isDeleted && !isReply && (
        <button
          className="reply-btn"
          onClick={() => openModal('답글 작성', '', comment.id, true)}
        >
          답글
        </button>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => renderComment(reply, true))}
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* 배경 장식 요소 - Figma Export 스타일 */}
      <div className="bg-decoration bg-decoration-1" />
      <div className="bg-decoration bg-decoration-2" />
      <div className="bg-decoration bg-decoration-3" />

      <div className="course-container">
        <div className="course-layout">
          {/* 메인 콘텐츠 */}
          <div className="course-main">
            {/* 레슨 헤더 */}
            <div className="course-header">
              {/* 이미지 섹션 */}
              <div className="course-images">
                <div className="main-image">
                  <img src={images[currentImageIndex]} alt="레슨 이미지" />
                  <button
                    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                    onClick={handleFavoriteClick}
                  >
                    ♥
                  </button>
                </div>
                <div className="thumbnail-images">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`썸네일 ${index + 1}`}
                      className={`thumbnail ${
                        index === currentImageIndex ? 'active' : ''
                      }`}
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
                </div>
              </div>

              {/* 레슨 정보 */}
              <div className="course-info">
                <div className="course-category">테니스</div>
                <h1 className="course-title">
                  테니스 기초반 - 완전 초보자 환영
                </h1>
                <div className="course-rating">
                  <div className="stars">★★★★★</div>
                  <span className="rating-score">4.9</span>
                  <span className="rating-count">(89개 리뷰)</span>
                </div>
              </div>

              {/* 강사 정보 */}
              <div className="course-instructor">
                <img
                  src="/placeholder.svg?height=60&width=60"
                  alt="강사 프로필"
                  className="instructor-avatar"
                />
                <div className="instructor-info">
                  <div className="instructor-name">김수영 강사</div>
                  <div className="instructor-title">테니스 전문 강사</div>
                  <div className="instructor-stats">
                    <span>15년 경력</span>
                    <span>•</span>
                    <span>4.9점</span>
                    <span>•</span>
                    <span>89개 리뷰</span>
                  </div>
                </div>
                <button
                  className="instructor-profile-btn"
                  onClick={handleProfileClick}
                >
                  프로필 보기
                </button>
              </div>
            </div>

            {/* 상세 정보 탭 */}
            <div className="course-details">
              <div className="detail-tabs">
                <button
                  className={`tab-btn ${activeTab === 'introduction' ? 'active' : ''}`}
                  onClick={() => setActiveTab('introduction')}
                >
                  소개
                </button>
                <button
                  className={`tab-btn ${activeTab === 'comments' ? 'active' : ''}`}
                  onClick={() => setActiveTab('comments')}
                >
                  댓글{' '}
                  <span className="comment-count">({comments.length})</span>
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'introduction' && (
                  <div className="tab-panel active">
                    <div className="description-content">
                      <h3>레슨 소개</h3>
                      <p>
                        테니스를 처음 시작하는 분들을 위한 기초 레슨입니다. 라켓
                        잡는 법부터 기본 스트로크까지 차근차근 배워보세요.
                      </p>
                      <h4>레슨 특징</h4>
                      <ul>
                        <li>완전 초보자도 쉽게 따라할 수 있는 커리큘럼</li>
                        <li>개인별 맞춤 지도</li>
                        <li>실습 위주의 수업</li>
                        <li>장비 대여 가능</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'comments' && (
                  <div className="tab-panel active">
                    <div className="comment-form">
                      <div className="comment-input-wrapper">
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt="내 프로필"
                          className="comment-avatar"
                        />
                        <textarea
                          className="comment-input"
                          placeholder="댓글을 작성해주세요..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                      </div>
                      <div className="comment-actions">
                        <button
                          className="comment-submit-btn"
                          onClick={handleSubmitComment}
                        >
                          댓글 작성
                        </button>
                      </div>
                    </div>

                    <div className="comments-list">
                      {comments.map((comment) => renderComment(comment))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="booking-sidebar">
            {/* 예약 카드 */}
            <div className="booking-card">
              <div className="price-info">
                <div className="price">₩45,000</div>
                <div className="period">/ 1회</div>
              </div>

              <div className="lesson-schedule">
                <h4>레슨 일정</h4>
                <div className="schedule-item">
                  <span>📅</span>
                  <span>매주 토요일 14:00-16:00</span>
                </div>
                <div className="schedule-item">
                  <span>📍</span>
                  <span>서초구 테니스장</span>
                </div>
              </div>

              <div className="booking-form">
                <div className="form-group">
                  <label>시작 날짜</label>
                  <input
                    type="date"
                    className="form-select"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={startDate}
                  />
                </div>

                <div className="booking-buttons">
                  <button className="book-btn" onClick={handleBookingClick}>
                    레슨 신청하기
                  </button>
                </div>

                <div className="booking-notice">
                  <p>
                    <span>⚠️</span>
                    신청 후 24시간 내에 결제를 완료해주세요.
                  </p>
                </div>
              </div>
            </div>

            {/* 강사 카드 */}
            <div className="instructor-card">
              <h4>강사 정보</h4>
              <div className="instructor-profile">
                <img
                  src="/placeholder.svg?height=60&width=60"
                  alt="강사 프로필"
                  className="instructor-image"
                />
                <div className="instructor-details">
                  <h5>김수영 강사</h5>
                  <p>테니스 전문 강사</p>
                </div>
              </div>
              <div className="instructor-experience">
                <p>• 15년 테니스 지도 경력</p>
                <p>• 한국테니스협회 인증 강사</p>
                <p>• 개인/그룹 레슨 전문</p>
              </div>
              <button
                className="instructor-profile-btn"
                onClick={handleProfileClick}
              >
                프로필 보기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalTitle}</h3>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <textarea
                value={modalContent}
                onChange={(e) => setModalContent(e.target.value)}
                placeholder="내용을 입력해주세요..."
              />
            </div>
            <div className="modal-footer">
              <button className="modal-cancel-btn" onClick={closeModal}>
                취소
              </button>
              <button className="modal-submit-btn" onClick={handleModalSubmit}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
