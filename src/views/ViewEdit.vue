<template>
  <div class="text-center">
    <h1>Your profile</h1>
    <div class="card auth-form">
      <div class="card-content">
        <div class="text-3xl mb-5">
            <img class="w-20 h-20 rounded-full" :src="AuthUserStore.userData.photoURL" alt="Rounded avatar">
        </div>
        <form @submit.prevent="onSubmit">
          <div class="text-left mb-4">
            <label class="">Email (unnmodifiable)</label>
            <div class="control">
              <input
             v-model="AuthUserStore.userData.email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              disabled
              >
            </div>
          </div>
          <div class="text-left mb-4">
            <label class="">Full Name</label>
            <div class="control">
              <input
             v-model="AuthUserStore.userData.displayName"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              >
              
            </div>
          </div>
          <div>
          <label 
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" 
          for="file_input"> Choose a profile picture
          </label>
          <input 
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
            type="file" ref="file" @change="uploadFile">
          </div>
          <div class="field is-grouped is-grouped-right mt-5">
            <p class="control">
              <button class="bg-green-500 border-2 border-green-500 text-white rounded mx-auto px-3">
              Submit
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthUserStore } from '@/stores/AuthUserStore';
import { ref } from 'vue';
const AuthUserStore = useAuthUserStore()

const file = ref()
const image = ref()

console.log(AuthUserStore.userData)

function uploadFile(e) {
  image.value = e.target.files[0];
    console.log(image.value);
  
}

const onSubmit = () => {
  // const file = files.value
    console.log(image.value)
  if(!AuthUserStore.userData.displayName) {
    alert('Please enter your full name')
  } else {
      AuthUserStore.editUser(AuthUserStore.userData.displayName, image.value)
    
  }
}
</script>

<style scoped>
h1{
  color: hsla(160, 100%, 37%, 1) !important;
  font-size: 26px;
  margin: 12px 0;
}
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
@media (min-width: 1024px) {
  .auth-form {
  width: 400px;
  }
}
</style>