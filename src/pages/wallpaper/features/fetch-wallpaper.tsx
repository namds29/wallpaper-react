import { FC, useState, useContext } from "react";
import { parseDate } from "../../../shared/utils/parseDate";
import { WallpaperContext } from "../context/wallpaper-context";
import { WallpaperDetail } from "../../../shared/types/wallpapers-type";
import ModalEditWallpaper from "./modal-edit-wallpaper";

interface Props {}

const FetchWallpaper: FC<Props> = ({}) => {
  const { wallpapers, searchByName } = useContext(WallpaperContext);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [wallpaperDetail, setWallpaperDetail] = useState<
    WallpaperDetail | undefined
  >();
  const [isCreateSuccess, setIsUpdateSuccess] = useState(false);

  const handleClose = () => setIsOpenEdit(false);
  const handleEdit = (wallpaper: any) => {
    setIsOpenEdit(true);
    setWallpaperDetail(wallpaper);
  };

  return (
    <>
      <div className="grid grid-cols-4 mt-5 gap-5 overflow-y-auto max-h-[calc(100vh-200px-130px)] pr-4">
        {wallpapers &&
          wallpapers
            .filter((item: any) =>
              item.name.toLowerCase().includes(searchByName.toLowerCase())
            )
            .map((item: any, index: number) => (
              <div
                key={index}
                className="bg-primary rounded w-full p-5 relative"
              >
                <div
                  className="relative w-full h-80 cursor-pointer"
                  onClick={() => handleEdit(item)}
                >
                  <img
                    src={item.avatar.path}
                    alt="Pic 1"
                    style={{
                      width: "100%",
                      objectFit: "contain",
                      background: 'black',
                      borderRadius: 5,
                      height: "100%",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-4 mb-2">
                  <p className="whitespace-nowrap overflow-hidden overflow-ellipsis w-24">
                    {item.name}
                  </p>
                </div>
                <div className="mt-3 text-gray-500 text-sm">
                  Download: {item.downloadCount}
                </div>
                <div className="mt-3 text-gray-500 text-sm">
                  Priority: {item.priority}
                </div>
                <div className="mt-3 text-red-500 text-sm">
                  Time: {parseDate(item.createdAt)}
                </div>
              </div>
            ))}
      </div>

      {isOpenEdit && (
        <ModalEditWallpaper
          setIsUpdateSuccess={setIsUpdateSuccess}
          isOpenEdit={isOpenEdit}
          handleClose={handleClose}
          wallpaperDetail={wallpaperDetail}
        />
      )}
    </>
  );
};

export default FetchWallpaper;
