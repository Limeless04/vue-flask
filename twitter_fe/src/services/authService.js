// services/authService.js

import axios from 'axios';

async function refreshAccessToken(url, refreshToken) {
  try {
    const response = await axios.post(url,null, {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
    });
    const newAccessToken = response.data.access_token;
    return newAccessToken;
  } catch (error) {
    // Handle the error (e.g., invalid refresh token, server error)
    throw error;
  }
}

export { refreshAccessToken };
