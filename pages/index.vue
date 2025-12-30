<template>
  <div class="page-container login-page">
    <div class="card login-card text-center p-3">
      <div class="icon-container mb-2">
        <div class="trophy-icon">
          <i class="bi bi-trophy-fill"></i>
        </div>
      </div>

      
      <h3 class="mb-1">MEGA GAME</h3>
      <p class="text-muted mb-2 x-small">Plus vous jouez et Plus vous gagnez!</p>

      <div class="text-start mb-2">
        <label class="form-label fw-semibold x-small">Numéro de téléphone</label>
        <input 
          v-model="phone" 
          type="tel" 
          class="form-control form-control-sm" 
          placeholder="+241 XX XX XX XX"
        >
      </div>

      <button @click="handleLogin" class="btn btn-primary w-100 py-2 mb-2 small">
        Se Connecter
      </button>

      <p class="text-muted xx-small mb-0">
        Répondez correctement pour gagner 10x le prix du coupon!
      </p>
    </div>

    <!-- Background decorative elements -->
    <div class="bg-decoration">
      <div class="coin coin-1"></div>
      <div class="coin coin-2"></div>
      <div class="coin coin-3"></div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const { setUserPhone } = useQuiz()
const phone = ref('')

const handleLogin = () => {
  if (phone.value.length > 5) {
    setUserPhone(phone.value)
    router.push('/coupons')
    localStorage.setItem('userPhone', phone.value)
  } else {
    alert('Veuillez entrer un numéro valide')
  }
}
</script>

<style scoped>
.login-page {
  position: relative;
  overflow: hidden;
}

.login-card {
  max-width: 320px;
  width: 100%;
  position: relative;
  z-index: 10;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
}

.trophy-icon {
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

.x-small {
  font-size: 0.75rem;
}

.xx-small {
  font-size: 0.7rem;
}

/* Decorative background coins with Moov colors */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.coin {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
}

.coin-1 { 
  top: 10%; 
  left: 10%; 
  width: 40px; 
  height: 40px;
  background: var(--secondary-color);
}

.coin-2 { 
  bottom: 20%; 
  right: 15%; 
  width: 60px; 
  height: 60px;
  background: var(--primary-color);
}

.coin-3 { 
  top: 40%; 
  right: 5%; 
  width: 30px; 
  height: 30px;
  background: var(--secondary-color);
}
</style>
