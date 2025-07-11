'use client'

import SearchClient from './_components/SearchClient'

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">T</div>
            <span className="logo-text">TrainUs</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <SearchClient />
      </main>
    </div>
  )
}
