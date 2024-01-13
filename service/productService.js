import axios from "axios";

const AuthProductService = {
  async getAllProduct() {
    const { data } = await axios.get("https://dummyjson.com/products");
    return data;
  },
  async getProductById(id) {
    const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
    return data;
  },
  async deleteProductById(id) {
    const { data } = await axios.delete(`https://dummyjson.com/products/${id}`);
    return data
  },
};
export default AuthProductService;
