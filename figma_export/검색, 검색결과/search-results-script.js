// DOM 요소들
const filterBtn = document.getElementById("filterBtn")
const filterModal = document.getElementById("filterModal")
const modalOverlay = document.getElementById("modalOverlay")
const modalClose = document.getElementById("modalClose")
const sortSelect = document.getElementById("sortSelect")
const priceMinSlider = document.getElementById("priceMin")
const priceMaxSlider = document.getElementById("priceMax")
const priceMinDisplay = document.getElementById("priceMinDisplay")
const priceMaxDisplay = document.getElementById("priceMaxDisplay")

// 필터 모달 열기/닫기
function openFilterModal() {
  filterModal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeFilterModal() {
  filterModal.classList.remove("active")
  document.body.style.overflow = "auto"
}

// 가격 슬라이더 업데이트
function updatePriceDisplay() {
  const minValue = Number.parseInt(priceMinSlider.value)
  const maxValue = Number.parseInt(priceMaxSlider.value)

  // 최소값이 최대값보다 크면 조정
  if (minValue > maxValue) {
    priceMinSlider.value = maxValue
  }
  if (maxValue < minValue) {
    priceMaxSlider.value = minValue
  }

  priceMinDisplay.textContent = Number.parseInt(priceMinSlider.value).toLocaleString() + "원"
  priceMaxDisplay.textContent = Number.parseInt(priceMaxSlider.value).toLocaleString() + "원"
}

// 좋아요 토글
function toggleLike(button) {
  button.classList.toggle("liked")

  // 애니메이션 효과
  const heart = button.querySelector("i")
  heart.style.transform = "scale(1.3)"
  setTimeout(() => {
    heart.style.transform = "scale(1)"
  }, 200)
}

// 레슨 카드 클릭 (상세 페이지로 이동)
function goToLessonDetail(lessonId) {
  // 실제로는 레슨 ID에 따라 다른 페이지로 이동
  if (lessonId === "yoga") {
    window.location.href = "course-detail.html"
  } else {
    window.location.href = "lesson-detail.html"
  }
}

// 참여하기 버튼
function joinLesson(event, lessonTitle) {
  event.stopPropagation() // 카드 클릭 이벤트 방지

  const confirmMessage = `"${lessonTitle}"에 참여하시겠습니까?`
  if (confirm(confirmMessage)) {
    alert("참여 신청이 완료되었습니다!\n강사가 곧 연락드릴 예정입니다.")
  }
}

// 필터 태그 제거
function removeFilter(filterElement) {
  filterElement.remove()
  // 실제로는 검색 결과 재조회
  console.log("필터 제거됨")
}

// 정렬 변경
function changeSortOrder() {
  const sortValue = sortSelect.value
  console.log("정렬 기준 변경:", sortValue)
  // 실제로는 검색 결과 재정렬
}

// 페이지네이션
function changePage(pageNumber) {
  // 모든 페이지 버튼에서 active 클래스 제거
  document.querySelectorAll(".page-number").forEach((btn) => {
    btn.classList.remove("active")
  })

  // 클릭된 페이지 버튼에 active 클래스 추가
  event.target.classList.add("active")

  // 실제로는 해당 페이지 데이터 로드
  console.log("페이지 변경:", pageNumber)

  // 페이지 상단으로 스크롤
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// 이벤트 리스너 등록
document.addEventListener("DOMContentLoaded", () => {
  // 필터 모달 관련
  filterBtn.addEventListener("click", openFilterModal)
  modalClose.addEventListener("click", closeFilterModal)
  modalOverlay.addEventListener("click", closeFilterModal)

  // ESC 키로 모달 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && filterModal.classList.contains("active")) {
      closeFilterModal()
    }
  })

  // 가격 슬라이더
  priceMinSlider.addEventListener("input", updatePriceDisplay)
  priceMaxSlider.addEventListener("input", updatePriceDisplay)

  // 정렬 선택
  sortSelect.addEventListener("change", changeSortOrder)

  // 좋아요 버튼들
  document.querySelectorAll(".card-like").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation()
      toggleLike(btn)
    })
  })

  // 레슨 카드 클릭
  document.querySelectorAll(".lesson-card").forEach((card, index) => {
    card.addEventListener("click", () => {
      // 요가 클래스는 코스 상세 페이지로, 나머지는 레슨 상세 페이지로
      const lessonId = index === 1 ? "yoga" : "lesson"
      goToLessonDetail(lessonId)
    })
  })

  // 참여하기 버튼들
  document.querySelectorAll(".join-btn").forEach((btn, index) => {
    const lessonTitles = [
      "초보자를 위한 수영 레슨 - 기초부터 차근차근",
      "프리미엄 요가 클래스 - 몸과 마음의 균형",
      "코어 강화 필라테스 - 건강한 몸매 만들기",
      "주말 테니스 클래스 - 기초부터 실전까지",
      "골프 입문 클래스 - 스윙의 기초 마스터",
      "개인 맞춤 헬스 트레이닝 - 체형 교정",
    ]

    btn.addEventListener("click", (e) => {
      joinLesson(e, lessonTitles[index])
    })
  })

  // 필터 태그 제거 버튼들
  document.querySelectorAll(".filter-remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation()
      removeFilter(btn.closest(".filter-tag"))
    })
  })

  // 페이지네이션 버튼들
  document.querySelectorAll(".page-number").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      changePage(index + 1)
    })
  })

  // 모달 내 버튼들
  document.querySelector(".reset-btn").addEventListener("click", () => {
    // 모든 필터 초기화
    document.querySelectorAll('.modal-body input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false
    })
    priceMinSlider.value = 0
    priceMaxSlider.value = 500000
    updatePriceDisplay()
  })

  document.querySelector(".apply-btn").addEventListener("click", () => {
    // 필터 적용
    console.log("필터 적용")
    closeFilterModal()
    // 실제로는 필터된 검색 결과 로드
  })

  // 초기 가격 표시 업데이트
  updatePriceDisplay()
})

// 무한 스크롤 (선택사항)
let isLoading = false

function loadMoreResults() {
  if (isLoading) return

  isLoading = true
  console.log("추가 결과 로딩...")

  // 실제로는 API 호출하여 추가 데이터 로드
  setTimeout(() => {
    isLoading = false
    console.log("추가 결과 로딩 완료")
  }, 1000)
}

// 스크롤 이벤트 (무한 스크롤)
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    loadMoreResults()
  }
})

// 검색 결과 애니메이션 (Intersection Observer)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// 레슨 카드들 관찰
document.querySelectorAll(".lesson-card").forEach((card, index) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(20px)"
  card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
  observer.observe(card)
})
