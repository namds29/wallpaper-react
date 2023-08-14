import { FC, useState, useContext } from "react";

import { ThemeContext } from "../context/theme-context";
import { parseDate } from "../../../shared/utils/parseDate";
import ModalEditTheme from "./modal-edit-theme";
interface Props {}

const FetchTheme: FC<Props> = ({}) => {
  const { themes, searchByName } = useContext(ThemeContext);

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [themeDetail, setThemeDetail] = useState<any>();
  const [isCreateSuccess, setIsUpdateSuccess] = useState(false);

  const handleClose = () => setIsOpenEdit(false);
  const handleEdit = (theme: any) => {
    setIsOpenEdit(true);
    setThemeDetail(theme);
  };

  return (
    <>
      <div className="grid grid-cols-4 mt-5 gap-5 overflow-y-auto max-h-[calc(100vh-200px-130px)] pr-4">
        {themes &&
          themes
            .filter((item: any) =>
              item.name.toLowerCase().includes(searchByName.toLowerCase())
            )
            .map((item: any, index: number) => (
              <div
                key={index}
                className="bg-primary rounded w-full p-5 relative"
              >
                <div
                  className="relative flex justify-center w-full bg-black h-80 cursor-pointer"
                  onClick={() => handleEdit(item)}
                >
                  <img
                    className="w-full h-full object-contain"
                    src={item.wallpaper.avatar.path}
                    alt={item.name}
                  />
                  <div className="absolute bg-black bottom-3 h-24 w-24">
                    <img
                      className="w-full h-full object-contain"
                      src={item.animation.avatar.path}
                      alt={item.name}
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-4 mb-2">
                  <p className="whitespace-nowrap overflow-hidden overflow-ellipsis w-24">
                    {item.name}
                  </p>
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
        <ModalEditTheme
          setIsUpdateSuccess={setIsUpdateSuccess}
          isOpenEdit={isOpenEdit}
          handleClose={handleClose}
          themeDetail={themeDetail}
        />
      )}
    </>
  );
};

export default FetchTheme;
