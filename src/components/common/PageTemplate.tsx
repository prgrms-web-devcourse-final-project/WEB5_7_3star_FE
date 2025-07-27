'use client'

import { ReactNode } from 'react'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import Container from '@/components/Container'
import { Loader2 } from 'lucide-react'

interface PageTemplateProps {
  children: ReactNode
  requireAuth?: boolean
  loading?: boolean
  error?: string | null
  onRetry?: () => void
  title?: string
  subtitle?: string
  containerSize?: 'sm' | 'md' | 'lg'
}

function PageContent({
  children,
  loading,
  error,
  onRetry,
  title,
  subtitle,
  containerSize = 'lg',
}: Omit<PageTemplateProps, 'requireAuth'>) {
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Container size={containerSize} className="relative z-10">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
              <p className="text-gray-600">로딩 중...</p>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Container size={containerSize} className="relative z-10">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="mb-4 text-red-600">{error}</p>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  다시 시도
                </button>
              )}
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Container size={containerSize} className="relative z-10">
        {(title || subtitle) && (
          <div className="py-8 text-center">
            {title && (
              <h1 className="mb-4 text-3xl font-bold text-gray-900">{title}</h1>
            )}
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
        )}
        {children}
      </Container>
    </div>
  )
}

export default function PageTemplate({
  children,
  requireAuth = false,
  ...pageProps
}: PageTemplateProps) {
  const content = <PageContent {...pageProps}>{children}</PageContent>

  if (requireAuth) {
    return <ProtectedRoute>{content}</ProtectedRoute>
  }

  return content
}
