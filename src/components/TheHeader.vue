<script setup>
import { useAuthUserStore } from '../stores/AuthUserStore';
import CartWidget from './CartWidget.vue';
import {onMounted, isProxy, toRaw} from 'vue'

const storeAuth = useAuthUserStore()


const logout= () => {
  storeAuth.logOutUser()
}

const editUser= () => {
  storeAuth.logOutUser()
}

let name = storeAuth.user


</script>

<template>
  <header class="flex justify-between px-6 py-4 items-center">
    <RouterLink to="/" class="text-4xl font-bold piniaHome">Pineapple Store</RouterLink>

  
  
  

    <div>
      <div class="relative group inline-block">
      <button class="flex flex-row items-center w-full px-4 py-4 mt-2 text-base font-bold text-left uppercase bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 focus:outline-none font-montserrat">
        <fa class="" icon="user" size="lg" />
      </button>
      <div class="absolute z-10 hidden bg-grey-200 group-hover:block">
          
          <div class="px-2 pt-2 pb-4 bg-white bg-gray-200 shadow-lg">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
             <div v-if="!storeAuth.user.id">
              <RouterLink to="/auth">Login</RouterLink>
            </div>
            <div v-else>
              <RouterLink to="/edit">
                <span class="text-left">Edit Perfile</span>
              </RouterLink>
              <div
                v-if="storeAuth.user.id"
                @click="logout" 
                class="text-black logout">Logout</div>
            </div>
            </div>
          </div>
      </div>
  </div>  
 

      <CartWidget class="inline-block" />
    </div>
  </header>
</template>

<style scoped>
.piniaHome {
  color: hsla(160, 100%, 37%, 1) !important;
}
header {
  border-bottom: 1px solid #42b883;
}
.fa-lg{
 color: hsla(160, 100%, 37%, 1) !important;
}
.grid {
  min-width: 200px
}
.logout{
  cursor: pointer;
}
</style>