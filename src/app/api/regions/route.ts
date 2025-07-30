import { NextResponse } from 'next/server'
import { regionData } from '@/lib/region-data-static'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: regionData,
  })
}
