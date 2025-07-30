import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'
import { getCurrentUser, getCurrentUserId } from '@/lib/api/common'

export interface UserInfo {
  id: string | null
  email: string | null
  nickname: string | null
  isAuthenticated: boolean
}

export const useUserInfo = () => {
  const { user: authUser, isAuthenticated } = useAuth()
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: null,
    email: null,
    nickname: null,
    isAuthenticated: false,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getUserInfo = () => {
      let user = null
      let userId = null

      // useAuth에서 먼저 확인
      if (authUser?.userId) {
        user = authUser
        userId = authUser.userId.toString()
      } else {
        // 로컬 스토리지에서 확인
        user = getCurrentUser()
        userId = getCurrentUserId()
      }

      setUserInfo({
        id: userId,
        email: user?.email || null,
        nickname: user?.nickname || null,
        isAuthenticated: isAuthenticated && !!userId,
      })

      setIsLoading(false)
    }

    // 약간의 딜레이를 두어 useAuth가 초기화될 시간을 줌
    const timer = setTimeout(getUserInfo, 100)

    return () => clearTimeout(timer)
  }, [authUser, isAuthenticated])

  return {
    userInfo,
    isLoading,
    isAuthenticated: userInfo.isAuthenticated,
    userId: userInfo.id,
  }
}
