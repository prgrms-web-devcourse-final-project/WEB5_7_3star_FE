import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ProfileEditClient from './_components/ProfileEditClient'

export default function ProfileEditPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link
            href="/profile"
            className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>뒤로가기</span>
          </Link>
          <div className="logo">
            <div className="logo-icon">T</div>
            <span className="logo-text">TrainUs</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <ProfileEditClient />
      </main>
    </div>
  )
}
