import axios from "axios";
import * as qs from "qs";

type FormTheme = {
  name: string;
  priority: number;
  wallpaperID: number;
  animationID: number;
};

const fetchThemes = async () => {
  const token = localStorage.getItem("token");
  let config = {
    method: "get",
    url: import.meta.env.VITE_API_URL + "themes",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.request(config);
  return res;
};

async function createTheme(theme: FormTheme) {
  const token = localStorage.getItem("token");

  const config = {
    method: "post",
    url: import.meta.env.VITE_API_URL + "themes",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: qs.stringify(theme),
  };
  const res = await axios.request(config);
  return res;
}
async function deleteTheme(id: number) {
  const token = localStorage.getItem("token");

  const config = {
    method: "delete",
    url: import.meta.env.VITE_API_URL + "themes",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    data: qs.stringify({ id: id }),
  };
  const res = await axios.request(config);
  return res;
}
async function updateTheme(id: number, theme: FormTheme) {
  const token = localStorage.getItem("token");

  const config = {
    method: "put",
    url: import.meta.env.VITE_API_URL + "themes/" + id,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: qs.stringify(theme),
  };
  const res = await axios.request(config);
  return res;
}
export default { fetchThemes, createTheme, updateTheme, deleteTheme };
