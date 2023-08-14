
import axios from "axios";

async function fetchDashboard(token: string) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: import.meta.env.VITE_API_URL + "dashboard",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.request(config);
  return res.data;
}

export default { fetchDashboard };
