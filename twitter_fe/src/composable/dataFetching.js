// dataFetching.js (Separate file)
import axios from 'axios';
export function useDataFetching() {
  const fetchData = async (url, limit = 10) => {
    try {
      const response = await axios.get(url, { withCredentials: false, params:{limit} });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  return { fetchData };
}

export function usePostTweet() {
  const createTweet = async (url, requestData,accessToken) => {
    try {
      const response = await axios.post(url, requestData, { 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        },
        withCredentials: false });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  return { createTweet };
}

export function usePostTweetWithUpload() {
  const createTweetWithUpload = async (url, requestData,accessToken) => {
    try {
      const response = await axios.post(url, requestData, { 
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + accessToken
        },
        withCredentials: false });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  return { createTweetWithUpload };
}




