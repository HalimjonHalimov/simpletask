import { getItems } from '@/helper/localstorage';
import axios from 'axios'

const AuthService = {
  async getAuth(data) {
    const response = await axios.post("https://dummyjson.com/auth/login", data);
    return response.data
  },
  async getCurrentUser(){
    const token = getItems("token");
    const {data} = await axios.get("https://dummyjson.com/auth/me", {headers: {
      Authorization: `Bearer ${token}`
    }});
    return data
  }
};
export default AuthService