document.addEventListener("DOMContentLoaded", () => {
  // 탭 기능
  const tabTriggers = document.querySelectorAll(".tab-trigger")
  const tabContents = document.querySelectorAll(".tab-content")

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab")

      // 모든 탭 비활성화
      tabTriggers.forEach((t) => t.classList.remove("active"))
      tabContents.forEach((c) => c.classList.remove("active"))

      // 선택된 탭 활성화
      this.classList.add("active")
      document.getElementById(targetTab).classList.add("active")
    })
  })

  // 버튼 클릭 이벤트
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-primary")) {
      if (e.target.textContent.includes("결제하기")) {
        alert("결제 페이지로 이동합니다.")
      }
    }

    if (e.target.classList.contains("btn-outline-red")) {
      if (e.target.textContent.includes("취소")) {
        if (confirm("레슨 신청을 취소하시겠습니까?")) {
          alert("레슨 신청이 취소되었습니다.")
        }
      } else if (e.target.textContent.includes("삭제")) {
        if (confirm("레슨을 삭제하시겠습니까?")) {
          alert("레슨이 삭제되었습니다.")
        }
      }
    }

    if (e.target.classList.contains("edit-btn")) {
      alert("프로필 수정 페이지로 이동합니다.")
    }
  })

  // 필터 변경 이벤트
  const filterSelect = document.querySelector(".filter-select")
  if (filterSelect) {
    filterSelect.addEventListener("change", function () {
      console.log("필터 변경:", this.value)
      // 여기에 필터링 로직 구현
    })
  }
})
