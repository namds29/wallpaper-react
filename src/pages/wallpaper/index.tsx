import { FC, useEffect, useState } from "react";
import FilterWallpaper from "./features/filter-wallpaper";
import FetchWallpaper from "./features/fetch-wallpaper";
import useFetchWallpaper from "../../hooks/useFetchWallpaper";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const [keyword, setKeyword] = useState<string>();
  const [type, setType] = useState<number>();
  const [typeSort, setTypeSort] = useState<number>();
  const [sortField, setSortField] = useState<string>("name");
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
  } = useFetchWallpaper(keyword, categoryId, type, sortField, typeSort);

  const updateCategoryId = (id: number) => {
    setCategoryId(id);
  };
  const filterKeyword = (keyword: string) => {
    setKeyword(keyword);
  };
  const filterType = (type: number) => {
    setType(type);
  };
  const sortAscDesc = (type: number) => {
    setTypeSort(type);
  };
  const sortByField = (field: string) => {
    setSortField(field);
  };

  useEffect(() => {
    const token = localStorage.getItem("token") ?? "";
    fetchWallpaper(token);
  }, [keyword, type, categoryId, updateSuccess,sortField, typeSort]);
  return (
    <div>
      <FilterWallpaper
        filterKeyword={filterKeyword}
        updateCategoryId={updateCategoryId}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        filterType={filterType}
        sortByField={sortByField}
        sortAscDesc={sortAscDesc}

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
