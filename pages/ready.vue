<template>
  <div class="page-container">
    <div class="card ready-card text-center p-3">
      <div class="icon-container mb-2">
        <div class="ready-icon">
          <i class="bi bi-trophy"></i>
        </div>
      </div>

      <h4 class="mb-1">Êtes-vous prêt?</h4>
      <p class="text-muted mb-2 x-small">Préparez-vous pour le défi!</p>

      <div class="coupon-summary p-2 mb-2">
        <div class="d-flex align-items-center justify-content-center gap-1 mb-1">
          <i class="bi bi-bullseye text-primary small"></i>
          <span class="fw-semibold x-small">Votre coupon</span>
        </div>
        <div class="prize text-primary mb-1">{{ selectedCoupon?.price || 0 }} F CFA</div>
        <div class="xx-small text-muted">Gagnez {{ selectedCoupon?.prize || 0 }} F CFA si vous répondez correctement!</div>
      </div>

      <div class="row g-2 mb-2">
        <div class="col-4">
          <div class="stat-box p-2 border rounded-2 h-100 d-flex flex-column justify-content-center">
            <i class="bi bi-lightning-fill text-info small mb-0"></i>
            <div class="xx-small fw-semibold">3s</div>
          </div>
        </div>
        <div class="col-4">
          <div class="stat-box p-2 border rounded-2 h-100 d-flex flex-column justify-content-center">
            <i class="bi bi-bullseye text-info small mb-0"></i>
            <div class="xx-small fw-semibold">3 rép.</div>
          </div>
        </div>
        <div class="col-4">
          <div class="stat-box p-2 border rounded-2 h-100 d-flex flex-column justify-content-center">
            <i class="bi bi-trophy text-info small mb-0"></i>
            <div class="xx-small fw-semibold">1 chance</div>
          </div>
        </div>
      </div>

      <div class="d-flex gap-2">
        <button @click="router.push('/coupons')" class="btn btn-outline-secondary flex-grow-1 py-2 small">
          Annuler
        </button>
        <button @click="router.push('/quiz')" class="btn btn-primary flex-grow-1 py-2 small">
          C'est Parti! 🚀
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
</script>

<style scoped>
.ready-card {
  max-width: 340px;
  width: 100%;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
}

.ready-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, rgba(0, 93, 167, 0.1) 0%, rgba(0, 93, 167, 0.2) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  color: var(--primary-color);
  font-size: 1.5rem;
  border: 2px solid white;
  box-shadow: 0 0 0 2px rgba(0, 93, 167, 0.1);
}

.coupon-summary {
  background: rgba(0, 93, 167, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(0, 93, 167, 0.15);
}

.prize {
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1;
}

.x-small {
  font-size: 0.75rem;
}

.xx-small {
  font-size: 0.7rem;
}

.btn-outline-secondary {
  border-radius: var(--btn-radius);
  font-weight: 600;
}
</style>
