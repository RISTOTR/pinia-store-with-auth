<template>
  <div class="auth py-4">
    <div class="tabs mb-6">
      <ul class="flex justify-center gap-3">
        <li 
        :class="{ 'is-active' : !register}"
        >
          <a @click.prevent="register = false" class="text-xl">Login</a>
        </li>
        <li
        :class="{ 'is-active' : register}"
        >
          <a @click.prevent="register = true" class="text-xl">Register</a>
        </li>

      </ul>
    </div>
    <div class="card auth-form">
      <div class="card-content">
        <div class="text-3xl mb-5">
          {{ formTitle }}
        </div>
        <form @submit.prevent="onSubmit">
          <div class="text-left mb-4">
            <label class="">Email</label>
            <div class="control">
              <input
              v-model="credentials.email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email" 
              placeholder="e.g. alexsmith@gmail.com">
            </div>
          </div>
          <div class="text-left mb-4">
              <label class="label">Password</label>
              <div class="control">
                <input 
                v-model="credentials.password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password" 
                placeholder="Enter a password...">
              </div>
          </div>
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="bg-green-500 border-2 border-green-500 text-white rounded mx-auto px-3">
              {{ formTitle }}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { useAuthUserStore } from '@/stores/AuthUserStore';

const storeAuth = useAuthUserStore()

const register = ref(false)

const formTitle = computed(() => {
  return register.value ? 'Register' : 'Login'
})

const onSubmit = () => {
  if(!credentials.email || !credentials.password) {
    alert('Please enter en email and a password')
  } else {
    if(register.value) {
      storeAuth.registerUser(credentials)
    } else {
      storeAuth.loginUser(credentials)
    }
  }
}

const credentials = reactive({
  email: '',
  password: ''
})

</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
.tabs ul {
    align-items: center;
    border-bottom-color: #dbdbdb;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
}
.tabs li.is-active a {
    border-bottom-color: #485fc7;
    color: #485fc7;
}
.tabs a {
    align-items: center;
    border-bottom-color: #dbdbdb;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    color: #4a4a4a;
    display: flex;
    justify-content: center;
    margin-bottom: -1px;
    padding: 0.5em 1em;
    vertical-align: top;
}
@media (min-width: 1024px) {
  .auth-form {
  width: 400px;
  }
}
</style>