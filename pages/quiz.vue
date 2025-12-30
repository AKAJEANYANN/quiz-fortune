<template>
  <div class="page-container flex-column">
    <div class="header-section text-center mb-2">
      <div class="quiz-header bg-white p-2 rounded-3 shadow-sm d-flex justify-content-between align-items-center mb-2 mx-auto" style="max-width: 700px; width: 100%">
        <div class="timer-container">
          <div class="timer-circle">
            <span class="timer-text" :class="{ 'text-danger': timeLeft <= 3 }">{{ timeLeft }}</span>
            <svg class="timer-svg" viewBox="0 0 100 100">
              <circle class="timer-bg" cx="50" cy="50" r="45"></circle>
              <circle 
                class="timer-progress" 
                cx="50" cy="50" r="45"
                :style="{ strokeDashoffset: progressOffset }"
              ></circle>
            </svg>
          </div>
        </div>

        <div class="flex-grow-1" style="min-width: 3rem;"></div>

        <div class="prize-badge bg-white px-2 py-1 rounded-pill shadow-sm fw-semibold x-small">
          {{ selectedCoupon?.price || 0 }}<span class="text-primary"> F CFA</span>
        </div>
      </div>
    </div>

    <div class="card quiz-card w-100 p-3">
      <h5 class="text-center mb-3 fw-bold">Quelle est la capitale de la France?</h5>

      <div class="options-list d-flex flex-column gap-2">
        <button 
          v-for="(option, index) in options" 
          :key="index"
          @click="selectOption(option)"
          class="option-btn btn text-start p-2 d-flex align-items-center"
          :class="{ 'selected': selectedOption === option }"
        >
          <span class="option-letter me-2">{{ getLetter(index) }}</span>
          <span class="option-text small">{{ option }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const { selectedCoupon } = useQuiz()

// Redirect if no coupon selected
if (!selectedCoupon.value) {
  router.push('/coupons')
}

const timeLeft = ref(3)
const totalTime = 3
const options = ['Paris', 'Londres', 'Berlin']
const correctAnswer = 'Paris'
const selectedOption = ref(null)
let timerInterval

const progressOffset = computed(() => {
  const circumference = 2 * Math.PI * 45
  return circumference - (timeLeft.value / totalTime) * circumference
})

const getLetter = (index) => {
  return String.fromCharCode(65 + index) // A, B, C...
}

const selectOption = (option) => {
  if (selectedOption.value) return // Prevent multiple selections
  
  selectedOption.value = option
  clearInterval(timerInterval)
  
  setTimeout(() => {
    if (option === correctAnswer) {
      router.push('/success')
    } else {
      router.push('/failure')
    }
  }, 1000)
}

onMounted(() => {
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timerInterval)
      router.push('/failure') // Time out = failure
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timerInterval)
})
</script>

<style scoped>
.quiz-card {
  max-width: 550px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.05);
}

.timer-container {
  position: relative;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timer-circle {
  position: relative;
  width: 100%;
  height: 100%;
}

.timer-svg {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
}

.timer-bg {
  fill: none;
  stroke: #f0f0f0;
  stroke-width: 6;
}

.timer-progress {
  fill: none;
  stroke: #dc3545;
  stroke-width: 6;
  stroke-dasharray: 283;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1s linear;
  stroke-linecap: round;
}

.timer-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: 800;
  color: #dc3545;
}

.option-btn {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.option-btn:hover {
  background: #f8f9fa;
  border-color: #dee2e6;
  transform: translateX(3px);
}

.option-btn.selected {
  background: rgba(0, 93, 167, 0.08);
  border-color: var(--primary-color);
  color: var(--primary-color);
  font-weight: 600;
}

.option-letter {
  width: 28px;
  height: 28px;
  background: rgba(0, 93, 167, 0.1);
  color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.option-btn.selected .option-letter {
  background: var(--primary-color);
  color: white;
}

.x-small {
  font-size: 0.75rem;
}
</style>
