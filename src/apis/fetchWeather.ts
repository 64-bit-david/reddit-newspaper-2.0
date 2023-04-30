import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_AZURE_FUNC_URL,
  withCredentials: true,
});
