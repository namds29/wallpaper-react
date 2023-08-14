import axios from "axios";
import * as qs from "qs";

type CreateAnimation = {
  id?: number;
  name: string;
  contentType: number;
  priority: number;
  avatar: File[];
  contentFile: File[];
};
type UpdateAnimation = {
  id?: number;
  name?: string;
  priority?: number;
  avatar?: File[];
  contentFile?: File[];
};

const fetchAnimations = async () => {
  const token = localStorage.getItem("token");
  let config = {
    method: "get",
    url: import.meta.env.VITE_API_URL + "animations",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.request(config);
  return res;
};
const fetchListAnimations = async () => {
  const token = localStorage.getItem("token");
  let config = {
    method: "get",
    url: import.meta.env.VITE_API_URL + "animations/list",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.request(config);
  return res.data;
};

async function createAnimation(animation: CreateAnimation) {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("avatar", animation.avatar[0]);
  formData.append("contentFile", animation.contentFile[0]);
  formData.append("name", animation.name);
  formData.append("contentType", animation.contentType.toString());
  formData.append("priority", animation.priority.toString());
  const config = {
    method: "post",
    url: import.meta.env.VITE_API_URL + "animations",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  };
  const res = await axios.request(config);
  return res;
}
async function updateAnimation(
  animationId: number,
  animation: UpdateAnimation
) {
  const token = localStorage.getItem("token");
  const formData = new FormData();

  animation.avatar && formData.append("avatar", animation.avatar[0]);
  animation.contentFile &&
    formData.append("contentFile", animation.contentFile[0]);
  animation.name && formData.append("name", animation.name);
  animation.priority &&
    formData.append("priority", animation.priority.toString());
  const config = {
    method: "put",
    url: import.meta.env.VITE_API_URL + "animations/" + animationId,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  };
  const res = await axios.request(config);
  return res;
}

const deleteAnimation = async (id: number) => {
  const token = localStorage.getItem("token");
  let config = {
    method: "delete",

    url: import.meta.env.VITE_API_URL + "animations",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    data: qs.stringify({ id: id }),
  };
  const res = await axios.request(config);
  return res;
};
const getDetailAnimation = async (id: number) => {
  const token = localStorage.getItem("token");
  let config = {
    method: "get",

    url: import.meta.env.VITE_API_URL + "animations/"+ id,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.request(config);
  return res.data;
};
export default {
  fetchAnimations,
  fetchListAnimations,
  getDetailAnimation,
  createAnimation,
  updateAnimation,
  deleteAnimation,
};
