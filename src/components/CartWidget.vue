<script setup>
// imports
import { ref } from "vue";
import CartItem from "./CartItem.vue";
import { useCartStore } from "../stores/CartStore";
import { useAuthUserStore } from "@/stores/AuthUserStore";

const cartStore = useCartStore()
const AuthUserStore = useAuthUserStore()

// data
const showShoppingCart = ref(false);
const showLoginRegister = ref(false);

const showLoginRegisterBtn = () => {
 console.log(AuthUserStore.userData)
  showShoppingCart.value = false
  if(!AuthUserStore.userData.id) {
    showLoginRegister.value = true
  }
}
</script>
<template>
  <div class="relative">
    <!-- Icon that always shows -->
    <span class="cursor-pointer" @click="showShoppingCart = true">
      <fa icon="shopping-cart" size="lg" />
      <div class="cart-count absolute">{{ cartStore.count }}</div>
    </span>
    <AppModalOverlay :active="showShoppingCart" @close="showShoppingCart = false">
      <div v-if="!cartStore.isEmpty">
        <ul class="items-in-cart">
          <CartItem v-for="(items, name) in cartStore.grouped" :key="name" :product="items[0]"
            :count="cartStore.groupCount(name)" @updateCount="cartStore.setItemCount(items[0], $event)"
            @clear="cartStore.clearItem(name)" />
        </ul>
        <div class="flex justify-end text-2xl mb-5">
          Total: <strong>${{ cartStore.total }}</strong>
        </div>
        <div class="flex justify-end">
          <AppButton class="secondary mr-2" @click="cartStore.reset">Clear Cart</AppButton>
          <AppButton class="primary" @click="(showLoginRegisterBtn)">Checkout</AppButton>
        </div>
      </div>
      <div v-else><em>Cart is Empty</em></div>
    </AppModalOverlay>
    <AppModalOverlay :active="showLoginRegister" @close="showLoginRegister = false">
      <div class="text-center text-red-600">
        <div class="mb-4">
          <span>Please register or login</span>
        </div>
          
          <AppButton class="primary" @click="showLoginRegister = false">
            <RouterLink to="/auth">Login / Register</RouterLink>
          </AppButton>
    
      </div>
    </AppModalOverlay>
  </div>
</template>
<style scoped>
.items-in-cart{
  @apply mb-5;
}
.items-in-cart li{
  @apply flex justify-between p-2;
}
.items-in-cart li:nth-of-type(even){
  @apply bg-gray-300;
}
.fa-lg{
 color: hsla(160, 100%, 37%, 1) !important;
}
</style>
