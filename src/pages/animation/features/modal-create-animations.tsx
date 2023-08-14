import { Box, Modal } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import animationService from "../../../services/animation-service";
import { useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";

interface Props {
  open: boolean;
  handleClose: () => void;
  setIsCreateSuccess: Dispatch<SetStateAction<boolean>>;
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
const ModalCreateAnimation: FC<Props> = ({
  open,
  handleClose,
  setIsCreateSuccess,
}: Props) => {
  const { register, handleSubmit } = useForm();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [content, setContent] = useState<File | null>(null);
  const [video, setVideo] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImageAvatar, setPreviewImageAvatar] = useState<string | null>(
    null
  );
  const [previewImageContent, setPreviewImageContent] = useState<string | null>(
    null
  );
  const queryClient = useQueryClient();

  const onSubmit = async (data: any) => {
    const form = {
      name: data.name,
      priority: data.priority,
      contentType: 1,
      avatar: data.avatar,
      contentFile: data.content,
    };
    setIsLoading(true);
    const res = await animationService.createAnimation(form);
    if (res.status === 200) {
      setIsLoading(false);
      handleClose();
      setIsCreateSuccess(true);
      alert("Create success");
      queryClient.invalidateQueries(["animations"]);
    }
  };
  const handlePhotoAvatarChange = (e: any) => {
    const file = e.target.files[0];
    console.log(file.type);
    if (file.type === "video/mp4") {
      const url = URL.createObjectURL(file);
      setVideo(url);
      setPreviewImageAvatar(null);
      setAvatar(null)
    } else {
      setVideo(null);
      setAvatar(file);
      setPreviewImageAvatar(URL.createObjectURL(file));
    }
  };
  const handlePhotoContentChange = (e: any) => {
    const file = e.target.files[0];
    setContent(file);
    setPreviewImageContent(URL.createObjectURL(file));
  };
  return (
    // {!isLoading && }

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: "fit-content" }}>
        <div className="text-2xl mb-6 font-bold text-center">
          Create Animation
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
              defaultValue={1}
            />
          </div>
          <div className="flex mb-4 gap-5">
            <div>
              <label htmlFor="photo" className="block mb-1 font-medium">
                Avatar*:
              </label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                // className="hidden"
                {...register("avatar", {
                  onChange: handlePhotoAvatarChange,
                })}
              />
            </div>
            <div>
              <label htmlFor="content" className="block mb-1 font-medium">
                Content*:
              </label>
              <input
                type="file"
                id="content"
                accept="image/*"
                // className="hidden"
                {...register("content", {
                  onChange: handlePhotoContentChange,
                })}
              />
            </div>
          </div>
          <div className="flex gap-5">
            {video && (
              <div className="mb-6 w-1/2">
                <div className="relative flex justify-center w-full h-96 bg-gray-200 rounded">
                  <video style={{ height: "inherit" }} controls>
                    <source src={video} type="video/mp4" />
                  </video>
                </div>
              </div>
            )}

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
  );
};

export default ModalCreateAnimation;
