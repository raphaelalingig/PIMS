// api_url.js
import axios from "axios";

// Update BASE_URL to use HTTPS
const BASE_URL = "https://pims-production.up.railway.app/api";
export const BASE_FRONTEND_URL = "https://pims-production.up.railway.app";

const api_url = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api_url;