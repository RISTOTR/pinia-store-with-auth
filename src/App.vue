<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from "@/components/TheHeader.vue";
import { useAuthUserStore } from './stores/AuthUserStore'
import { onMounted } from 'vue';

const storeAuth = useAuthUserStore()

onMounted(() => {
  storeAuth.init()

})

</script>

<template>
   <TheHeader />

   <div class="container mx-auto px-4">
     <RouterView />

   </div>

</template>


