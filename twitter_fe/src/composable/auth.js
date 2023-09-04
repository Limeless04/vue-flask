// dataFetching.js (Separate file)
import axios from 'axios';


export function useRegisterUser() {
  const registerUser = async (url, requestData) => {
    try {
      const response = await axios.post(url, requestData, {
        headers: {
            'Content-Type': 'application/json',
          },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  return { registerUser };
}

export function useLoginUser() {
  axios.defaults.withCredentials = true;
  const loginUser = async (url, requestData) => {
    try {
        const response = await axios.post(url, requestData, {
          headers: {
              'Content-Type': 'application/json',
            },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    };
  
    return { loginUser };
  }

  export function useLogOutUser() {
    axios.defaults.withCredentials = true;
    const logOutUser = async (url, access_token) => {
      try {
          const response = await axios.post(url, null, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
              },
          });
          return response.data;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      };
    
      return { logOutUser };
    }
  
