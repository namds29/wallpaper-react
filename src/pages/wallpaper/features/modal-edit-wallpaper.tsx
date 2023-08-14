import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import animationService from "../../../services/animation-service";
import { useQueryClient } from "@tanstack/react-query";
import { WallpaperDetail } from "../../../shared/types/wallpapers-type";
import { Button } from "antd";
import wallpaperService from "../../../services/wallpaper-service";

interface Props {
  isOpenEdit: boolean;
  handleClose: () => void;
  setIsUpdateSuccess: Dispatch<SetStateAction<boolean>>;
  wallpaperDetail: WallpaperDetail | undefined;
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
const ModalEditWallpaper: FC<Props> = ({
  isOpenEdit,
  handleClose,
  setIsUpdateSuccess,
  wallpaperDetail,
}: Props) => {
  const { register, handleSubmit } = useForm();

  const [avatarName, setAvatarName] = useState<string | undefined>(
    wallpaperDetail?.avatar.file_name
  );
  const [contentName, setContentName] = useState<string | undefined>(
    wallpaperDetail?.contentFile.file_name
  );
  const [previewImageAvatar, setPreviewImageAvatar] = useState<
    string | undefined
  >(wallpaperDetail?.avatar.path);
  const [previewImageContent, setPreviewImageContent] = useState<
    string | undefined
  >(wallpaperDetail?.contentFile.path);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const onSubmit = async (data: any) => {
    const form = {
      name: data.name,
      priority: data.priority,
      avatar: data.avatar.length ? data.avatar : undefined,
      contentFile: data.content.length ? data.content : undefined,
    };

    if (wallpaperDetail?.id !== undefined) {
      const res = await animationService.updateAnimation(
        wallpaperDetail?.id,
        form
      );
      if (res.status === 200) {
        handleClose();
        setIsUpdateSuccess(true);
        alert("Update success");
        queryClient.invalidateQueries(["wallpapers"]);
      }
    }
  };
  const handlePhotoAvatarChange = (e: any) => {
    const file = e.target.files[0];

    setAvatarName(file.name);
    setPreviewImageAvatar(URL.createObjectURL(file));
  };
  const handlePhotoContentChange = (e: any) => {
    const file = e.target.files[0];

    setContentName(file.name);
    setPreviewImageContent(URL.createObjectURL(file));
  };

  const handleDelete = async () => {
    if (wallpaperDetail) {
      try {
        const res = await wallpaperService.deleteWallpapers(wallpaperDetail.id);

        if (res.status === 200) {
          handleClose();
          alert("Delete success");
          queryClient.invalidateQueries(["wallpapers"]);
        }
      } catch (error) {
        alert("Delete fail!")
      }
    }
  };
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
            Update Wallpaper
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 font-medium">
                Name:
              </label>
              <input
                type="text"
                id="name"
                defaultValue={wallpaperDetail?.name}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
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
                placeholder="Enter newest number"
                id="priorityAnimation"
                {...register("priority", {
                  required: true,
                  valueAsNumber: true,
                })}
                defaultValue={wallpaperDetail?.priority}
              />
            </div>
            <div className="flex justify-between mb-4 gap-5">
              <div>
                <label htmlFor="photo" className="block mb-1 font-medium">
                  Avatar*:
                </label>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  className="absolute hidden"
                  {...register("avatar", { onChange: handlePhotoAvatarChange })}
                />
                <label
                  htmlFor="photo"
                  className="border border-gray-300 rounded-md px-3 py-2 cursor-pointer overflow-hidden whitespace-nowrap overflow-ellipsis"
                >
                  {avatarName ?? "Choose a photo"}
                </label>
              </div>
              <div>
                <label htmlFor="content" className="block mb-1 font-medium">
                  Content*:
                </label>
                <input
                  type="file"
                  id="content"
                  accept="image/*"
                  className="absolute hidden"
                  {...register("content", {
                    onChange: handlePhotoContentChange,
                  })}
                />
                <label
                  htmlFor="content"
                  className="border border-gray-300 rounded-md px-3 py-2 cursor-pointer overflow-hidden whitespace-nowrap overflow-ellipsis"
                >
                  {contentName ?? "Choose a photo"}
                </label>
              </div>
            </div>
            <div className="flex gap-5">
              {previewImageAvatar && (
                <div className="mb-6 w-1/2">
                  <div className="relative w-full h-96 bg-gray-200 rounded">
                    <img
                      src={previewImageAvatar}
                      alt="Selected"
                      className="h-full object-contain mb-2"
                    />
                  </div>
                </div>
              )}
              {previewImageContent && (
                <div className="mb-6 w-1/2">
                  <div className="relative w-full h-96 bg-gray-200 rounded">
                    <img
                      src={previewImageContent}
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
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
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

export default ModalEditWallpaper;
