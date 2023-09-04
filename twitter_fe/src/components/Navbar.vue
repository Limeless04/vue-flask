<template>
    <header class="mt-5 font-bold border-b-2  pb-2 border-feldgrau">
    <div class="flex gap-5 h-10 items-center justify-around">
      <h1 class="bg-feldgrau p-3 text-white rounded-xl">Simple Twitter</h1>

      <NavbarVue class="flex gap-3 text-darkslategrey">
        <RouterLink to="/" exact active-class="active-link text-white rounded-xl px-3">Home</RouterLink>
        <RouterLink to="/leaderboad" exact active-class="active-link text-white rounded-xl px-3">Leaderboard</RouterLink>
        <RouterLink to="/login" exact active-class="active-link text-white rounded-xl px-3">Login</RouterLink>
        <a exact active-class="active-link text-white rounded-xl px-3" @click="tryLogout">Logout</a>
        <a :href="urlAdmin" exact active-class="active-link text-white rounded-xl px-3">Admin</a>
      </NavbarVue>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useLogOutUser } from '@/composable/auth'
import { useRefreshAccessToken } from '@/composable/refreshToken.js'; // Adjust the path accordingly
const { logOutUser } = useLogOutUser()
const { isRefreshingToken, refreshAccessTokenIfNeeded } = useRefreshAccessToken();

const urlAdmin = import.meta.env.VITE_API_BASE_URL + "/admin"
const authStore = useAuthStore();

const tryLogout = async () => {
  try {
    await refreshAccessTokenIfNeeded();
    await logOutUser(import.meta.env.VITE_API_BASE_URL + '/api/auth/logout', authStore.accessToken)
    authStore.logout()
  } catch (e) {
    console.error(e)
  }
}


</script>

<style>
.active-link {
    background: theme(colors.feldgrau);
}

</style>