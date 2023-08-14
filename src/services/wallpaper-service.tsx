import axios from "axios";
import * as qs from "qs";

type CreateWallpaper = {
  id?: number;
  name: string;
  contentType: number;
  priority: number;
  avatar: File[];
  contentFile: File[];
};

const fetchWallpapers = async () => {
  const token = localStorage.getItem("token");
  let config = {
    method: "get",
    url: import.meta.env.VITE_API_URL + "wallpapers",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.request(config);
  return res;
};
async function createWallpaper(wallpaper: CreateWallpaper) {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("avatar", wallpaper.avatar[0]);
  formData.append("contentFile", wallpaper.contentFile[0]);
  formData.append("name", wallpaper.name);
  formData.append("contentType", wallpaper.contentType.toString());
  formData.append("priority", wallpaper.priority.toString());
  const config = {
    method: "post",
    url: import.meta.env.VITE_API_URL + "wallpapers",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  };
  const res = await axios.request(config);
  return res;
}

const deleteWallpapers = async (id: number) => {
  const token = localStorage.getItem("token");
  let config = {
    method: "delete",
    url: import.meta.env.VITE_API_URL + "wallpapers",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    data: qs.stringify({ id: id }),
  };
  const res = await axios.request(config);
  return res;
};
const getDetailWallpapers = async (id: number) => {
  const token = localStorage.getItem("token");
  let config = {
    method: "get",

    url: import.meta.env.VITE_API_URL + "wallpapers/" + id,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.request(config);
  return res.data;
};

const fetchListWallpapers = async () => {
  const token = localStorage.getItem("token");
  let config = {
    method: "get",
    url: import.meta.env.VITE_API_URL + "wallpapers/list",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.request(config);
  return res.data;
};

export default {
  fetchWallpapers,
  fetchListWallpapers,
  getDetailWallpapers,
  createWallpaper,
  deleteWallpapers,
};
