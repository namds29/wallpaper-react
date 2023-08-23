import axios from "axios";

type Wallpaper = {
  name: string;
  category: number;
  priceType: any;
  price: number;
  priorityNewest: number;
  priorityCategory: number;
  priorityTrending: number;
  author: string;
  website: string;
  tag: string;
  type: number;
  avatar: File[];
  file: any;
};
async function fetchWallpaper(
  token: string,
  page: number,
  per_page: number,
  keyword?: string,
  category_id?: number,
  content_type?: number,
  sort_field?: string,
  sort_order?: number
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
      ...(keyword && {keyword: keyword}),
      ...(content_type && {content_type: content_type}),
      ...(sort_field && {sort_field: sort_field}),
      ...(sort_order && {sort_order: sort_order}),
    },
  };

  const res = await axios.request(config);
  return res.data;
}
async function deleteWallpaper(id: number) {
  const token = localStorage.getItem('token')
  let config = {
    method: "delete",
    url: import.meta.env.VITE_API_URL + "wallpapers/"+ id,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.request(config);
  return res;
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
  formData.append("type", wallpaper.type.toString());
  for (let i = 0; i < wallpaper.file.length; i++) {
    formData.append('contentFile', wallpaper.file[i]);
  }

  for (let i = 0; i < wallpaper.avatar.length; i++) {
    formData.append("avatar", wallpaper.avatar[i]);
  }


  let config = {
    method: "post",
    url: import.meta.env.VITE_API_URL + "wallpapers",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  };

  const res = await axios.request(config);

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
  for (let i = 0; i < wallpaper.file.length; i++) {
    formData.append("contentFile", wallpaper.file[i]);
  }

  for (let i = 0; i < wallpaper.avatar.length; i++) {
    formData.append("avatar", wallpaper.avatar[i]);
  }

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

export default { fetchWallpaper, createWallpaper, updateWallpaper,deleteWallpaper };
