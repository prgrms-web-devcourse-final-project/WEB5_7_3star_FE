'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/hooks/useAuth'
import {
  applyLesson,
  cancelLessonApplication,
  getProfileDetail,
  ProfileDetailResponse,
} from '@/lib/api/profile'
import { formatDate, formatPrice } from '@/lib/utils'
import type { components } from '@/types/swagger-generated'
import {
  Award,
  Calendar,
  CheckCircle,
  CreditCard,
  Edit,
  Heart,
  Loader2,
  MapPin,
  MoreVertical,
  PlayCircle,
  Reply,
  Star,
  Trash2,
  User,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// 타입 정의
type LessonDetailData = components['schemas']['LessonDetailResponseDto']

interface Comment {
  commentId: number
  userId: number
  nickname: string
  content: string
  parentCommentId: number | null
  deleted: boolean
  createdAt: string
}

interface CommentResponse {
  status: string
  message: string
  data: {
    comments: Comment[]
  }
}

interface LessonDetailClientProps {
  lesson: LessonDetailData
}

// 댓글 조회 API
const fetchComments = async (lessonId: number): Promise<Comment[]> => {
  try {
    const response = await fetch(
      `/api/proxy/api/v1/comments/${lessonId}?page=1&pageSize=10`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    if (!response.ok) {
      throw new Error(`댓글 조회 실패: ${response.status}`)
    }

    const result: CommentResponse = await response.json()

    return result.data.comments || []
  } catch (error) {
    console.error('댓글 조회 에러:', error)
    return []
  }
}

// 댓글 작성 API
const createComment = async (
  lessonId: number,
  content: string,
  parentCommentId?: number,
): Promise<Comment | null> => {
  try {
    const response = await fetch(`/api/proxy/api/v1/comments/${lessonId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        content,
        parentCommentId: parentCommentId ?? null,
      }),
    })

    if (!response.ok) {
      throw new Error(`댓글 작성 실패: ${response.status}`)
    }

    const result = await response.json()
    return result.data
  } catch (error) {
    console.error('댓글 작성 에러:', error)
    throw error
  }
}

// 댓글 수정 API
const updateComment = async (
  commentId: number,
  content: string,
): Promise<Comment | null> => {
  try {
    const response = await fetch(`/api/proxy/api/v1/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        content,
      }),
    })

    if (!response.ok) {
      throw new Error(`댓글 수정 실패: ${response.status}`)
    }

    const result = await response.json()
    return result.data
  } catch (error) {
    console.error('댓글 수정 에러:', error)
    throw error
  }
}

