import axios from "axios";

type Wallpaper = {
  name: string;
  category: number;
  priceType: number;
  price: number;
  priorityNewest: number;
  priorityCategory: number;
  priorityTrending: number;
  author: string;
  website: string;
  tag: string;
  contentType: number;
  avatar: File[];
  file: File[];
};
async function fetchWallpaper(
  token: string,
  page: number,
  per_page: number,
  category_id?: number
) {
  let config = {
    method: "get",
    url: import.meta.env.VITE_API_URL + "wallpapers",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page,
      per_page: per_page,
      ...(category_id && { category_id: category_id }),
    },
  };

  const res = await axios.request(config);
  return res.data;
}

const createWallpaper = async (wallpaper: Wallpaper) => {
  const token = localStorage.getItem("token") ?? "";
  const formData = new FormData();

  formData.append("name", wallpaper.name);
  formData.append("category", wallpaper.category.toString());
  formData.append("priceType", wallpaper.priceType.toString());
  formData.append("price", wallpaper.price.toString());
  formData.append("priorityNewest", wallpaper.priorityNewest.toString());
  formData.append("priorityCategory", wallpaper.priorityCategory.toString());
  formData.append("priorityTrending", wallpaper.priorityTrending.toString());
  formData.append("author", wallpaper.author);
  formData.append("website", wallpaper.website);
  const tags = wallpaper.tag;
  formData.append("tag", tags);
  formData.append("type", "1");
  formData.append("contentFile", wallpaper.file[0]);
  formData.append("avatar", wallpaper.avatar[0]);

  let config = {
    method: "post",
    url: import.meta.env.VITE_API_URL + "wallpapers",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  };

  const res = await axios.request(config);
  console.log(res);
  return res;
};
const updateWallpaper = async (
  token: string,
  wallpaper: Wallpaper,
  id: number
) => {
  const formData = new FormData();

  formData.append("name", wallpaper.name);
  formData.append("category", wallpaper.category.toString());
  formData.append("priceType", wallpaper.priceType.toString());
  formData.append("price", wallpaper.price.toString());
  formData.append("priorityNewest", wallpaper.priorityNewest.toString());
  formData.append("priorityCategory", wallpaper.priorityCategory.toString());
  formData.append("priorityTrending", wallpaper.priorityTrending.toString());
  formData.append("author", wallpaper.author);
  formData.append("website", wallpaper.website);
  const tags = wallpaper.tag;
  formData.append("tag", tags);
  formData.append("type", "1");
  formData.append("contentFile", wallpaper.file[0]);
  formData.append("avatar", wallpaper.avatar[0]);

  let config = {
    method: "put",
    url: import.meta.env.VITE_API_URL + "wallpapers/" + id,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  };
  const res = await axios.request(config);
  return res;
};

export default { fetchWallpaper, createWallpaper, updateWallpaper };
