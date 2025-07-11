document.addEventListener("DOMContentLoaded", () => {
  // DOM 요소들
  const searchForm = document.getElementById("searchForm")
  const regionCount = document.getElementById("regionCount")
  const selectedRegions = document.getElementById("selectedRegions")
  const regionTags = document.getElementById("regionTags")

  // 선택된 지역 배열
  let selectedRegionsList = []
  const maxRegions = 3

  // 지역 트리 이벤트 처리
  const provinceButtons = document.querySelectorAll(".province-btn")
  const cityButtons = document.querySelectorAll(".city-btn")
  const districtButtons = document.querySelectorAll(".district-btn")

  // 시/도 버튼 클릭 이벤트
  provinceButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const province = this.dataset.province
      const cityList = document.querySelector(`[data-province="${province}"]`)
      const icon = this.querySelector(".province-icon")

      if (cityList.style.display === "none") {
        // 다른 모든 시/도 닫기
        document.querySelectorAll(".city-list").forEach((list) => {
          list.style.display = "none"
        })
        document.querySelectorAll(".province-icon").forEach((ic) => {
          ic.classList.remove("expanded")
        })

        // 현재 시/도 열기
        cityList.style.display = "block"
        icon.classList.add("expanded")
      } else {
        cityList.style.display = "none"
        icon.classList.remove("expanded")
      }
    })
  })

  // 시/군/구 버튼 클릭 이벤트
  cityButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const city = this.dataset.city
      const districtList = document.querySelector(`[data-city="${city}"]`)
      const icon = this.querySelector(".city-icon")

      if (districtList.style.display === "none") {
        // 다른 모든 구/군 닫기
        document.querySelectorAll(".district-list").forEach((list) => {
          list.style.display = "none"
        })
        document.querySelectorAll(".city-icon").forEach((ic) => {
          ic.classList.remove("expanded")
        })

        // 현재 구/군 열기
        districtList.style.display = "block"
        icon.classList.add("expanded")
      } else {
        districtList.style.display = "none"
        icon.classList.remove("expanded")
      }
    })
  })

  // 세부 지역 버튼 클릭 이벤트
  districtButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const regionData = this.dataset.region
      const regionText = this.textContent.trim()

      if (this.classList.contains("selected")) {
        // 선택 해제
        removeRegion(regionData)
        this.classList.remove("selected")
      } else {
        // 선택 추가
        if (selectedRegionsList.length < maxRegions) {
          addRegion(regionData, regionText)
          this.classList.add("selected")
        } else {
          alert(`지역은 최대 ${maxRegions}개까지 선택 가능합니다.`)
        }
      }
    })
  })

  // 지역 추가 함수
  function addRegion(regionData, regionText) {
    if (!selectedRegionsList.find((region) => region.data === regionData)) {
      selectedRegionsList.push({
        data: regionData,
        text: regionText,
      })
      updateRegionDisplay()
    }
  }

  // 지역 제거 함수
  function removeRegion(regionData) {
    selectedRegionsList = selectedRegionsList.filter((region) => region.data !== regionData)
    updateRegionDisplay()

    // 버튼 선택 상태 해제
    const button = document.querySelector(`[data-region="${regionData}"]`)
    if (button) {
      button.classList.remove("selected")
    }
  }

  // 지역 표시 업데이트
  function updateRegionDisplay() {
    regionCount.textContent = selectedRegionsList.length

    if (selectedRegionsList.length > 0) {
      selectedRegions.style.display = "block"
      regionTags.innerHTML = ""

      selectedRegionsList.forEach((region) => {
        const tag = document.createElement("div")
        tag.className = "region-tag"
        tag.innerHTML = `
                    <span>${region.text}</span>
                    <button type="button" class="region-remove" onclick="removeRegionByData('${region.data}')">
                        <i class="fas fa-times"></i>
                    </button>
                `
        regionTags.appendChild(tag)
      })
    } else {
      selectedRegions.style.display = "none"
    }
  }

  // 전역 함수로 지역 제거
  window.removeRegionByData = (regionData) => {
    removeRegion(regionData)
  }

  // 폼 제출 이벤트
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = {
      keyword: document.getElementById("keyword").value,
      regions: selectedRegionsList,
      category: document.getElementById("category").value,
      sortBy: document.getElementById("sortBy").value,
    }

    console.log("검색 조건:", formData)

    // 검색 결과 페이지로 이동
    const params = new URLSearchParams()
    if (formData.keyword) params.append("keyword", formData.keyword)
    if (formData.category !== "전체") params.append("category", formData.category)
    params.append("sortBy", formData.sortBy)

    formData.regions.forEach((region, index) => {
      params.append(`region_${index}`, region.data)
    })

    window.location.href = `search-results-new.html?${params.toString()}`
  })

  // 키워드 입력 시 엔터키 처리
  document.getElementById("keyword").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      searchForm.dispatchEvent(new Event("submit"))
    }
  })

  // 초기화
  updateRegionDisplay()
})
