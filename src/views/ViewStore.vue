<template>
  <div class="my-5 flex justify-end">
    <AppButton @click="cartStore.undo">UNDO</AppButton>
    <AppButton class="ml-2" @click="cartStore.redo">REDO</AppButton>
  </div>
  <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
    <ProductCard v-for="product in productStore.products" :key="product.name" :product="product"
      @addToCart="cartStore.addItems($event, product)" />
  </ul>
</template>

<script setup>
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "../stores/ProductStore";
import { useCartStore } from "../stores/CartStore";


const productStore = useProductStore()
const cartStore = useCartStore()

productStore.fill()

</script>

<style scoped></style>