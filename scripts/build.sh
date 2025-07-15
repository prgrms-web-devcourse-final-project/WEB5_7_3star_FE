#!/bin/bash

# 환경 변수 설정
export NODE_ENV=production

# 린트 검사 실행
echo "🔍 린트 검사 중..."
npm run lint

# 타입 체크 실행
echo "🔍 타입 체크 중..."
npm run type-check

# 빌드 실행
echo "🏗️ 빌드 중..."
npm run build

echo "✅ 빌드 완료!" 