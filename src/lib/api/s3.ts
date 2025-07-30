// S3 Presigned URL 관련 API 함수들

/**
 * 파일 업로드용 Presigned URL 발급
 * @param filename 확장자 포함 파일 이름
 * @returns presigned URL과 key
 */
export const getUploadPresignedUrl = async (filename: string) => {
  try {
    console.log('=== getUploadPresignedUrl 시작 ===')
    console.log('요청 파일명:', filename)

    const requestUrl = '/api/proxy/api/v1/s3/posturl'
    const getUrl = `${requestUrl}?filename=${encodeURIComponent(filename)}`

    const response = await fetch(getUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    console.log('응답 상태:', response.status, response.statusText)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('API 에러 응답:', errorData)
      throw new Error(errorData.message || '업로드 URL 발급에 실패했습니다.')
    }

    const data = await response.json()
    console.log('=== getUploadPresignedUrl 완료 ===')
    return data.data
  } catch (error) {
    console.error('=== getUploadPresignedUrl 실패 ===')
    console.error(
      '에러 메시지:',
      error instanceof Error ? error.message : String(error),
    )
    throw error
  }
}

/**
 * 파일 조회용 Presigned URL 발급
 * @param key DB에 저장된 파일 경로
 * @returns presigned URL
 */
export const getDownloadPresignedUrl = async (key: string) => {
  try {
    const getUrl = `/api/proxy/api/v1/s3/geturl?key=${encodeURIComponent(key)}`

    const response = await fetch(getUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || '조회 URL 발급에 실패했습니다.')
    }

    const data = await response.json()
    return data.data.preSignedUrl
  } catch (error) {
    console.error('조회 presigned URL 발급 실패:', error)
    throw error
  }
}

/**
 * 파일을 S3에 프록시를 통해 업로드
 * @param presignedUrl 업로드용 presigned URL
 * @param file 업로드할 파일
 * @returns 업로드 성공 여부
 */
export const uploadFileToS3 = async (presignedUrl: string, file: File) => {
  try {
    // 프록시를 통한 S3 업로드

    const formData = new FormData()
    formData.append('file', file)
    formData.append('presignedUrl', presignedUrl)

    const response = await fetch('/api/proxy/api/v1/test/s3/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })

    if (!response.ok) {
      const errorText = await response
        .text()
        .catch(() => '응답 텍스트 읽기 실패')
      console.error('S3 업로드 에러 응답:', errorText)
      throw new Error(`S3 업로드에 실패했습니다. 상태: ${response.status}`)
    }

    const result = await response.text()
    console.log('S3 업로드 결과:', result)
    console.log('=== uploadFileToS3 완료 ===')
    return true
  } catch (error) {
    console.error('=== uploadFileToS3 실패 ===')
    console.error(
      '에러 메시지:',
      error instanceof Error ? error.message : String(error),
    )
    throw error
  }
}
