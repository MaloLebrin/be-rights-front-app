<template>
<LandingHeroSection />
<LandingSolutionSection />
<LandingHowItWorksSection />
<LandingPricingSection />
<LandingNewsletterSection />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default-layout',
  isAuth: false,
  isAdmin: false,
})
</script>
