import { Box, Modal, Typography } from "@mui/material";
import React, {
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import { useForm } from "react-hook-form";
import categoryService from "../../services/categoryService";
import { Spin } from "antd";
import { CategoryContext } from "../../pages/category/context/category-context";
type Props = {
  // Define your component props here
  open: boolean;
  handleClose: () => void;
  setIsCreateSuccess: Dispatch<SetStateAction<boolean>>;
  isCreateSuccess: any
};
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ModalCreateCategory: React.FC<Props> = ({
  open,
  handleClose,
  setIsCreateSuccess,
  isCreateSuccess
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsSuccess } = useContext(CategoryContext);

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("token") ?? "";
    const categoryInfor = {
      name: data.name,
      chartColor: data.chartColor,
      file: data.photo,
    };
    setIsLoading(true);
    try {
      const res = await categoryService.createCategory(token, categoryInfor);

      if (res.status === 200) {
        setIsLoading(false);
        handleClose();
        setIsCreateSuccess(true);
        setIsSuccess(true);
        alert("Create success");
      }
    } catch (error) {
      setIsLoading(false);
      alert("Create fail!");
    }
  };
  const handlePhotoChange = (e: any) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  useEffect(() => {
    return () => {
      console.log("here");
      reset();
      setIsSuccess(false);
    };
  }, [isCreateSuccess]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
        <div className="text-2xl mb-6 font-bold text-center">
          Create Category
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
              {...register("name", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="chartColor" className="block mb-1 font-medium">
              Chart Color:
            </label>
            <input
              type="color"
              className="border border-solid border-gray-300"
              {...register("chartColor", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photo" className="block mb-1 font-medium">
              Photo*:
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              className="hidden"
              {...register("photo", {
                required: true,
                onChange: handlePhotoChange,
              })}
            />
            <label
              htmlFor="photo"
              className="w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer"
            >
              {photo?.name ?? "Choose a photo"}
            </label>
          </div>
          {previewImage && (
            <div className="mb-6">
              <div className="relative w-full h-96 bg-gray-200 rounded">
                <img
                  src={previewImage}
                  alt="Selected"
                  className="object-cover mb-2 h-full"
                />
              </div>
            </div>
          )}

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

export default ModalCreateCategory;
