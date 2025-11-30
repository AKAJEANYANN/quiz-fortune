<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Optimiser le préchargement des ressources
useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    }
  ]
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

:root {
  /* Moov Africa Colors */
  --primary-color: #005da7; /* Specific Moov Blue */
  --primary-dark: #004a85;
  --secondary-color: #EC6608; /* Specific Moov Orange */
  --secondary-dark: #c4550f;
  
  --success-color: #198754;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #0dcaf0;
  --light-bg: #f0f4f8;
  --card-radius: 24px;
  --btn-radius: 12px;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.12);
  --font-main: 'Outfit', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #__nuxt {
  height: 100%;
  overflow: hidden;
}

body {
  font-family: var(--font-main);
  background: var(--light-bg);
  color: #212529;
}

.btn {
  border-radius: var(--btn-radius);
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--primary-color); /* Lighter blue from design */
  border: none;
  border-radius: var(--btn-radius);
  padding: 12px 24px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(91, 164, 252, 0.3);
}

.btn-primary:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(var(--secondary-color), 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}

.card {
  border: none;
  border-radius: var(--card-radius);
  background: white;
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.form-control {
  border-radius: var(--btn-radius);
  padding: 14px 18px;
  border: 2px solid #e9ecef;
  background-color: #f8f9fa;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #5ba4fc;
  background-color: white;
  box-shadow: 0 0 0 4px rgba(91, 164, 252, 0.1);
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  color: #1a1a1a;
}

/* Utility for centering */
.page-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
</style>