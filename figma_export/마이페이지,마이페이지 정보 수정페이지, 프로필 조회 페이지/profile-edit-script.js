document.addEventListener("DOMContentLoaded", () => {
  // 프로필 사진 업로드
  const photoUpload = document.getElementById("photo-upload")
  const profilePreview = document.getElementById("profilePreview")
  const photoOverlay = document.querySelector(".photo-overlay")

  if (photoUpload && profilePreview) {
    photoUpload.addEventListener("change", (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          profilePreview.src = e.target.result
        }
        reader.readAsDataURL(file)
      }
    })

    // 프로필 사진 클릭으로도 업로드 가능
    if (photoOverlay) {
      photoOverlay.addEventListener("click", () => {
        photoUpload.click()
      })
    }
  }

  // 비밀번호 표시/숨김 토글
  const passwordToggles = document.querySelectorAll(".password-toggle")
  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target")
      const targetInput = document.getElementById(targetId)
      const icon = this.querySelector("i")

      if (targetInput.type === "password") {
        targetInput.type = "text"
        icon.classList.remove("fa-eye")
        icon.classList.add("fa-eye-slash")
        this.classList.add("active")
      } else {
        targetInput.type = "password"
        icon.classList.remove("fa-eye-slash")
        icon.classList.add("fa-eye")
        this.classList.remove("active")
      }
    })
  })

  // 폼 유효성 검사
  const validateForm = () => {
    let isValid = true
    const nickname = document.getElementById("nickname")
    const email = document.getElementById("email")
    const newPassword = document.getElementById("newPassword")
    const confirmPassword = document.getElementById("confirmPassword")

    // 기존 에러 메시지 제거
    document.querySelectorAll(".error-message").forEach((msg) => msg.remove())
    document.querySelectorAll(".form-input").forEach((input) => {
      input.classList.remove("error", "success")
    })

    // 닉네임 검사
    if (nickname.value.trim().length < 2) {
      showError(nickname, "닉네임은 2자 이상 입력해주세요.")
      isValid = false
    } else {
      nickname.classList.add("success")
    }

    // 이메일 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
      showError(email, "올바른 이메일 형식을 입력해주세요.")
      isValid = false
    } else {
      email.classList.add("success")
    }

    // 새 비밀번호 검사 (입력된 경우에만)
    if (newPassword.value) {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
      if (!passwordRegex.test(newPassword.value)) {
        showError(newPassword, "비밀번호 요구사항을 확인해주세요.")
        isValid = false
      } else if (newPassword.value !== confirmPassword.value) {
        showError(confirmPassword, "비밀번호가 일치하지 않습니다.")
        isValid = false
      } else {
        newPassword.classList.add("success")
        confirmPassword.classList.add("success")
      }
    }

    return isValid
  }

  const showError = (input, message) => {
    input.classList.add("error")
    const errorDiv = document.createElement("div")
    errorDiv.className = "error-message"
    errorDiv.textContent = message
    input.parentNode.appendChild(errorDiv)
  }

  // 실시간 유효성 검사
  const inputs = document.querySelectorAll(".form-input, .form-textarea")
  inputs.forEach((input) => {
    input.addEventListener("blur", validateForm)
  })

  // 저장 버튼 클릭
  const saveButton = document.querySelector(".btn-primary")
  if (saveButton) {
    saveButton.addEventListener("click", function () {
      if (validateForm()) {
        // 로딩 상태 표시
        this.classList.add("loading")
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 저장 중...'

        // 실제로는 서버에 데이터 전송
        setTimeout(() => {
          this.classList.remove("loading")
          this.innerHTML = '<i class="fas fa-save"></i> 저장하기'
          alert("프로필이 성공적으로 수정되었습니다!")
        }, 2000)
      }
    })
  }

  // 취소 버튼 클릭
  const cancelButton = document.querySelector(".btn-outline")
  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      if (confirm("변경사항이 저장되지 않습니다. 정말 취소하시겠습니까?")) {
        window.history.back()
      }
    })
  }

  // 뒤로가기 버튼
  const backButton = document.querySelector(".back-btn")
  if (backButton) {
    backButton.addEventListener("click", () => {
      if (confirm("변경사항이 저장되지 않습니다. 정말 나가시겠습니까?")) {
        window.history.back()
      }
    })
  }

  // 기본 이미지로 변경 버튼
  const defaultImageButton = document.querySelector(".btn-outline")
  if (defaultImageButton && defaultImageButton.textContent.includes("기본 이미지")) {
    defaultImageButton.addEventListener("click", () => {
      profilePreview.src = "/placeholder.svg?height=120&width=120"
      photoUpload.value = ""
    })
  }
})
