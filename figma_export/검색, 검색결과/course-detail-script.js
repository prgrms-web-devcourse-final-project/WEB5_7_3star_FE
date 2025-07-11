document.addEventListener("DOMContentLoaded", () => {
  // DOM 요소들
  const thumbnails = document.querySelectorAll(".thumbnail")
  const mainImage = document.getElementById("mainImage")
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabPanels = document.querySelectorAll(".tab-panel")
  const favoriteBtn = document.querySelector(".favorite-btn")
  const bookBtn = document.querySelector(".book-btn")
  const inquiryBtn = document.querySelector(".inquiry-btn")
  const startDateInput = document.getElementById("startDate")

  // 썸네일 이미지 클릭 이벤트
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // 모든 썸네일에서 active 클래스 제거
      thumbnails.forEach((t) => t.classList.remove("active"))
      // 클릭된 썸네일에 active 클래스 추가
      this.classList.add("active")
      // 메인 이미지 변경
      mainImage.src = this.src.replace("100", "600").replace("100", "400")
    })
  })

  // 탭 버튼 클릭 이벤트
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetTab = this.dataset.tab

      // 모든 탭 버튼에서 active 클래스 제거
      tabBtns.forEach((b) => b.classList.remove("active"))
      // 클릭된 탭 버튼에 active 클래스 추가
      this.classList.add("active")

      // 모든 탭 패널 숨기기
      tabPanels.forEach((panel) => panel.classList.remove("active"))
      // 해당 탭 패널 보이기
      document.getElementById(targetTab).classList.add("active")
    })
  })

  // 즐겨찾기 버튼 클릭 이벤트
  favoriteBtn.addEventListener("click", function () {
    this.classList.toggle("active")
    const icon = this.querySelector("i")
    if (this.classList.contains("active")) {
      icon.className = "fas fa-heart"
    } else {
      icon.className = "far fa-heart"
    }
  })

  // 예약 버튼 클릭 이벤트
  bookBtn.addEventListener("click", () => {
    const startDate = startDateInput.value
    if (!startDate) {
      alert("시작 날짜를 선택해주세요.")
      startDateInput.focus()
      return
    }

    // 예약 처리 로직
    alert("예약 페이지로 이동합니다.")
    // 실제로는 예약 페이지로 리다이렉트
    // window.location.href = '/booking';
  })

  // 문의 버튼 클릭 이벤트
  inquiryBtn.addEventListener("click", () => {
    alert("문의 페이지로 이동합니다.")
    // 실제로는 문의 페이지로 리다이렉트 또는 모달 열기
    // window.location.href = '/inquiry';
  })

  // 강사 프로필 버튼 클릭 이벤트
  const instructorProfileBtn = document.querySelector(".instructor-profile-btn")
  instructorProfileBtn.addEventListener("click", () => {
    alert("강사 프로필 페이지로 이동합니다.")
    // 실제로는 강사 프로필 페이지로 리다이렉트
    // window.location.href = '/instructor/profile';
  })

  // 시작 날짜 최소값 설정 (오늘 날짜)
  const today = new Date().toISOString().split("T")[0]
  startDateInput.min = today

  // Q&A 아코디언 기능 (선택사항)
  const qnaItems = document.querySelectorAll(".qna-item")
  qnaItems.forEach((item) => {
    const question = item.querySelector(".question")
    const answer = item.querySelector(".answer")

    question.addEventListener("click", () => {
      const isOpen = answer.style.display === "block"

      // 모든 답변 닫기
      qnaItems.forEach((qi) => {
        qi.querySelector(".answer").style.display = "none"
      })

      // 클릭된 항목만 토글
      if (!isOpen) {
        answer.style.display = "block"
      }
    })

    // 초기에는 모든 답변 숨기기
    answer.style.display = "none"
  })

  // 스크롤 시 사이드바 고정 효과 개선
  const sidebar = document.querySelector(".booking-sidebar")
  const main = document.querySelector(".course-main")

  function updateSidebarPosition() {
    const mainRect = main.getBoundingClientRect()
    const sidebarRect = sidebar.getBoundingClientRect()

    if (mainRect.bottom < sidebarRect.bottom) {
      sidebar.style.position = "absolute"
      sidebar.style.bottom = "0"
      sidebar.style.top = "auto"
    } else {
      sidebar.style.position = "sticky"
      sidebar.style.top = "2rem"
      sidebar.style.bottom = "auto"
    }
  }

  window.addEventListener("scroll", updateSidebarPosition)
  window.addEventListener("resize", updateSidebarPosition)
})
