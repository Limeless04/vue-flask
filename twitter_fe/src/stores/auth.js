import { defineStore } from 'pinia';
import Cookies from 'js-cookie'


export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        isAuthenticated: !!localStorage.getItem('accessToken'),
    }),
    getters: {
        // Add getters to check authentication status, user info, etc.
        isUserAuthenticated() {
            return !!this.accessToken;
        },
        isAccessTokenExpired(state) {
            if (!state.accessToken) {
                return true; // Token is considered expired if it doesn't exist
            }

            try {
                const tokenData = JSON.parse(atob(state.accessToken.split('.')[1])); // Corrected this line
                const currentTime = Math.floor(Date.now() / 1000); // Current timestamp in seconds
                // Check if the token has an expiration time (exp claim)
                if (tokenData && tokenData.exp) {
                    return tokenData.exp < currentTime;
                } else {
                    return true; // Token has no expiration time; consider it expired
                }
            } catch (error) {
                console.error('Error decoding access token:', error);
                return true; // Handle the error by considering the token expired
            }
        },
    },
    actions: {
        login(accessToken, refreshToken) {
            // Save tokens to local storage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            // Set the access token and update authentication status
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.isAuthenticated = true;
        },
        logout() {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            Cookies.remove('session')
            // Clear the access token and update authentication status
            this.accessToken = null;
            this.refreshToken = null;
            this.isAuthenticated = false;
        },
    },
});


