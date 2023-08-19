import { Box, Modal, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ListCategory } from "../../shared/types/wallpapers-type";
import wallpaperService from "../../services/wallpaperService";
import categoryService from "../../services/categoryService";
import { Spin } from "antd";

type Props = {
  // Define your component props here
  open: boolean;
  handleClose: () => void;
};
const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  width: "calc(100% - 160px)",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ModalCreateWallpaper: React.FC<Props> = ({
  open,
  handleClose,
}: Props) => {
  // Add your component logic and JSX here
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [previewImgAvatar, setPreviewImgAvatar] = useState<string | null>(null);
  const [previewImgContent, setPreviewImgContent] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0); // Set initial color value
  const [categoryList, getCategoryList] = useState<ListCategory[]>([]);
  const [video, setVideo] = useState<any>();

  const handleOptionChange = (e: any) => {
    setSelectedOption(e);
  };

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("token") ?? "";
    // const wordArray = data.tag
    //   .split(",")
    //   .map((item: string) => item.trim())
    //   .filter((item: string) => item != "");

    const wallPaperInfor = {
      name: data.name,
      category: Number(data.category),
      priceType: Number(data.priceType),
      price: 0,
      priorityNewest: data.priorityNewest,
      priorityCategory: data.priorityCategory,
      priorityTrending: data.priorityTrending,
      author: data.author,
      website: data.website,
      tag: data.tag,
      contentType: Number(data.contentType),
      avatar: data.avatar,
      file: data.file,
    };
    setIsLoading(true);
    try {
      const res = await wallpaperService.createWallpaper(wallPaperInfor);
      setIsLoading(false);
      handleClose();
      alert("Create success");
    } catch (error) {
      setIsLoading(false);
      alert("Create fail!");
    }
  };
  const handleVideoChange = (e: any) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setVideo(url);
  };
  const handleAvatarChange = (e: any) => {
    const file = e.target.files[0];
    setPreviewImgAvatar(URL.createObjectURL(file));
  };
  const handleContentChange = (e: any) => {
    const file = e.target.files[0];
    setPreviewImgContent(URL.createObjectURL(file));
  };
  const getListCategory = async () => {
    const token = localStorage.getItem("token") ?? "";
    const listCategory = await categoryService.getCategoryList(token);
    getCategoryList(listCategory);
  };
  useEffect(() => {
    getListCategory();
    reset();
    return () => {
      getCategoryList([]);
    };
  }, []);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
        <div className="text-2xl mb-6 font-bold text-center">
          Create Wallpaper
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-y-auto max-h-30rem pr-6">
            <div className="flex gap-10">
              <div>
                <p className="mb-6 font-bold">Basic Infor</p>
                <div className="gap-4 mb-4">
                  <p className="mb-2 font-medium">Wallpaper name:</p>
                  <input
                    className=" border border-gray-300 rounded-md px-2 py-1"
                    placeholder="Enter name"
                    {...register("name", {
                      required: true,
                    })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Category:
                  </label>
                  <select
                    id="small"
                    {...register("category")}
                    className="block w-full px-2 py-3 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option key={"cater-none"} value="">
                      None
                    </option>
                    {categoryList &&
                      categoryList.map((cateItem) => (
                        <option key={cateItem.id} value={cateItem.id}>
                          {cateItem.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-4">
                  <p className="block mb-2 font-medium">Price type*:</p>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <input
                        id="Free"
                        type="radio"
                        value="0"
                        defaultChecked={true}
                        {...register("priceType", {
                          required: true,
                          onChange: (e) => handleOptionChange(e),
                        })}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                      />
                      <label
                        htmlFor="Free"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Free
                      </label>
                    </div>
                    <div className="flex items-center mr-4">
                      <input
                        id="IAP"
                        type="radio"
                        value="1"
                        {...register("priceType", { required: true })}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                      />
                      <label
                        htmlFor="IAP"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        IAP
                      </label>
                    </div>
                    <div className="flex items-center mr-4">
                      <input
                        id="Coin"
                        type="radio"
                        value="2"
                        {...register("priceType", { required: true })}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                      />
                      <label
                        htmlFor="Coin"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Coin
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="block mb-3 font-medium">Priority*:</p>
                  <div className="flex gap-4 mb-4">
                    <p className="w-full">For newest:</p>
                    <input
                      type="text"
                      className=" border border-gray-300 rounded-md px-2 py-1"
                      placeholder="Enter newest number"
                      defaultValue={0}
                      {...register("priorityNewest", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <div className="flex gap-4 mb-4">
                    <p className="w-full">For category:</p>
                    <input
                      type="number"
                      className=" border border-gray-300 rounded-md px-2 py-1"
                      placeholder="Enter category number"
                      defaultValue={0}
                      {...register("priorityCategory", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <div className="flex gap-4 mb-4">
                    <p className="w-full">For trending:</p>
                    <input
                      type="number"
                      className=" border border-gray-300 rounded-md px-2 py-1"
                      placeholder="Enter trending"
                      defaultValue={0}
                      {...register("priorityTrending", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="additional-info">
                <p className="mb-6 font-bold">Additional Infor</p>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Author:
                  </label>
                  <input
                    type="text"
                    id="author"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    {...register("author")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Website:
                  </label>
                  <input
                    type="text"
                    id="Website"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    {...register("website")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Publish at:
                  </label>
                  <input
                    type="text"
                    id="publish"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    {...register("publish")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Tag:
                  </label>
                  <textarea
                    id="tag"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    {...register("tag")}
                  />
                </div>
              </div>
              <div className="content w-96">
                <p className="mb-6 font-bold">Content</p>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Type*:
                  </label>
                  <select
                    id="small"
                    className="block w-full px-2 py-3 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("contentType", { required: true })}
                  >
                    {/* <option selected disabled hidden>Choose a country</option> */}
                    <option value="1">single_image</option>
                    <option value="2">double_image</option>
                    <option value="3">video</option>
                  </select>
                </div>
                <div className="flex mb-4 gap-10">
                  <div>
                    <div className="mb-4">
                      <label htmlFor="photo" className="block mb-4 font-medium">
                        Avatar File*:
                      </label>
                      <input
                        type="file"
                        id="file"
                        accept="image/*"
                        {...register("avatar", { onChange: handleAvatarChange })}
                      />
                    </div>
                    <div className="w-full">
                      {previewImgAvatar && (
                        <div className="mb-6">
                          <div className="relative w-full h-96 bg-gray-200 rounded">
                            <img
                              src={previewImgAvatar}
                              className="object-contain mb-2 h-full"
                              alt=""
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="mb-4">
                      <label htmlFor="photo" className="block mb-4 font-medium">
                        Content File*:
                      </label>
                      <input
                        type="file"
                        id="thumb"
                        accept="image/*"
                        {...register("file", {
                          required: true,
                          onChange: handleContentChange
                        })}
                      />
                    </div>
                    <div className="w-full">
                    {previewImgContent && (
                      <div className="mb-6">
                        <div className="relative w-full h-96 bg-gray-200 rounded">
                          <img
                            src={previewImgContent}
                            className="object-contain mb-2 h-full"
                            alt=""
                          />
                        </div>
                      </div>
                    )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <label htmlFor="photo" className="block mb-4 font-medium">
                      Video File:
                    </label>
                    <input
                      type="file"
                      id="video"
                      
                      {...register("video", { onChange: handleVideoChange })}
                    />
                  </div>
                  <div className="w-full">
                  {video && (
                        <div className="mb-6 ">
                          <div className="relative flex justify-center w-full h-96 bg-gray-200 rounded">
                            <video style={{ height: "inherit" }} controls>
                              <source src={video} type="video/mp4" />
                            </video>
                          </div>
                        </div>
                      )}
                  
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
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

export default ModalCreateWallpaper;
