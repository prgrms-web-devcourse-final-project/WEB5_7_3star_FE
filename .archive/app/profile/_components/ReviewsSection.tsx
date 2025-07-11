'use client'

import { Star } from 'lucide-react'

interface Review {
  id: number
  name: string
  rating: number
  content: string
  date: string
  lesson: string
}

interface ReviewsSectionProps {
  reviews: Review[]
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="service-card">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100">
          <Star className="h-4 w-4 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">리뷰</h2>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-lg border border-gray-200 p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{review.name}</span>
                <div className="flex items-center gap-1">
                  {renderStars(review.rating)}
                </div>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <p className="mb-2 text-gray-700">{review.content}</p>
            <span className="text-sm text-gray-500">{review.lesson}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
