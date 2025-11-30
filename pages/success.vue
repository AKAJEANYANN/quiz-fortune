<template>
  <div class="page-container">
    <div class="card result-card text-center p-4">
      <div class="icon-container mb-3">
        <div class="success-icon">
          <i class="bi bi-trophy"></i>
        </div>
      </div>

      <h3 class="mb-2">Bravo!</h3>
      <p class="text-muted mb-3 small">Vous avez trouvé la bonne réponse!</p>

      <div class="prize-box p-3 mb-3">
        <div class="d-flex align-items-center justify-content-center gap-2 mb-1">
          <i class="bi bi-trophy text-primary"></i>
          <span class="text-muted x-small fw-semibold">Vous gagnez</span>
        </div>
        <div class="prize-amount text-primary">{{ selectedCoupon?.prize || 50 }} F CFA</div>
      </div>

      <button @click="router.push('/coupons')" class="btn btn-primary w-100 py-2">
        Continuer
      </button>
    </div>

    <!-- Confetti Background -->
    <div class="confetti-container">
      <div v-for="n in 20" :key="n" class="confetti" :style="getConfettiStyle(n)"></div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const { selectedCoupon, registerWin } = useQuiz()

onMounted(() => {
  if (selectedCoupon.value) {
    registerWin(selectedCoupon.value.prize)
  }
  // Supprimer le coupon payé pour permettre de choisir à nouveau
  localStorage.removeItem('paidCouponId')
})

const getConfettiStyle = (n) => {
  const colors = ['#005da7', '#EC6608', '#ffc107', '#dc3545']; // Updated with Moov colors
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const left = Math.random() * 100 + '%';
  const top = Math.random() * 100 + '%';
  const size = Math.random() * 8 + 4 + 'px';
  
  return {
    backgroundColor: randomColor,
    left: left,
    top: top,
    width: size,
    height: size,
    opacity: Math.random() * 0.6 + 0.2
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

.success-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(0, 93, 167, 0.1) 0%, rgba(0, 93, 167, 0.2) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  color: var(--primary-color);
  font-size: 2rem;
  border: 3px solid white;
  box-shadow: 0 0 0 3px rgba(0, 93, 167, 0.1);
}

.prize-box {
  background: rgba(0, 93, 167, 0.08);
  border-radius: 10px;
  border: 1px solid rgba(0, 93, 167, 0.15);
}

.prize-amount {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
}

.x-small {
  font-size: 0.75rem;
}

.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.confetti {
  position: absolute;
  border-radius: 50%;
}
</style>
