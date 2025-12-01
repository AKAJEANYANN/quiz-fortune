<template>
  <div class="page-container">
    <div class="card result-card text-center p-4">
      <div class="icon-container mb-3">
        <div class="failure-icon">
          <i class="bi bi-star"></i>
        </div>
      </div>

      <h3 class="mb-2">Dommage!</h3>
      <p class="text-muted mb-3 small">Ce n'était pas la bonne réponse</p>

      <div class="points-box p-3 mb-3">
        <div class="d-flex align-items-center justify-content-center gap-2 mb-1">
          <i class="bi bi-graph-up-arrow text-secondary"></i>
          <span class="text-muted x-small fw-semibold">Vous gagnez</span>
        </div>
        <div class="points-amount">10 pts</div>
      </div>

      <button @click="router.push('/coupons')" class="btn btn-primary w-100 py-2">
        Continuer
      </button>
    </div>

    <!-- Dots Background -->
    <div class="dots-container">
      <div v-for="n in 15" :key="n" class="dot" :style="getDotStyle(n)"></div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const { registerLoss } = useQuiz()

onMounted(() => {
  registerLoss()
  // Supprimer le coupon payé pour ce numéro spécifique
  const phone = localStorage.getItem('userPhone')
  if (phone) {
    localStorage.removeItem(`paidCouponId_${phone}`)
  }
})

const getDotStyle = (n) => {
  const left = Math.random() * 100 + '%';
  const top = Math.random() * 100 + '%';
  const size = Math.random() * 6 + 3 + 'px';
  
  return {
    left: left,
    top: top,
    width: size,
    height: size,
    opacity: Math.random() * 0.4 + 0.1
  }
}
</script>

<style scoped>
.result-card {
  max-width: 350px;
  width: 100%;
  position: relative;
  z-index: 10;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.failure-icon {
  width: 60px;
  height: 60px;
  background: #f8d7da;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  color: #dc3545;
  font-size: 2rem;
  border: 3px solid white;
  box-shadow: 0 0 0 3px #f8d7da;
}

.points-box {
  background: #e9ecef;
  border-radius: 10px;
  border: 1px solid #dee2e6;
}

.points-amount {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
  color: #212529;
}

.x-small {
  font-size: 0.75rem;
}

.dots-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.dot {
  position: absolute;
  border-radius: 50%;
  background-color: #0dcaf0;
}
</style>
