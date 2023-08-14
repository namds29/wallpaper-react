import { createContext, useState, useEffect } from "react";
import { useFetchWallpapers } from "../../../hooks/useWallpaper";
import { WallpaperDetail } from "../../../shared/types/wallpapers-type";

interface Props {
  wallpapers: WallpaperDetail[];
  searchByName: string,
  setWallpapers: React.Dispatch<React.SetStateAction<WallpaperDetail[]>>;
  setSearchByName: React.Dispatch<React.SetStateAction<string>>;
}
export const WallpaperContext = createContext<Props>({
  wallpapers: [],
  searchByName: '',
  setWallpapers: () => {},
  setSearchByName: () => ''
});

export const WallpaperProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoading, data } = useFetchWallpapers();
  const [searchByName, setSearchByName] = useState<string>('');
  const [wallpapers, setWallpapers] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading) setWallpapers(data?.data.data);
  }, [isLoading, data]);
  useEffect(() => {}, [wallpapers]);
  return (
    <WallpaperContext.Provider value={{ wallpapers, setWallpapers, searchByName, setSearchByName }}>
      {children}
    </WallpaperContext.Provider>
  );
};
