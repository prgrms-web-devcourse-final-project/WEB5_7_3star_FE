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
      newOpenMenus.clear()
      newOpenMenus.add(commentId)
    }
    setOpenMenus(newOpenMenus)
  }

  const deleteComment = (commentId: string) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) return

    const updateComment = (comments: Comment[]): Comment[] => {
      return comments
        .map((comment) => {
          if (comment.id === commentId) {
            if (comment.replies && comment.replies.length > 0) {
              // 답글이 있으면 마스킹 처리
              return {
                ...comment,
                isDeleted: true,
                content: '삭제된 댓글입니다.',
              }
            } else {
              // 답글이 없으면 완전 삭제
              return null
            }
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: updateComment(comment.replies).filter(
                Boolean,
              ) as Comment[],
            }
          }
          return comment
        })
        .filter(Boolean) as Comment[]
    }

    setComments((prev) => updateComment(prev))
    setOpenMenus(new Set())
  }

  const renderComment = (comment: Comment, isReply = false) => (
    <div
      key={comment.id}
      className={`comment-item ${comment.isMyComment ? 'my-comment' : ''} ${comment.isDeleted ? 'deleted-comment' : ''}`}
    >
      {!comment.isDeleted && (
        <div className="comment-header">
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="프로필"
            className={`comment-avatar ${isReply ? 'reply-avatar' : ''}`}
          />
          <div className="comment-info">
            <span className="comment-author">{comment.author}</span>
            <span className="comment-date">{comment.date}</span>
          </div>
          <div className="comment-menu">
            <button className="menu-btn" onClick={() => toggleMenu(comment.id)}>
              <i className="fas fa-ellipsis-v"></i>
            </button>
            {openMenus.has(comment.id) && (
              <div className="menu-dropdown show">
                <button
                  className="menu-item reply-btn"
                  onClick={() => openModal('답글 작성', '', comment.id, true)}
                >
                  답글 달기
                </button>
                {comment.isMyComment && (
                  <>
                    <button
                      className="menu-item edit-btn"
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
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="comment-content">
        <p className={comment.isDeleted ? 'deleted-message' : ''}>
          {comment.isDeleted ? '삭제된 댓글입니다.' : comment.content}
        </p>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => renderComment(reply, true))}
        </div>
      )}
    </div>
  )

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-white">
      {/* 배경 장식 요소 */}
      <div className="bg-decoration bg-decoration-1"></div>
      <div className="bg-decoration bg-decoration-2"></div>
      <div className="bg-decoration bg-decoration-3"></div>

      <div className="course-container">
        <div className="course-layout">
          {/* 메인 콘텐츠 */}
          <div className="course-main">
            {/* 레슨 헤더 */}
            <div className="course-header">
              <div className="course-images">
                <div className="main-image">
                  <img
                    id="mainImage"
                    src={images[currentImageIndex] || '/placeholder.svg'}
                    alt="레슨 이미지"
                  />
                  <button
                    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                    onClick={handleFavoriteClick}
                  >
                    <i className={`${isFavorite ? 'fas' : 'far'} fa-heart`}></i>
                  </button>
                </div>
                <div className="thumbnail-images">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image || '/placeholder.svg'}
                      alt={`썸네일 ${index + 1}`}
                      className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
                </div>
              </div>

              <div className="course-info">
                <div className="course-category">수영</div>
                <h1 className="course-title">
                  초보자를 위한 자유형 마스터 클래스
                </h1>

                <div className="course-rating">
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <span className="rating-score">4.9</span>
                  <span className="rating-count">(127개 후기)</span>
                </div>

                <div className="course-instructor">
                  <img
                    src="/placeholder.svg?height=60&width=60"
                    alt="강사"
                    className="instructor-avatar"
                  />
                  <div className="instructor-info">
                    <h3 className="instructor-name">김수영 강사</h3>
                    <p className="instructor-title">
                      수영 전문 강사 · 10년 경력
                    </p>
                    <div className="instructor-stats">
                      <span>
                        <i className="fas fa-users"></i> 200+ 수강생
                      </span>
                      <span>
                        <i className="fas fa-star"></i> 4.9 평점
                      </span>
                      <span>
                        <i className="fas fa-award"></i> 수영 지도자 자격증
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 레슨 상세 정보 */}
            <div className="course-details">
              <div className="detail-tabs">
                <button
                  className={`tab-btn ${activeTab === 'introduction' ? 'active' : ''}`}
                  onClick={() => setActiveTab('introduction')}
                >
                  레슨 소개
                </button>
                <button
                  className={`tab-btn ${activeTab === 'comments' ? 'active' : ''}`}
                  onClick={() => setActiveTab('comments')}
                >
                  댓글
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'introduction' && (
                  <div className="tab-panel active">
                    <div className="description-content">
                      <h3>레슨 소개</h3>
                      <p>
                        수영을 처음 시작하는 분들을 위한 체계적인 자유형
                        레슨입니다. 물에 대한 두려움을 극복하고 올바른 자세와
                        호흡법을 익혀 자유형을 완전히 마스터할 수 있도록
                        도와드립니다.
                      </p>

                      <h4>이런 분들께 추천해요</h4>
                      <ul>
                        <li>수영을 처음 배우는 초보자</li>
                        <li>자유형 자세를 교정하고 싶은 분</li>
                        <li>체계적인 수영 교육을 받고 싶은 분</li>
                        <li>개인 맞춤 지도를 원하는 분</li>
                      </ul>

                      <h4>레슨 커리큘럼</h4>
                      <ul>
                        <li>1-2주차: 물 적응 및 기본 자세</li>
                        <li>3-4주차: 팔 동작 및 호흡법</li>
                        <li>5-6주차: 다리 킥 및 전체 동작 연결</li>
                        <li>7-8주차: 자유형 완성 및 실전 연습</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'comments' && (
                  <div className="tab-panel active">
                    <div className="comments-content">
                      <h3>
                        댓글{' '}
                        <span className="comment-count">
                          ({comments.filter((c) => !c.isDeleted).length})
                        </span>
                      </h3>

                      {/* 댓글 작성 폼 */}
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
                            rows={3}
                          />
                        </div>
                        <div className="comment-actions">
                          <button
                            onClick={handleSubmitComment}
                            className="comment-submit-btn"
                          >
                            댓글 작성
                          </button>
                        </div>
                      </div>

                      {/* 댓글 목록 */}
                      <div className="comments-list">
                        {comments.map((comment) => renderComment(comment))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 예약 사이드바 */}
          <div className="booking-sidebar">
            <div className="booking-card">
              <div className="price-info">
                <div className="price">45,000원</div>
                <div className="period">월 4회 레슨</div>
              </div>

              <div className="lesson-schedule">
                <h4>레슨 일정</h4>
                <div className="schedule-item">
                  <i className="fas fa-calendar"></i>
                  <span>매주 화, 목요일</span>
                </div>
                <div className="schedule-item">
                  <i className="fas fa-clock"></i>
                  <span>오후 7:00 - 8:00</span>
                </div>
                <div className="schedule-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>강남 수영장</span>
                </div>
                <div className="schedule-item">
                  <i className="fas fa-users"></i>
                  <span>최대 6명 (현재 4명)</span>
                </div>
              </div>

              <div className="booking-form">
                <div className="form-group">
                  <label htmlFor="startDate">시작 날짜</label>
                  <input
                    type="date"
                    id="startDate"
                    className="form-select"
                    value={startDate}
                    min={today}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="booking-buttons">
                <button className="book-btn" onClick={handleBookingClick}>
                  <i className="fas fa-calendar-plus"></i>
                  레슨 예약하기
                </button>
              </div>

              <div className="booking-notice">
                <p>
                  <i className="fas fa-check-circle"></i> 첫 레슨 무료 체험
                </p>
                <p>
                  <i className="fas fa-check-circle"></i> 24시간 전 취소 가능
                </p>
                <p>
                  <i className="fas fa-check-circle"></i> 개인 맞춤 지도
                </p>
              </div>
            </div>

            {/* 강사 정보 카드 */}
            <div className="instructor-card">
              <h4>강사 정보</h4>
              <div className="instructor-profile">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="강사"
                  className="instructor-image"
                />
                <div className="instructor-details">
                  <h5>김수영 강사</h5>
                  <p>수영 전문 강사</p>
                  <div className="instructor-experience">
                    <span>경력 10년</span>
                    <span>수강생 200+</span>
                  </div>
                </div>
              </div>
              <button
                className="instructor-profile-btn"
                onClick={handleProfileClick}
              >
                <i className="fas fa-user"></i>
                프로필 보기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="modal-overlay show" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalTitle}</h3>
              <button className="modal-close" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <textarea
                value={modalContent}
                onChange={(e) => setModalContent(e.target.value)}
                placeholder="내용을 입력해주세요..."
                rows={4}
              />
            </div>
            <div className="modal-footer">
              <button className="modal-cancel-btn" onClick={closeModal}>
                취소
              </button>
              <button className="modal-submit-btn" onClick={handleModalSubmit}>
                {editingCommentId ? '수정' : '작성'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 문서 클릭 시 메뉴 닫기 */}
      <div
        onClick={() => setOpenMenus(new Set())}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: openMenus.size > 0 ? 'auto' : 'none',
          zIndex: openMenus.size > 0 ? 50 : -1,
        }}
      />
    </div>
  )
}
