<template>
  <div class="page-container flex-column">
    <div class="header-section text-center mb-2">
      <div class="welcome-banner bg-white p-2 rounded-3 shadow-sm mb-2 mx-auto" style="max-width: 700px; width: 100%">
        <div class="d-flex justify-content-between align-items-start w-100">
          <div class="text-start flex-grow-1">
            <div class="d-flex align-items-center gap-1 mb-0">
              <span class="welcome-text">Bienvenue</span>
              <ClientOnly>
                <span class="phone-number">{{ formattedPhone }}</span>
              </ClientOnly>
            </div>
          </div>
          <div class="stats-container d-flex gap-2 align-items-center">
            <div class="stat-item">
              <div class="text-muted xx-small"><i class="bi bi-trophy"></i></div>
              <div class="fw-semibold text-primary xx-small">{{ totalEarnings }}</div>
            </div>
            <div class="stat-item">
              <div class="text-muted xx-small"><i class="bi bi-star"></i></div>
              <div class="fw-semibold text-info xx-small">{{ totalPoints }}</div>
            </div>
            <div class="stat-item">
              <div class="text-muted xx-small"><i class="bi bi-controller"></i></div>
              <div class="fw-semibold xx-small">{{ gamesPlayed }}</div>
            </div>
            <div class="settings-icon">
              <i class="bi bi-gear-fill"></i>
            </div>
          </div>
        </div>
      </div>
      
      <h5 class="mb-2 small">Choisissez Votre Coupon!</h5>
    </div>

    <div class="row g-4 justify-content-center w-100" style="max-width: 1000px">
      <div v-for="coupon in coupons" :key="coupon.id" class="col-md-4">
        <div 
          class="card coupon-card h-100 text-center p-2" 
          :class="{ 'coupon-disabled': isCouponDisabled(coupon.id), 'coupon-paid': paidCouponId === coupon.id }"
          @click="selectAndPlay(coupon)"
        >
          <!-- Badge pour le coupon payé -->
          <div v-if="paidCouponId === coupon.id" class="paid-badge">
            <i class="bi bi-check-circle-fill"></i> Payé
          </div>
          
          <div class="coupon-price mb-1">
            {{ coupon.price }}<span class="currency">F CFA</span>
          </div>
          
          <div class="prize-box mb-2">
            <div class="xx-small prize-label">Prix si correct</div>
            <div class="prize-amount">{{ coupon.prize }} F CFA</div>
          </div>

          <button 
            class="btn btn-light w-100 fw-semibold py-1 small"
            :disabled="isCouponDisabled(coupon.id)"
          >
            {{ paidCouponId === coupon.id ? 'Commencer' : 'Jouer' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const { coupons, selectCoupon, totalEarnings, totalPoints, gamesPlayed } = useQuiz()

// Utiliser ref pour rendre le numéro de téléphone réactif
const phone = ref('')
const paidCouponId = ref(null)

// Accéder à localStorage uniquement côté client
onMounted(() => {
  phone.value = localStorage.getItem('userPhone') || ''
  if (phone.value) {
    const storedPaidCouponId = localStorage.getItem(`paidCouponId_${phone.value}`)
    if (storedPaidCouponId) {
      paidCouponId.value = parseInt(storedPaidCouponId)
    }
  }
})

// Fonction pour formater le numéro de téléphone
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return ''
  
  // Supprimer tous les espaces et caractères non numériques sauf le +
  const cleaned = phoneNumber.replace(/[^\d+]/g, '')
  
  // Si le numéro commence par +225 (Côte d'Ivoire)
  if (cleaned.startsWith('+225')) {
    const number = cleaned.substring(4) // Enlever +225
    // Format: +225 07 XX XX XX XX
    if (number.length === 10) {
      return `+225 ${number.substring(0, 2)} ${number.substring(2, 4)} ${number.substring(4, 6)} ${number.substring(6, 8)} ${number.substring(8, 10)}`
    }
  }
  
  // Si le numéro commence par 225 (sans +)
  if (cleaned.startsWith('225') && cleaned.length === 13) {
    const number = cleaned.substring(3)
    return `+225 ${number.substring(0, 2)} ${number.substring(2, 4)} ${number.substring(4, 6)} ${number.substring(6, 8)} ${number.substring(8, 10)}`
  }
  
  // Si le numéro est local (10 chiffres)
  if (cleaned.length === 10 && !cleaned.startsWith('+')) {
    return `${cleaned.substring(0, 2)} ${cleaned.substring(2, 4)} ${cleaned.substring(4, 6)} ${cleaned.substring(6, 8)} ${cleaned.substring(8, 10)}`
  }
  
  // Retourner le numéro tel quel si aucun format ne correspond
  return phoneNumber
}

const formattedPhone = computed(() => formatPhoneNumber(phone.value))

// Vérifier si un coupon est désactivé
const isCouponDisabled = (couponId) => {
  // Si un coupon a été payé, désactiver tous les autres
  return paidCouponId.value !== null && paidCouponId.value !== couponId
}

const selectAndPlay = (coupon) => {
  // Si ce coupon a déjà été payé, aller directement à ready
  if (paidCouponId.value === coupon.id) {
    selectCoupon(coupon)
    router.push('/ready')
  } 
  // Sinon, aller à la page de paiement normalement
  else if (!isCouponDisabled(coupon.id)) {
    selectCoupon(coupon)
    router.push('/payment')
  }
}
</script>

<style scoped>
.coupon-card {
  background: var(--primary-color);
  color: white;
  transition: transform 0.3s ease;
  border: none;
  position: relative;
  cursor: pointer;
}

.coupon-card:hover {
  transform: translateY(-10px);
}

/* Coupon désactivé */
.coupon-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.coupon-disabled:hover {
  transform: none;
}

.coupon-disabled button {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Coupon payé */
.coupon-paid {
  border: 3px solid var(--secondary-color);
  box-shadow: 0 0 20px rgba(236, 102, 8, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(236, 102, 8, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(236, 102, 8, 0.6);
  }
}

/* Badge payé */
.paid-badge {
  position: absolute;
  top: 3px;
  right: 4px;
  background: var(--success-color);
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.5rem;
  font-weight: 700;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 4px;
  border: 2px solid white;
}

.coupon-price {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
}

.coupon-price .currency {
  font-size: 0.85rem;
  vertical-align: super;
  opacity: 0.8;
}

.prize-box {
  background: white;
  border-radius: 8px;
  padding: 8px;
}

.prize-label {
  color: var(--primary-color);
}

.prize-amount {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--secondary-color);
}

.x-small {
  font-size: 0.75rem;
}

.xx-small {
  font-size: 0.7rem;
}

.phone-number {
  font-size: 0.5rem;
  font-weight: 500;
  white-space: nowrap;
}

.welcome-text {
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}

.stats-container {
  flex-shrink: 0;
}

.stat-item {
  text-align: center;
  min-width: 35px;
}

.settings-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--primary-color);
  font-size: 1.1rem;
  transition: all 0.3s ease;
  padding: 4px;
  flex-shrink: 0;
}

.settings-icon:hover {
  color: var(--secondary-color);
  transform: rotate(90deg);
}

/* Responsive pour mobile */
@media (max-width: 576px) {
  .welcome-banner {
    padding: 0.75rem !important;
  }
  
  .phone-number {
    font-size: 0.5rem;
  }
  
  .welcome-text {
    font-size: 0.75rem;
  }
  
  .stats-container {
    gap: 0.5rem !important;
  }
  
  .stat-item {
    min-width: 30px;
  }
  
  .xx-small {
    font-size: 0.6rem;
  }
  
  .settings-icon {
    font-size: 1rem;
    padding: 2px;
  }

  .coupon-card .btn {
    display: none;
  }
}

.btn-light {
  color: var(--primary-color);
  background: white;
  border: none;
}

.btn-light:hover {
  background: var(--secondary-color);
  color: white;
}
</style>
