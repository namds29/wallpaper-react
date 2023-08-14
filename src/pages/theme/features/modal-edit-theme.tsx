import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from "@mui/material";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Spin } from "antd";

import themeService from "../../../services/theme-service";
import wallpaperService from "../../../services/wallpaper-service";
import animationService from "../../../services/animation-service";

interface Props {
  isOpenEdit: boolean;
  handleClose: () => void;
  setIsUpdateSuccess: Dispatch<SetStateAction<boolean>>;
  themeDetail: any;
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};
const ModalEditTheme: FC<Props> = ({
  isOpenEdit,
  handleClose,
  setIsUpdateSuccess,
  themeDetail,
}: Props) => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [listWallpaper, setListWallpaper] = useState<any>([]);
  const [listAnimation, setListAnimation] = useState<any>([]);
  const [previewImageWallpaper, setPreviewImageWallpaper] = useState<
    string | null
  >(themeDetail.wallpaper.avatar.path);
  const [previewImageAnimation, setPreviewImageAnimation] = useState<
    string | null
  >(themeDetail.animation.avatar.path);
  const queryClient = useQueryClient();

  const fetchListWallpapers = async () => {
    const res = await wallpaperService.fetchListWallpapers();
    setListWallpaper(res);
  };
  const fetchListAnimations = async () => {
    const res = await animationService.fetchListAnimations();
    setListAnimation(res);
  };

  const onSubmit = async (data: any) => {
    const form = {
      name: data.name,
      priority: data.priority,
      wallpaperID: data.wallpaperID,
      animationID: data.animationID,
    };
    setIsLoading(true);
    try {
      const res = await themeService.updateTheme(themeDetail.id, form);

      if (res.status === 200) {
        setIsLoading(false);
        handleClose();
        setIsUpdateSuccess(true);
        alert("Update success");
        queryClient.invalidateQueries(["themes"]);
      }
    } catch (error) {
      setIsLoading(false);
      alert("Update fail!");
    }
  };

  const showWallpaperImg = async (e: any) => {
    const id = Number(e.target.value);
    const res = await wallpaperService.getDetailWallpapers(id);
    setPreviewImageWallpaper(res.avatar.path);
  };
  const showAnimationImg = async (e: any) => {
    const id = Number(e.target.value);
    const res = await animationService.getDetailAnimation(id);

    setPreviewImageAnimation(res.avatar.path);
  };
  const handleDelete = async () => {
    if (themeDetail) {
      try {
        const res = await themeService.deleteTheme(themeDetail.id);

        if (res.status === 200) {
          handleClose();
          alert("Delete success");
          queryClient.invalidateQueries(["themes"]);
        }
      } catch (error) {
        alert("Delete fail!");
      }
    }
  };
  useEffect(() => {
    fetchListWallpapers();
    fetchListAnimations();
  }, []);
  return (
    <>
      <Modal
        open={isOpenEdit}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "fit-content" }}>
          <div className="text-2xl mb-6 font-bold text-center">
            Update Theme
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 font-medium">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                defaultValue={themeDetail.name}
                {...register("name")}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 font-medium">
                Priority:
              </label>
              <input
                type="text"
                className=" border border-gray-300 w-full rounded-md px-2 py-1"
                placeholder="Enter number"
                id="priority"
                {...register("priority", {
                  required: true,
                  valueAsNumber: true,
                })}
                defaultValue={themeDetail.priority}
              />
            </div>
            <div className="flex justify-between mb-4 gap-5">
              <div>
                <label htmlFor="Wallpaper" className="block mb-1 font-medium">
                  Wallpaper*:
                </label>
                <select
                  className="w-full cursor-pointer px-2 py-1 bg-gray-200 rounded"
                  id="Wallpaper"
                  defaultValue={themeDetail.wallpaper.id}
                  {...register("wallpaperID", {
                    onChange: (e) => showWallpaperImg(e),
                  })}
                >
                  <option value="" disabled>
                    Select wallpaper
                  </option>
                  {listWallpaper &&
                    listWallpaper.map((item: any) => (
                      <option key={"wallpaper " + item.id} value={item.id}>
                        Name: {item.name}/ ID: {item.id}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="animation" className="block mb-1 font-medium">
                  Animation*:
                </label>
                <select
                  className="w-full cursor-pointer px-2 py-1 bg-gray-200 rounded"
                  id="animation"
                  defaultValue={themeDetail.animation.id}
                  {...register("animationID", {
                    onChange: (e) => showAnimationImg(e),
                  })}
                >
                  <option value="" disabled>
                    Select animation
                  </option>
                  {listAnimation &&
                    listAnimation.map((item: any) => (
                      <option key={"wallpaper " + item.id} value={item.id}>
                        Name: {item.name}/ ID: {item.id}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex gap-5">
              {previewImageWallpaper && (
                <div className="mb-6 w-1/2">
                  <div className="relative w-full h-96 bg-gray-200 rounded">
                    <img
                      src={previewImageWallpaper}
                      alt="Selected"
                      className="h-full object-contain mb-2"
                    />
                  </div>
                </div>
              )}
              {previewImageAnimation && (
                <div className="mb-6 w-1/2">
                  <div className="relative w-full h-96 bg-gray-200 rounded">
                    <img
                      src={previewImageAnimation}
                      alt="Selected"
                      className="h-full object-contain mb-2"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 mr-4 rounded-md"
                onClick={handleDelete}
              >
                Delete
              </button>
              {isLoading ? (
                <Spin>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    disabled
                  >
                    Submit
                  </button>
                </Spin>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              )}
              <button
                type="button"
                onClick={handleClose}
                className="ml-2 text-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ModalEditTheme;
