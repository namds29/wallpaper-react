
import { FC, useState } from "react";
import FilterWallpaper from "./features/filter-wallpaper";
import FetchWallpaper from "./features/fetch-wallpaper";
import { WallpaperProvider } from "./context/wallpaper-context";
import ModalCreateWallpaper from "./features/modal-create-wallpaper";


interface pageProps {}

const Wallpapers: FC<pageProps> = ({}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <WallpaperProvider>
      <div>
        <FilterWallpaper />
        <div className="text-right my-3">
          <button
            className="rounded px-4 py-3 bg-blue-500 "
            onClick={handleOpen}
          >
            + Add Wallpaper
          </button>
        </div>
        {open && (
          <ModalCreateWallpaper
            setIsCreateSuccess={setIsCreateSuccess}
            open={open}
            handleClose={handleClose}
          />
        )}
        <FetchWallpaper />
      </div>
    </WallpaperProvider>
  );
};

export default Wallpapers;
