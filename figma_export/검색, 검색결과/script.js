document.addEventListener("DOMContentLoaded", () => {
  // DOM 요소들
  const form = document.getElementById("lessonForm")
  const uploadArea = document.getElementById("uploadArea")
  const photoUpload = document.getElementById("photoUpload")
  const photoPreview = document.getElementById("photoPreview")
  const previewImg = document.getElementById("previewImg")

  // 미리보기 요소들
  const previewTitle = document.getElementById("previewTitle")
  const previewCategory = document.getElementById("previewCategory")
  const previewPrice = document.getElementById("previewPrice")
  const previewLocation = document.getElementById("previewLocation")
  const previewSchedule = document.getElementById("previewSchedule")

  // 지역 데이터
  const regionData = {
    서울특별시: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
    부산광역시: [
      "강서구",
      "금정구",
      "남구",
      "동구",
      "동래구",
      "부산진구",
      "북구",
      "사상구",
      "사하구",
      "서구",
      "수영구",
      "연제구",
      "영도구",
      "중구",
      "해운대구",
      "기장군",
    ],
    대구광역시: ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"],
    인천광역시: ["계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "중구", "강화군", "옹진군"],
    광주광역시: ["광산구", "남구", "동구", "북구", "서구"],
    대전광역시: ["대덕구", "동구", "서구", "유성구", "중구"],
    울산광역시: ["남구", "동구", "북구", "중구", "울주군"],
    경기도: [
      "수원시",
      "성남시",
      "안양시",
      "안산시",
      "용인시",
      "광명시",
      "평택시",
      "과천시",
      "오산시",
      "시흥시",
      "군포시",
      "의왕시",
      "하남시",
      "이천시",
      "안성시",
      "김포시",
      "화성시",
      "광주시",
      "양주시",
      "포천시",
      "여주시",
      "연천군",
      "가평군",
      "양평군",
    ],
  }

  // 업로드된 파일들
  const uploadedFiles = []

  // 지역 선택 이벤트
  const regionSelect = document.getElementById("region")
  const districtSelect = document.getElementById("district")

  regionSelect.addEventListener("change", function () {
    const selectedRegion = this.value
    districtSelect.innerHTML = '<option value="">구/군을 선택하세요</option>'

    if (selectedRegion && regionData[selectedRegion]) {
      regionData[selectedRegion].forEach((district) => {
        const option = document.createElement("option")
        option.value = district
        option.textContent = district
        districtSelect.appendChild(option)
      })
    }
    updatePreview()
  })

  // 드래그 앤 드롭 이벤트
  uploadArea.addEventListener("dragover", function (e) {
    e.preventDefault()
    this.classList.add("dragover")
  })

  uploadArea.addEventListener("dragleave", function (e) {
    e.preventDefault()
    this.classList.remove("dragover")
  })

  uploadArea.addEventListener("drop", function (e) {
    e.preventDefault()
    this.classList.remove("dragover")
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  })

  // 파일 선택 이벤트
  photoUpload.addEventListener("change", (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  })

  // 파일 처리 함수
  function handleFiles(files) {
    files.forEach((file) => {
      if (file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024) {
        uploadedFiles.push(file)
        displayPhoto(file)
      } else {
        alert("이미지 파일만 업로드 가능하며, 파일 크기는 5MB 이하여야 합니다.")
      }
    })

    if (uploadedFiles.length > 0) {
      updateMainPreviewImage()
    }
  }

  // 사진 표시 함수
  function displayPhoto(file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const photoItem = document.createElement("div")
      photoItem.className = "photo-item"
      photoItem.innerHTML = `
                <img src="${e.target.result}" alt="업로드된 사진">
                <button type="button" class="photo-remove" onclick="removePhoto(this)">
                    <i class="fas fa-times"></i>
                </button>
            `
      photoPreview.appendChild(photoItem)
    }
    reader.readAsDataURL(file)
  }

  // 사진 제거 함수
  window.removePhoto = (button) => {
    const photoItem = button.parentElement
    const index = Array.from(photoPreview.children).indexOf(photoItem)
    uploadedFiles.splice(index, 1)
    photoItem.remove()

    if (uploadedFiles.length > 0) {
      updateMainPreviewImage()
    } else {
      previewImg.src = "/placeholder.svg?height=200&width=300"
    }
  }

  // 메인 미리보기 이미지 업데이트
  function updateMainPreviewImage() {
    if (uploadedFiles.length > 0) {
      const reader = new FileReader()
      reader.onload = (e) => {
        previewImg.src = e.target.result
      }
      reader.readAsDataURL(uploadedFiles[0])
    }
  }

  // 실시간 미리보기 업데이트
  function updatePreview() {
    const title = document.getElementById("lessonTitle").value || "레슨 제목을 입력하세요"
    const category = document.getElementById("category").value || "카테고리"
    const price = document.getElementById("price").value
    const region = document.getElementById("region").value
    const district = document.getElementById("district").value
    const startDate = document.getElementById("startDate").value
    const time = document.getElementById("time").value
    const duration = document.getElementById("duration").value

    previewTitle.textContent = title
    previewCategory.textContent = category

    if (price) {
      previewPrice.textContent = `${Number.parseInt(price).toLocaleString()}원`
    } else {
      previewPrice.textContent = "가격 정보"
    }

    if (region && district) {
      previewLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${region} ${district}`
    } else {
      previewLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> 위치 정보`
    }

    if (startDate && time && duration) {
      const date = new Date(startDate)
      const dateStr = date.toLocaleDateString("ko-KR")
      previewSchedule.innerHTML = `<i class="fas fa-clock"></i> ${dateStr} ${time} (${duration}분)`
    } else {
      previewSchedule.innerHTML = `<i class="fas fa-clock"></i> 일정 정보`
    }
  }

  // 폼 입력 이벤트 리스너
  const formInputs = form.querySelectorAll("input, select, textarea")
  formInputs.forEach((input) => {
    input.addEventListener("input", updatePreview)
    input.addEventListener("change", updatePreview)
  })

  // 폼 제출 이벤트
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    // 폼 데이터 수집
    const formData = new FormData(form)

    // 업로드된 파일들 추가
    uploadedFiles.forEach((file, index) => {
      formData.append(`photo_${index}`, file)
    })

    // 여기서 서버로 데이터 전송
    console.log("레슨 등록 데이터:", Object.fromEntries(formData))
    alert("레슨이 성공적으로 등록되었습니다!")
  })

  // 전체 미리보기 버튼
  document.querySelector(".preview-btn").addEventListener("click", () => {
    // 전체 미리보기 모달 또는 새 페이지로 이동
    alert("전체 미리보기 기능은 추후 구현 예정입니다.")
  })

  // 초기 미리보기 업데이트
  updatePreview()
})
