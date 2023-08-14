import { IconWallpaper } from "../../assets/svgs/icon-wallpaper";
import { IconCategory } from "../../assets/svgs/icon-category";
import { useFetchAnimations } from "../../hooks/useAnimations";
import { useFetchWallpapers } from "../../hooks/useWallpaper";
import { useFetchTheme } from "../../hooks/useThemes";

type Dashboard = {
  category: number;
  wallpapers: number;
};
const Dashboard = () => {

  const { data: animations } = useFetchAnimations();
  const { data: wallpapers } = useFetchWallpapers();
  const { data: themes } = useFetchTheme();


  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <div className="bg-primary p-4 rounded">
        <p className="text-lg">Animation</p>
        <div className="flex justify-between">
          <p className="text-3xl font-bold mt-6">{animations?.data.total}</p>
          <IconWallpaper />
        </div>
        <p className="text-gray-500">Total</p>
      </div>
      <div className="bg-primary p-4 rounded">
        <p className="text-lg">Wallpaper</p>
        <div className="flex justify-between">
          <p className="text-3xl font-bold mt-6">{wallpapers?.data.total}</p>
          <IconWallpaper />
        </div>
        <p className="text-gray-500">Total</p>
      </div>
      <div className="bg-primary p-4 rounded">
        <p className="text-lg">Theme</p>
        <div className="flex justify-between">
          <p className="text-3xl font-bold mt-6">{themes?.data.total}</p>
          <IconCategory />
        </div>
        <p className="text-gray-500">Total</p>
      </div>
    </div>
  );
};
export default Dashboard;
