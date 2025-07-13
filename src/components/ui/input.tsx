import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'flex h-12 w-full rounded-xl border border-[#E3E8FF] bg-white px-4 py-3 text-base text-gray-900 shadow-sm transition placeholder:text-[#B0B8C1]',
      'focus:border-[#8BB5FF] focus-visible:ring-2 focus-visible:ring-[#8BB5FF]/30 focus-visible:outline-none',
      className,
    )}
    {...props}
  />
))
Input.displayName = 'Input'
export { Input }
