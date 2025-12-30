<template>
  <div class="page-container">
    <div class="card payment-card text-center p-3">
      <div class="icon-container mb-2">
        <div class="payment-icon">
          <i class="bi bi-credit-card-2-front"></i>
        </div>
      </div>

      <h4 class="mb-1">Paiement Requis</h4>
      <p class="text-muted mb-2 x-small">Pour jouer ce coupon</p>

      <div class="amount-box p-2 mb-2">
        <div class="text-muted xx-small mb-1">Montant à payer</div>
        <div class="amount text-primary">{{ selectedCoupon?.price || 0 }} F CFA</div>
      </div>

      <div class="text-start mb-2">
        <label class="form-label fw-semibold x-small">Numéro Moov</label>
        <input 
          type="tel" 
          class="form-control form-control-sm" 
          placeholder="+241 XX XX XX XX"
          :value="phone"
        >
      </div>

      <div class="d-flex gap-2">
        <button @click="router.back()" class="btn btn-outline-secondary flex-grow-1 py-2">
          Annuler
        </button>
        <button @click="processPayment" class="btn btn-primary flex-grow-1 py-2" :disabled="processing">
          <span v-if="processing" class="spinner-border spinner-border-sm me-2"></span>
          {{ processing ? 'Traitement...' : 'Acheter le coupon' }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const { selectedCoupon } = useQuiz()
const processing = ref(false)
const phone = ref('')

onMounted(() => {
  phone.value = localStorage.getItem('userPhone') || ''
})

// Redirect if no coupon selected
if (!selectedCoupon.value) {
  router.push('/coupons')
}

const processPayment = () => {
  processing.value = true
  // Simulate payment delay
  setTimeout(() => {
    processing.value = false
    // Marquer le coupon comme payé pour ce numéro spécifique
    if (selectedCoupon.value && phone.value) {
      localStorage.setItem(`paidCouponId_${phone.value}`, selectedCoupon.value.id.toString())
    }
    router.push('/ready')
  }, 1500)
}
</script>

<style scoped>
.payment-card {
  max-width: 340px;
  width: 100%;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
}

.payment-icon {
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
}

.amount-box {
  background: rgba(0, 93, 167, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(0, 93, 167, 0.15);
}

.amount {
  font-size: 1.75rem;
  font-weight: 800;
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
