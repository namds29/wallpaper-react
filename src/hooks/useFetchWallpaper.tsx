import { FC, useEffect, useState } from "react";
import wallpaperService from "../services/wallpaperService";


type PriceType = {
  [key: string]: number;
};
const PriceTypeMapping: PriceType = {
  FREE: 0,
  IAP: 1,
  COIN: 2,
};
function getPriceType(value: number) {
  if (value === 0) {
    return 'Free';
  } else if (value === 1) {
    return 'IAP';
  } else {
    return 'Coin';
  }
}
const useFetchWallpaper = (keyword?:string, categoryId?: number, type?: number,sortField?: string, typeSort?: number) => {
  const [wallpapers, setWallpapers] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchWallpaper = async (token: string) => {
    setIsLoading(true)
    const res = await wallpaperService.fetchWallpaper(
      token,
      currentPage,
      pageSize,
      keyword,
      categoryId,
      type,
      sortField,
      typeSort
    );
    const data = res.data.map((item: any) => (
      {
      id: item.id,
      name: item.name,
      tag: item.tag,
      downloadCount: item.downloadCount,
      trendingPriority: item.priorityTrending,
      price: item.price, 
      priceType: getPriceType(item.priceType),
      priorityCategory: item.priorityCategory,
      priorityNewest: item.priorityNewest,
      time: item.createdAt,
      avatar: {
          file_name: item.avatar.file_name,
          path: item.avatar.path,
          size: item.avatar.size, 
          mimetype: item.avatar.mimetype,
      },
      contentFile: item.contentFile, 
      categoryId: item.categoryId,
      author: item.author,
      type: item.type,
      website: item.website,
  }
  ));
    
    setWallpapers(data);
    setTotalPages(Math.ceil(res.total / pageSize));
    setIsLoading(false)
  };
  useEffect(() => {
    const token = localStorage.getItem("token") ?? "";
    fetchWallpaper(token);
    
  }, [currentPage, pageSize]);

  return {
    wallpapers,
    totalPages,
    currentPage,
    pageSize,
    categoryId,
    setTotalPages,
    setPageSize,
    setCurrentPage,
    fetchWallpaper,
    isLoading,
    setIsLoading
  };
};

export default useFetchWallpaper;
