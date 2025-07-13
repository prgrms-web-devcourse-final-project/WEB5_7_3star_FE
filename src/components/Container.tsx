import React from 'react'
import clsx from 'clsx'

type ContainerProps = {
  size?: 'lg' | 'md' | 'sm'
  className?: string
  children: React.ReactNode
}

export default function Container({
  size = 'lg',
  className = '',
  children,
}: ContainerProps) {
  const sizeClass =
    size === 'lg' ? 'max-w-5xl' : size === 'md' ? 'max-w-3xl' : 'max-w-lg'

  return (
    <div className={clsx('mx-auto w-full px-4', sizeClass, className)}>
      {children}
    </div>
  )
}
