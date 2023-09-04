import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { refreshAccessToken } from '@/services/authService';

export function useRefreshAccessToken() {
  const authStore = useAuthStore();
  const router = useRouter();

  const isRefreshingToken = ref(false);

  const refreshAccessTokenIfNeeded = async () => {
    if (authStore.isAccessTokenExpired && !isRefreshingToken.value) {
      try {
        isRefreshingToken.value = true;

        // Refresh the access token using the refresh token
        const newAccessToken = await refreshAccessToken(import.meta.env.VITE_API_BASE_URL + '/api/auth/refresh', authStore.refreshToken);

        // Update the access token in the store
        authStore.login(newAccessToken);

        // Reset the isRefreshingToken flag
        isRefreshingToken.value = false;
      } catch (error) {
        // Handle the error (e.g., re-authenticate the user)
        authStore.logout();
        router.push('/login');
        isRefreshingToken.value = false;
      }
    }
  };

  return {
    isRefreshingToken,
    refreshAccessTokenIfNeeded,
  };
}
