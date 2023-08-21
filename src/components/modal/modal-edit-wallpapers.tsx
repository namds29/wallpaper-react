import { Box, Modal } from "@mui/material";

import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { ListCategory, Wallpaper } from "../../shared/types/wallpapers-type";
import wallpaperService from "../../services/wallpaperService";
import categoryService from "../../services/categoryService";
import { Spin } from "antd";
type Props = {
  // Define your component props here
  open: boolean;
  wallpaperDetail: Wallpaper | undefined;
  handleClose: () => void;
  setUpdateSuccess: Dispatch<SetStateAction<boolean>>;
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

const ModalEditWallpapers: React.FC<Props> = ({
  open,
  handleClose,
  wallpaperDetail,
  setUpdateSuccess,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({});
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<any>(null);
  const [thumbName, setThumbName] = useState<any>(null);
  const [categoryList, setCategoryList] = useState<ListCategory[]>([]);
  const [priceTypeMap, setPriceTypeMap] = useState<string | undefined>(
    wallpaperDetail?.priceType
  );
  const [previewImgAvatar, setPreviewImgAvatar] = useState<any>(
    wallpaperDetail?.avatar.path
  );
  const [previewImgContent, setPreviewImgContent] = useState<any>(
    wallpaperDetail?.contentFile
  );
  const [textTagArea, setTextTagArea] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    wallpaperDetail?.categoryId
  );

  const [previewImage, setPreviewImage] = useState<string | undefined>(
    wallpaperDetail?.avatar.path
  );
  const [type, setType] = useState<number | undefined>(wallpaperDetail?.type);
  const [video, setVideo] = useState<any>();

  const convertPriceType = (priceType: string) => {
    if (priceType == "Free") return "0";
    if (priceType == "IAP") return "1";
    if (priceType == "COIN") return "2";
  };
  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("token") ?? "";

    if (wallpaperDetail) {
      const wallPaperInfor = {
        name: data.name,
        category: Number(data.category),
        priceType: convertPriceType(data.priceType),
        price: 0,
        priorityNewest: data.priorityNewest,
        priorityCategory: data.priorityCategory,
        priorityTrending: data.priorityTrending,
        author: data.author,
        website: data.website,
        tag: data.tag,
        type: Number(data.contentType),
        avatar: data.avatar,
        file: data.file,
      };
      setIsLoading(true);
      try {
        const res = await wallpaperService.updateWallpaper(
          token,
          wallPaperInfor,
          wallpaperDetail.id
        );

        if (res.status === 200) {
          handleClose();
          setUpdateSuccess(true);
          setIsLoading(false);
          alert("Update success");
        }
      } catch (error) {
        setIsLoading(false);
        alert("Updated fail!");
      }
    }
  };
  const handleDeleteWallPaper = async (id: number) => {
    const res = await wallpaperService.deleteWallpaper(id);
    if (res.status === 200) {
      handleClose();
      setUpdateSuccess(true);
      setIsLoading(false);
      alert("Delete success");
    }
  };
  const getListCategory = async () => {
    const token = localStorage.getItem("token") ?? "";
    const listCategory = await categoryService.getCategoryList(token);
    setCategoryList(listCategory);
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
    const files = Array.from(e.target.files);

    const previews = files
      .slice(0, 2)
      .map((file: any) => URL.createObjectURL(file));

    setPreviewImgContent(previews);
  };
  const handleChangeType = (e: any) => {
    const val = +e.target.value;

    if (val === 1) setType(1);
    if (val === 2) setType(2);
    if (val === 3) setType(3);
  };

  useEffect(() => {
    getListCategory();
    setFileName(wallpaperDetail?.avatar.file_name);
    setThumbName(wallpaperDetail?.avatar.file_name);
    if (wallpaperDetail) {
      if (wallpaperDetail.tag && wallpaperDetail.tag !== null) {
        if (wallpaperDetail.tag.includes("[")) {
          const parseTag = JSON.parse(wallpaperDetail.tag);
          const joinTag = parseTag.join(", ");
          setTextTagArea(joinTag);
        } else {
          setTextTagArea(wallpaperDetail.tag);
        }
      }
    }

    reset();
    return () => {
      reset();
      setUpdateSuccess(false);
      setCategoryList([]);
    };
  }, [wallpaperDetail]);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
        <div className="text-2xl mb-6 font-bold text-center">
          Edit Wallpaper
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
                    defaultValue={wallpaperDetail?.name}
                    {...register("name", {
                      required: true,
                    })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Category:
                  </label>

                  <Controller
                    control={control}
                    name="category"
                    defaultValue={selectedCategory}
                    render={({ field }) => (
                      <select
                        id="small"
                        {...field}
                        className="block w-full px-2 py-3 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option key={"cater-none"} value="">
                          None
                        </option>
                        {categoryList &&
                          categoryList.map((cateItem) => (
                            <option
                              key={cateItem.id + cateItem.name}
                              value={cateItem.id}
                            >
                              {cateItem.name}
                            </option>
                          ))}
                      </select>
                    )}
                  />
                </div>
                <div className="mb-4">
                  <p className="block mb-2 font-medium">Price type*:</p>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <Controller
                        name="priceType"
                        control={control}
                        defaultValue={priceTypeMap}
                        render={({ field }) => (
                          <>
                            <input
                              id="Free"
                              type="radio"
                              {...field}
                              checked={field.value === "Free"}
                              value="Free"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                            />
                            <label
                              htmlFor="Free"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Free
                            </label>
                          </>
                        )}
                      />
                    </div>
                    <div className="flex items-center mr-4">
                      <Controller
                        name="priceType"
                        control={control}
                        defaultValue={priceTypeMap}
                        render={({ field }) => (
                          <>
                            <input
                              id="IAP"
                              type="radio"
                              {...field}
                              checked={field.value === "IAP"}
                              value="IAP"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                            />
                            <label
                              htmlFor="IAP"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              IAP
                            </label>
                          </>
                        )}
                      />
                    </div>
                    <div className="flex items-center mr-4">
                      <Controller
                        name="priceType"
                        control={control}
                        defaultValue={priceTypeMap}
                        render={({ field }) => {
                          return (
                            <>
                              <input
                                id="COIN"
                                type="radio"
                                {...field}
                                checked={field.value === "COIN"}
                                value="COIN"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                              />
                              <label
                                htmlFor="COIN"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                COIN
                              </label>
                            </>
                          );
                        }}
                      />
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
                      defaultValue={wallpaperDetail?.priorityNewest}
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
                      defaultValue={wallpaperDetail?.priorityCategory}
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
                      defaultValue={wallpaperDetail?.trendingPriority}
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
                    defaultValue={wallpaperDetail?.author}
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
                    defaultValue={wallpaperDetail?.website}
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
                    defaultValue={textTagArea}
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
                    defaultValue={wallpaperDetail?.type}
                    className="block w-full px-2 py-3 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("contentType", {
                      required: true,
                      onChange: handleChangeType,
                    })}
                  >
                    {/* <option selected disabled hidden>Choose a country</option> */}
                    <option value="1">single image</option>
                    <option value="2">double image</option>
                    <option value="3">video</option>
                  </select>
                </div>
                <div className="flex mb-4 gap-10">
                  {(type == 1 || type == 3) && (
                    <div className="avatar">
                      <div className="mb-4">
                        <label
                          htmlFor="photo"
                          className="block mb-4 font-medium"
                        >
                          Avatar File*:
                        </label>
                        <input
                          type="file"
                          id="file"
                          accept="image/*"
                          {...register("avatar", {
                            onChange: handleAvatarChange,
                          })}
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
                  )}

                  {(type == 1 || type == 2) && (
                    <div className="content-file">
                      <div className="mb-4">
                        <label
                          htmlFor="photo"
                          className="block mb-4 font-medium"
                        >
                          Content File*:
                        </label>
                        <input
                          type="file"
                          id="thumb"
                          multiple
                          accept="image/*"
                          {...register("file", {
                            
                            onChange: handleContentChange,
                          })}
                        />
                      </div>
                      <div className="w-full flex gap-5">
                        {previewImgContent &&
                          previewImgContent.map((item: any, id: number) => (
                            <div key={id} className="mb-6">
                              <div className="relative w-full h-96 bg-gray-200 rounded">
                                <img
                                  src={item.path ?? item}
                                  className="object-contain mb-2 h-full"
                                  alt=""
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
                {type == 2 && (
                  <div className="video-class">
                    <div className="mb-4">
                      <label htmlFor="photo" className="block mb-4 font-medium">
                        Video Avatar:
                      </label>
                      <input
                        type="file"
                        id="video"
                        {...register("videoAvatar", {
                          onChange: handleVideoChange,
                        })}
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
                )}
                {type == 3 && (
                  <div className="video-class">
                    <div className="mb-4">
                      <label htmlFor="photo" className="block mb-4 font-medium">
                        Video Content:
                      </label>
                      <input
                        type="file"
                        id="video"
                        {...register("videoContent", {
                          onChange: handleVideoChange,
                        })}
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
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4 gap-3">
            {wallpaperDetail?.id && (
              <button
                type="button"
                onClick={() => handleDeleteWallPaper(wallpaperDetail.id)}
                className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            )}

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

export default ModalEditWallpapers;
