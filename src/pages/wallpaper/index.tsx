import { FC, useEffect, useState } from "react";
import FilterWallpaper from "./features/filter-wallpaper";
import FetchWallpaper from "./features/fetch-wallpaper";
import useFetchWallpaper from "../../hooks/useFetchWallpaper";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const [keyword, setKeyword] = useState<string>();
  const [type, setType] = useState<number>();
  const [categoryId, setCategoryId] = useState<number>();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const {
    wallpapers,
    totalPages,
    currentPage,
    pageSize,
    setTotalPages,
    setPageSize,
    setCurrentPage,
    fetchWallpaper,
    isLoading,
    setIsLoading
  } = useFetchWallpaper(keyword, categoryId, type);

  const updateCategoryId = (id: number) => {
    setCategoryId(id);
  };
  const filterKeyword = (keyword: string) => {
    setKeyword(keyword);
  };
  const filterType = (type: number) => {
    setType(type);
  };

  useEffect(() => {
    const token = localStorage.getItem("token") ?? "";
    fetchWallpaper(token);
  }, [keyword, type, categoryId, updateSuccess]);
  return (
    <div>
      <FilterWallpaper
        filterKeyword={filterKeyword}
        updateCategoryId={updateCategoryId}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        filterType={filterType}
      />
      <FetchWallpaper
        wallpapers={wallpapers}
        pageSize={pageSize}
        totalPages={totalPages}
        currentPage={currentPage}
        setTotalPages={setTotalPages}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        updateSuccess={updateSuccess}
        setUpdateSuccess={setUpdateSuccess}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default Page;
