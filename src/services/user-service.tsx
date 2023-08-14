import axios from "axios";
import * as qs from 'qs'
const config_header = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/x-www-form-urlencoded",
};

async function login(username: string, password: string) {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: import.meta.env.VITE_API_URL + "auth/login",
    headers: config_header,
    data: qs.stringify({ userID: username, userKey: password }),
  };

  const res = await axios.request(config);
  const data = await res.data;
  return data;
}
function logout() {
  localStorage.removeItem("token");
}

function isLoggedIn() {
  const token = localStorage.getItem("token");
  return !!token;
}
export default {
  login,
  logout,
  isLoggedIn,
};
