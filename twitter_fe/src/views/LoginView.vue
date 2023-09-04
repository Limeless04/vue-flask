<template>
   <main class="mt-7 text-feldgrau font-semibold mx-52">
    <p class="space-x-10 text-4xl">{{ props.pageName }}</p>
    <Form @Submit.prevent class="mb-4">
      <div class="flex flex-col">
        <label for="username" class="mt-3">Username</label>
        <input type="text" id="username" class="bg-gray-50 h-10 focus:border-b-4 border-feldgrau focus:outline-none " v-model="user.username">
      </div>
      <div class="flex flex-col">
        <label for="password" class="mt-3">Password</label>
        <input type="password" id="password" class="bg-gray-50 h-10 focus:border-b-4 border-feldgrau focus:outline-none " v-model="user.password">
      </div>
      <button class="bg-feldgrau text-white p-2 rounded-lg mt-3 px-10 mr-3 hover:bg-white hover:text-feldgrau hover:border-2 hover:border-feldgrau" type="submit" @click="tryLogin">Submit</button>
    </Form>
    <RouterLink to="/register" class="underline mt-10 hover:text-tropicalindigo">Daftar Sekarang!</RouterLink>
  </main>
</template>

<script setup>
import {reactive } from 'vue'
import Form from '@/components/Form.vue';
import { defineProps  } from 'vue';
import { RouterLink, useRouter } from 'vue-router'
import { useLoginUser } from '@/composable/auth.js'
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// After receiving the access token from your API
// authStore.login(accessToken);



const props = defineProps({
    pageName: String
})

const user = reactive({
  username:"",
  password:""
})

const { loginUser } = useLoginUser()
const router = useRouter()
const tryLogin = async () => {
  try {
    const result = await loginUser(import.meta.env.VITE_API_BASE_URL + '/api/auth/login', user)
    console.log(result)
    // console.log(result.access_token)
    // console.log(result.refresh_token)
    if (result.success) {
      authStore.login(result.access_token, result.refresh_token);
      router.push({ name: 'home' });
    }
  } catch (e) {
    console.error(e)
  }
}


</script>