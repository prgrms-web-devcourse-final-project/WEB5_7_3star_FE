document.addEventListener("DOMContentLoaded", () => {
  // DOM 요소들
  const currentFilters = document.getElementById("currentFilters")
  const keywordFilter = document.getElementById("keywordFilter")
  const sortSelect = document.getElementById("sortSelect")
  const viewBtns = document.querySelectorAll(".view-btn")
  const resultsContainer = document.getElementById("resultsContainer")
  const favoriteButtons = document.querySelectorAll(".favorite-btn")
  const resetFilters = document.getElementById("resetFilters")

  // 현재 필터 상태
  let activeFilters = {
    keyword: "",
    categories: [],
    prices: [],
    regions: [],
  }

  // URL 파라미터에서 초기 필터 설정
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get("keyword")) {
    activeFilters.keyword = urlParams.get("keyword")
    keywordFilter.value = activeFilters.keyword
  }

  // 초기 필터 표시 업데이트
  updateCurrentFilters()

  // 키워드 검색 이벤트
  keywordFilter.addEventListener("input", function () {
    activeFilters.keyword = this.value
    updateCurrentFilters()
    filterResults()
  })

  // 체크박스 필터 이벤트
  const categoryCheckboxes = document.querySelectorAll('input[name="category"]')
  const priceCheckboxes = document.querySelectorAll('input[name="price"]')
  const regionCheckboxes = document.querySelectorAll('input[name="region"]')

  categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        activeFilters.categories.push(this.value)
      } else {
        activeFilters.categories = activeFilters.categories.filter((cat) => cat !== this.value)
      }
      updateCurrentFilters()
      filterResults()
    })
  })

  priceCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        activeFilters.prices.push(this.value)
      } else {
        activeFilters.prices = activeFilters.prices.filter((price) => price !== this.value)
      }
      updateCurrentFilters()
      filterResults()
    })
  })

  regionCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        activeFilters.regions.push(this.value)
      } else {
        activeFilters.regions = activeFilters.regions.filter((region) => region !== this.value)
      }
      updateCurrentFilters()
      filterResults()
    })
  })

  // 정렬 변경 이벤트
  sortSelect.addEventListener("change", function () {
    sortResults(this.value)
  })

  // 뷰 변경 이벤트
  viewBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      viewBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      const view = this.dataset.view
      if (view === "list") {
        resultsContainer.classList.add("list-view")
      } else {
        resultsContainer.classList.remove("list-view")
      }
    })
  })

  // 즐겨찾기 버튼 이벤트
  favoriteButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      this.classList.toggle("active")
      const icon = this.querySelector("i")
      if (this.classList.contains("active")) {
        icon.className = "fas fa-heart"
      } else {
        icon.className = "far fa-heart"
      }
    })
  })

  // 필터 초기화
  resetFilters.addEventListener("click", () => {
    activeFilters = {
      keyword: "",
      categories: [],
      prices: [],
      regions: [],
    }

    keywordFilter.value = ""
    categoryCheckboxes.forEach((cb) => (cb.checked = false))
    priceCheckboxes.forEach((cb) => (cb.checked = false))
    regionCheckboxes.forEach((cb) => (cb.checked = false))

    updateCurrentFilters()
    filterResults()
  })

  // 현재 필터 표시 업데이트
  function updateCurrentFilters() {
    currentFilters.innerHTML = ""

    // 키워드 필터
    if (activeFilters.keyword) {
      addFilterTag("키워드", activeFilters.keyword, () => {
        activeFilters.keyword = ""
        keywordFilter.value = ""
        updateCurrentFilters()
        filterResults()
      })
    }

    // 카테고리 필터
    activeFilters.categories.forEach((category) => {
      addFilterTag("카테고리", category, () => {
        activeFilters.categories = activeFilters.categories.filter((cat) => cat !== category)
        document.querySelector(`input[name="category"][value="${category}"]`).checked = false
        updateCurrentFilters()
        filterResults()
      })
    })

    // 가격 필터
    activeFilters.prices.forEach((price) => {
      const priceText = getPriceText(price)
      addFilterTag("가격", priceText, () => {
        activeFilters.prices = activeFilters.prices.filter((p) => p !== price)
        document.querySelector(`input[name="price"][value="${price}"]`).checked = false
        updateCurrentFilters()
        filterResults()
      })
    })

    // 지역 필터
    activeFilters.regions.forEach((region) => {
      addFilterTag("지역", region, () => {
        activeFilters.regions = activeFilters.regions.filter((r) => r !== region)
        document.querySelector(`input[name="region"][value="${region}"]`).checked = false
        updateCurrentFilters()
        filterResults()
      })
    })
  }

  // 필터 태그 추가
  function addFilterTag(type, value, removeCallback) {
    const tag = document.createElement("div")
    tag.className = "filter-tag"
    tag.innerHTML = `
            <span>${type}: ${value}</span>
            <button type="button">
                <i class="fas fa-times"></i>
            </button>
        `
    tag.querySelector("button").addEventListener("click", removeCallback)
    currentFilters.appendChild(tag)
  }

  // 가격 텍스트 변환
  function getPriceText(priceRange) {
    const priceTexts = {
      "0-30000": "3만원 이하",
      "30000-50000": "3-5만원",
      "50000-100000": "5-10만원",
      "100000+": "10만원 이상",
    }
    return priceTexts[priceRange] || priceRange
  }

  // 결과 필터링
  function filterResults() {
    // 실제 구현에서는 서버 API 호출
    console.log("필터링 조건:", activeFilters)
    // 여기서는 시뮬레이션만
  }

  // 결과 정렬
  function sortResults(sortBy) {
    console.log("정렬 기준:", sortBy)
    // 실제 구현에서는 결과 재정렬
  }

  // 페이지네이션 이벤트
  const pageButtons = document.querySelectorAll(".page-btn")
  pageButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (this.classList.contains("prev") || this.classList.contains("next")) {
        // 이전/다음 페이지 로직
        return
      }

      pageButtons.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      // 페이지 로드 로직
      console.log("페이지 변경:", this.textContent)
    })
  })
})
