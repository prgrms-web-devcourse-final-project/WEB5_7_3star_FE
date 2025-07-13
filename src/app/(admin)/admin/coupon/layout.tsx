import Container from '@/components/Container'
import React from 'react'

export default function CouponAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Container size="lg">{children}</Container>
}