// 댓글 삭제 API
const deleteComment = async (commentId: number): Promise<boolean> => {
  try {
    const response = await fetch(`/api/proxy/api/v1/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`댓글 삭제 실패: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error('댓글 삭제 에러:', error)
    throw error
  }
}

export default function LessonDetailClient({
  lesson,
}: LessonDetailClientProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('introduction')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [editingComment, setEditingComment] = useState<number | null>(null)
  const [editContent, setEditContent] = useState('')
  const [users, setUsers] = useState<ProfileDetailResponse[]>([])

  const resetAllStates = () => {
    setReplyingTo(null)
    setReplyContent('')
    setEditingComment(null)
    setEditContent('')
  }
  const [isApplying, setIsApplying] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
  const [applicationStatus, setApplicationStatus] = useState<string | null>(
    null,
  )
  const [isLoadingComments, setIsLoadingComments] = useState(false)
  const [countdown, setCountdown] = useState<string>('')

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite)
  }

  const handleLessonApply = async () => {
    try {
      setIsApplying(true)
      if (!lesson.id) {
        alert('레슨 ID가 없습니다.')
        return
      }

      const response = await applyLesson(lesson.id)

      alert('레슨 신청이 완료되었습니다!')
      setApplicationStatus('applied')
      router.refresh()
    } catch (error) {
      console.error('레슨 신청 실패:', error)
      const errorMessage =
        error instanceof Error ? error.message : '레슨 신청에 실패했습니다.'
      alert(errorMessage)
    } finally {
      setIsApplying(false)
    }
  }

  const handleLessonCancel = async () => {
    if (!user) {
      alert('로그인이 필요합니다.')
      return
    }

    if (!confirm('정말로 레슨 신청을 취소하시겠습니까?')) {
      return
    }

    try {
      setIsCancelling(true)

      if (!lesson.id) {
        alert('레슨 ID가 없습니다.')
        return
      }

      const response = await cancelLessonApplication(lesson.id)

      alert('레슨 신청이 취소되었습니다.')
      setApplicationStatus(null)
    } catch (error) {
      console.error('레슨 신청 취소 실패:', error)
      const errorMessage =
        error instanceof Error
          ? error.message
          : '레슨 신청 취소에 실패했습니다.'
      alert(errorMessage)
    } finally {
      setIsCancelling(false)
    }
  }

  const handleSubmitComment = async () => {
    if (!user) {
      alert('로그인이 필요합니다.')
      return
    }

    if (!newComment.trim()) {
      alert('댓글을 입력해주세요.')
      return
    }

    if (!lesson.id) {
      alert('레슨 정보가 없습니다.')
      return
    }

    try {
      const createdComment = await createComment(lesson.id, newComment.trim())
      if (createdComment) {
        // 댓글 목록 새로고침
        const updatedComments = await fetchComments(lesson.id)
        setComments(updatedComments)
        setNewComment('')
      }
    } catch (error) {
      console.error('댓글 작성 실패:', error)
      alert('댓글 작성 중 오류가 발생했습니다.')
    }
  }

  const handleAddReply = async (parentCommentId: number) => {
    if (!user) {
      alert('로그인이 필요합니다.')
      return
    }

    if (!replyContent.trim()) {
      alert('답글을 입력해주세요.')
      return
    }

    if (!lesson.id) {
      alert('레슨 정보가 없습니다.')
      return
    }

    try {
      const createdReply = await createComment(
        lesson.id,
        replyContent.trim(),
        parentCommentId,
      )
      if (createdReply) {
        // 댓글 목록 새로고침
        const updatedComments = await fetchComments(lesson.id)
        setComments(updatedComments)
        // 상태 초기화
        resetAllStates()
      }
    } catch (error) {
      console.error('답글 작성 실패:', error)
      alert('답글 작성 중 오류가 발생했습니다.')
    }
  }

  const handleEditComment = async (commentId: number) => {
    if (!editContent.trim()) {
      alert('수정할 내용을 입력해주세요.')
      return
    }

    try {
      const updatedComment = await updateComment(commentId, editContent.trim())
      if (updatedComment) {
        const updatedComments = await fetchComments(lesson.id!)
        setComments(updatedComments)
        setEditContent('')
        setEditingComment(null)
      }
    } catch (error) {
      console.error('댓글 수정 실패:', error)
      alert('댓글 수정 중 오류가 발생했습니다.')
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      return
    }

    try {
      const success = await deleteComment(commentId)
      if (success) {
        // 댓글 목록 새로고침
        const updatedComments = await fetchComments(lesson.id!)
        setComments(updatedComments)
        alert('댓글이 삭제되었습니다.')
      }
    } catch (error) {
      console.error('댓글 삭제 실패:', error)
      alert('댓글 삭제 중 오류가 발생했습니다.')
    }
  }

  const handleEditClick = (comment: Comment) => {
    setEditContent(comment.content)
    setEditingComment(comment.commentId)
  }

  const handleReplyClick = (commentId: number) => {
    setReplyingTo(replyingTo === commentId ? null : commentId)
    setReplyContent('')
  }

  // 댓글 로드
  const loadComments = async () => {
    if (!lesson.id) return

    setIsLoadingComments(true)
    try {
      const commentsData = await fetchComments(lesson.id)
      setComments(commentsData)
    } catch (error) {
      console.error('댓글 로드 실패:', error)
    } finally {
      setIsLoadingComments(false)
    }
  }

  const loadUsers = async () => {
    const usersData = await Promise.all(
      comments.map((comment) => getProfileDetail(comment.userId)),
    )
    const users = usersData
      .map((user) => user.data)
      .filter((user) => user !== undefined)
    setUsers(users)
  }

  // 카운트다운 계산 함수
  const calculateCountdown = () => {
    if (!lesson.openRun || !lesson.openTime) return ''

    const now = new Date()
    const openTime = new Date(lesson.openTime)
    const timeDiff = openTime.getTime() - now.getTime()

    if (timeDiff <= 0) {
      return '즉시 시작 가능'
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

    if (days > 0) {
      return `${days}일 ${hours}시간 ${minutes}분`
    } else if (hours > 0) {
      return `${hours}시간 ${minutes}분 ${seconds}초`
    } else if (minutes > 0) {
      return `${minutes}분 ${seconds}초`
    } else {
      return `${seconds}초`
    }
  }

  // 카운트다운 업데이트
  useEffect(() => {
    if (lesson.openRun && lesson.openTime) {
      const updateCountdown = () => {
        setCountdown(calculateCountdown())
      }

      updateCountdown() // 즉시 실행
      const interval = setInterval(updateCountdown, 1000) // 1초마다 업데이트

      return () => clearInterval(interval)
    }
  }, [lesson.openRun, lesson.openTime])

  useEffect(() => {
    loadComments()
    loadUsers()
    resetAllStates()
  }, [lesson.id])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* 메인 콘텐츠 */}
      <div className="space-y-6 lg:col-span-2">
        {/* 레슨 이미지 */}
        <Card className="overflow-hidden border-2 border-gray-100 shadow-xs">
          <div className="relative">
            <div className="relative aspect-video bg-gradient-to-r from-blue-500 to-purple-600">
              {/* 이미지가 있는 경우 표시, 없으면 기본 배경 */}
              {lesson.lessonImages && lesson.lessonImages.length > 0 ? (
                <img
                  src={lesson.lessonImages[currentImageIndex]}
                  alt={lesson.lessonName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <></>
              )}
              {/* <button
                onClick={handleFavoriteClick}
                className={`absolute top-4 right-4 rounded-full p-2 transition-all duration-200 ${
                  isFavorite
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-white/80 text-gray-600 hover:bg-white'
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`}
                />
              </button> */}
            </div>

            {/* 썸네일 이미지들 */}
            {lesson.lessonImages && lesson.lessonImages.length > 1 && (
              <div className="flex gap-2 bg-gray-50 p-4">
                {lesson.lessonImages.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleImageClick(index)}
                    className={`h-12 w-16 overflow-hidden rounded-lg border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-blue-500 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`썸네일 ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* 레슨 정보 */}
        <Card className="border-2 border-gray-100 shadow-xs">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* 카테고리와 제목 */}
              <div>
                <Badge className="mb-2 border-0 bg-blue-100 text-blue-700">
                  {lesson.category || '카테고리'}
                </Badge>
                <h1 className="mb-3 text-3xl font-bold text-gray-800">
                  {lesson.lessonName || '레슨 제목'}
                </h1>
              </div>

              {/* 평점 */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(lesson.rating || 0)}
                </div>
                <span className="font-semibold text-gray-800">
                  {lesson.rating || 0}
                </span>
                <span className="text-gray-600">
                  ({lesson.reviewCount || 0}개 후기)
                </span>
              </div>

              {/* 강사 정보 */}
              <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-4">
                <Avatar className="h-16 w-16 border-2 border-gray-200">
                  {lesson.profileImage ? (
                    <AvatarImage
                      src={lesson.profileImage}
                      alt={lesson.lessonLeaderName || '강사'}
                    />
                  ) : null}
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold text-gray-800">
                    {lesson.lessonLeaderName || '강사'} 강사
                  </h3>
                  <p className="mb-2 text-gray-600">
                    {lesson.profileIntro || '소개글이 없습니다.'}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {lesson.currentParticipants || 0}/
                      {lesson.maxParticipants || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400" />
                      {lesson.rating || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      전문가
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 탭 콘텐츠 */}
        <Card className="border-2 border-gray-100 shadow-xs">
          <CardContent className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-gray-50">
                <TabsTrigger
                  value="introduction"
                  className="data-[state=active]:bg-white"
                >
                  레슨 소개
                </TabsTrigger>
                <TabsTrigger
                  value="comments"
                  className="data-[state=active]:bg-white"
                >
                  댓글
                </TabsTrigger>
              </TabsList>

              <TabsContent value="introduction" className="p-6">
                <div className="space-y-6">
                  <p className="leading-relaxed text-gray-700">
                    {lesson.description || '레슨 소개가 없습니다.'}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="comments" className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">
                      댓글{' '}
                      <span className="text-gray-500">({comments.length})</span>
                    </h3>
                  </div>

                  {/* 댓글 작성 폼 */}
                  {user && (
                    <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <div className="flex gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={(user as any).profileImage}
                            alt={user.nickname}
                          />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            {user.nickname?.[0] || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder="댓글을 작성해주세요..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="min-h-[80px] border-gray-300 focus:border-blue-500"
                          />
                          <div className="mt-2 flex justify-end">
                            <Button
                              onClick={handleSubmitComment}
                              disabled={!newComment.trim()}
                              className="bg-blue-600 text-white hover:bg-blue-700"
                            >
                              댓글 작성
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 댓글 목록 */}
                  <div className="space-y-4">
                    {isLoadingComments ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                        <span className="ml-2 text-gray-600">
                          댓글을 불러오는 중...
                        </span>
                      </div>
                    ) : comments.length > 0 ? (
                      comments
                        .filter(
                          (comment) =>
                            comment.commentId === comment.parentCommentId,
                        )
                        .map((comment) => (
                          <div key={comment.commentId} className="space-y-3">
                            {/* 메인 댓글 */}
                            <div className="rounded-lg border border-gray-200 bg-white p-4">
                              <div className="flex items-start gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage
                                    src={
                                      users.find(
                                        (user) =>
                                          user.userId === comment.userId,
                                      )?.profileImage
                                    }
                                    alt={
                                      users.find(
                                        (user) =>
                                          user.userId === comment.userId,
                                      )?.nickname
                                    }
                                  />
                                  <AvatarFallback className="bg-blue-500 text-white">
                                    {comment.nickname?.[0] || 'U'}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold text-gray-800">
                                        {comment.nickname || '익명'}
                                      </span>
                                      <span className="text-sm text-gray-500">
                                        {formatDate(comment.createdAt)}
                                      </span>
                                    </div>
                                    {user && !comment.deleted && (
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <button className="rounded-full p-1 transition-colors hover:bg-gray-100">
                                            <MoreVertical className="h-4 w-4 text-gray-500" />
                                          </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                          align="end"
                                          className="animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md"
                                        >
                                          <DropdownMenuItem
                                            onClick={() =>
                                              handleReplyClick(
                                                comment.commentId,
                                              )
                                            }
                                            className="relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none focus:bg-gray-100 focus:text-gray-800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                          >
                                            <Reply className="mr-2 h-4 w-4" />
                                            답글
                                          </DropdownMenuItem>
                                          {user.id === comment.userId && (
                                            <>
                                              <DropdownMenuItem
                                                onClick={() =>
                                                  handleEditClick(comment)
                                                }
                                                className="relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none focus:bg-gray-100 focus:text-gray-800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                              >
                                                <Edit className="mr-2 h-4 w-4" />
                                                수정
                                              </DropdownMenuItem>
                                              <DropdownMenuItem
                                                onClick={() =>
                                                  handleDeleteComment(
                                                    comment.commentId,
                                                  )
                                                }
                                                className="relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm text-red-600 transition-colors outline-none select-none focus:bg-red-50 focus:text-red-600 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                              >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                삭제
                                              </DropdownMenuItem>
                                            </>
                                          )}
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    )}
                                  </div>
                                  {comment.deleted ? (
                                    <p className="text-gray-400 italic">
                                      삭제된 댓글입니다.
                                    </p>
                                  ) : editingComment === comment.commentId ? (
                                    <div className="space-y-2">
                                      <Textarea
                                        value={editContent}
                                        onChange={(e) =>
                                          setEditContent(e.target.value)
                                        }
                                        className="min-h-[80px] border-gray-300 focus:border-blue-500"
                                      />
                                      <div className="flex justify-end gap-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => {
                                            setEditingComment(null)
                                            setEditContent('')
                                          }}
                                        >
                                          취소
                                        </Button>
                                        <Button
                                          size="sm"
                                          onClick={() =>
                                            handleEditComment(comment.commentId)
                                          }
                                          disabled={!editContent.trim()}
                                          className="bg-blue-600 text-white hover:bg-blue-700"
                                        >
                                          수정
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="mb-2 text-gray-700">
                                      {comment.content}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* 답글 작성 폼 */}
                              {replyingTo === comment.commentId && user && (
                                <div className="mt-4 border-t border-gray-200 pt-4">
                                  <div className="flex gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage
                                        src={(user as any).profileImage}
                                        alt={user.nickname}
                                      />
                                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                        {user.nickname?.[0] || 'U'}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <Textarea
                                        placeholder="답글을 작성해주세요..."
                                        value={replyContent}
                                        onChange={(e) => {
                                          setReplyContent(e.target.value)
                                        }}
                                        className="min-h-[60px] border-gray-300 focus:border-blue-500"
                                      />
                                      <div className="mt-2 flex justify-end gap-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => {
                                            setReplyingTo(null)
                                            setReplyContent('')
                                          }}
                                        >
                                          취소
                                        </Button>
                                        <Button
                                          size="sm"
                                          onClick={() =>
                                            handleAddReply(comment.commentId)
                                          }
                                          disabled={!replyContent.trim()}
                                          className="bg-blue-600 text-white hover:bg-blue-700"
                                        >
                                          답글 작성
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* 대댓글들 */}
                            {comments
                              .filter(
                                (cmt) =>
                                  cmt.parentCommentId === comment.commentId &&
                                  cmt.commentId !== comment.commentId,
                              )
                              .map((reply) => (
                                <div
                                  key={reply.commentId}
                                  className="ml-12 rounded-lg border border-gray-200 bg-gray-50 p-4"
                                >
                                  <div className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage
                                        src={
                                          users.find(
                                            (user) =>
                                              user.userId === reply.userId,
                                          )?.profileImage
                                        }
                                        alt={
                                          users.find(
                                            (user) =>
                                              user.userId === reply.userId,
                                          )?.nickname
                                        }
                                      />
                                      <AvatarFallback className="bg-purple-500 text-white">
                                        {reply.nickname?.[0] || 'U'}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="mb-2 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <span className="font-semibold text-gray-800">
                                            {reply.nickname || '익명'}
                                          </span>
                                          <span className="text-sm text-gray-500">
                                            {formatDate(reply.createdAt)}
                                          </span>
                                        </div>
                                        {user && !reply.deleted && (
                                          <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                              <button className="rounded-full p-1 transition-colors hover:bg-gray-100">
                                                <MoreVertical className="h-4 w-4 text-gray-500" />
                                              </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                              align="end"
                                              className="w-48"
                                            >
                                              {user.id === reply.userId && (
                                                <>
                                                  <DropdownMenuItem
                                                    onClick={() =>
                                                      handleEditClick(reply)
                                                    }
                                                  >
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    수정
                                                  </DropdownMenuItem>
                                                  <DropdownMenuItem
                                                    onClick={() =>
                                                      handleDeleteComment(
                                                        reply.commentId,
                                                      )
                                                    }
                                                    className="text-red-600 focus:text-red-600"
                                                  >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    삭제
                                                  </DropdownMenuItem>
                                                </>
                                              )}
                                            </DropdownMenuContent>
                                          </DropdownMenu>
                                        )}
                                      </div>
                                      {reply.deleted ? (
                                        <p className="text-gray-400 italic">
                                          삭제된 댓글입니다.
                                        </p>
                                      ) : editingComment === reply.commentId ? (
                                        <div className="space-y-2">
                                          <Textarea
                                            value={editContent}
                                            onChange={(e) =>
                                              setEditContent(e.target.value)
                                            }
                                            className="min-h-[60px] border-gray-300 focus:border-blue-500"
                                          />
                                          <div className="flex justify-end gap-2">
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() => {
                                                setEditingComment(null)
                                                setEditContent('')
                                              }}
                                            >
                                              취소
                                            </Button>
                                            <Button
                                              size="sm"
                                              onClick={() =>
                                                handleEditComment(
                                                  reply.commentId,
                                                )
                                              }
                                              disabled={!editContent.trim()}
                                              className="bg-blue-600 text-white hover:bg-blue-700"
                                            >
                                              수정
                                            </Button>
                                          </div>
                                        </div>
                                      ) : (
                                        <p className="text-gray-700">
                                          {reply.content}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        ))
                    ) : (
                      <div className="py-8 text-center text-gray-500">
                        <p>아직 댓글이 없습니다.</p>
                        <p className="text-sm">첫 번째 댓글을 작성해보세요!</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* 예약 사이드바 */}
      <div className="space-y-2 lg:col-span-1">
        {/* 강사 정보 카드 */}
        <Card className="border-2 border-gray-100 shadow-xs">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">
              강사 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 border-2 border-gray-200">
                  <AvatarImage
                    src={lesson.profileImage}
                    alt={lesson.lessonLeaderName || '강사'}
                  />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-white">
                    {(lesson.lessonLeaderName || '강사').charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h5 className="mb-1 font-semibold text-gray-800">
                    {lesson.lessonLeaderName || '강사'} 강사
                  </h5>
                  <p className="mb-2 text-gray-600">
                    {lesson.profileIntro || '소개글이 없습니다.'}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>평점 {lesson.rating || 0}</span>
                    <span>후기 {lesson.reviewCount || 0}개</span>
                  </div>
                </div>
              </div>
              <Link
                className="flex w-full items-center justify-center rounded-lg border border-purple-600 p-2 text-purple-600"
                href={`/profile/${lesson.lessonLeader}`}
              >
                <User className="mr-2 h-4 w-4" />
                <div>프로필 보기</div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 예약 카드 */}
        <Card className="border-2 border-gray-100 shadow-xs">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* 가격 정보 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {lesson.price ? formatPrice(lesson.price) : '45,000원'}
                </div>
                <div className="text-gray-600">/월 (주 2회)</div>
              </div>

              {/* 레슨 일정 */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  레슨 일정
                </h4>
                <div className="space-y-3 text-sm text-gray-600">
                  {/* <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-700">
                        {lesson.startAt && lesson.endAt
                          ? `${new Date(lesson.startAt).toLocaleTimeString(
                              'ko-KR',
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              },
                            )} - ${new Date(lesson.endAt).toLocaleTimeString(
                              'ko-KR',
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              },
                            )} (60분)`
                          : '오후 7:00 - 8:00 (60분)'}
                      </div>
                    </div>
                  </div> */}
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-700">
                        {lesson.addressDetail ||
                          `${lesson.city || ''} ${lesson.district || ''} ${lesson.dong || ''}`.trim() ||
                          '서울 강남구 역삼동'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-700">
                        {lesson.currentParticipants ?? 0}/
                        {lesson.maxParticipants ?? 0}명 (
                        {lesson.maxParticipants
                          ? lesson.maxParticipants -
                            (lesson.currentParticipants ?? 0)
                          : 0}
                        자리 남음)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-700">
                        시작:{' '}
                        {lesson.startAt
                          ? new Date(lesson.startAt).toLocaleDateString(
                              'ko-KR',
                              {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              },
                            )
                          : '시작 날짜 정보 없음'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-700">
                        종료:{' '}
                        {lesson.endAt
                          ? new Date(lesson.endAt).toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : '종료 날짜 정보 없음'}
                      </div>
                    </div>
                  </div>
                  {lesson.openRun && lesson.openTime && (
                    <div className="flex items-start gap-3">
                      <PlayCircle className="mt-0.5 h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-700">
                          모집 시작:{' '}
                          {(() => {
                            const date = new Date(lesson.openTime)
                            const now = new Date()
                            const diffTime = date.getTime() - now.getTime()
                            const diffDays = Math.ceil(
                              diffTime / (1000 * 60 * 60 * 24),
                            )

                            // 오늘인 경우
                            if (diffDays === 0) {
                              return `오늘 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
                            }
                            // 내일인 경우
                            else if (diffDays === 1) {
                              return `내일 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
                            }
                            // 그 외의 경우
                            else {
                              return `${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
                            }
                          })()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 예약 버튼 */}
              <div className="space-y-3">
                {applicationStatus === 'applied' ? (
                  <Button
                    onClick={handleLessonCancel}
                    disabled={isCancelling}
                    className="h-14 w-full rounded-xl bg-red-500 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:bg-red-600 hover:shadow-xl disabled:opacity-50"
                  >
                    {isCancelling ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        취소 처리 중...
                      </>
                    ) : (
                      <div className="flex items-center">취소하기</div>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleLessonApply}
                    disabled={isApplying}
                    className="h-14 w-full rounded-xl bg-gradient-to-r from-[#6B73FF] to-[#9F7AEA] text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl disabled:opacity-50"
                  >
                    {isApplying ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        신청 처리 중...
                      </>
                    ) : lesson.openRun ? (
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" />
                        {countdown || '레슨 신청 하기'}
                      </div>
                    ) : lesson.price === 0 ? (
                      '즉시 시작 하기'
                    ) : (
                      '레슨 신청하기'
                    )}
                  </Button>
                )}
              </div>

              {/* 보장 정보 */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">
                    첫 수업 전 취소 시 100% 환불
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">안전한 결제 시스템</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
