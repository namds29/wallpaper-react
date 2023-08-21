import { createContext, useState, useEffect } from "react";
import {
  CategoryDetail,
  CategoryResponse,
} from "../../../shared/types/wallpapers-type";
import categoryService from "../../../services/categoryService";
import { SelectChangeEvent } from "@mui/material";

interface Props {
  categories: CategoryDetail[];
  keyword: string,
  setCategories: React.Dispatch<React.SetStateAction<CategoryDetail[]>>;
  setKeyword: any,
  filterKeyword: any,
  getCategory: any,
  setIsSuccess: any
  //   setSearchByName: React.Dispatch<React.SetStateAction<string>>;
}
export const CategoryContext = createContext<Props>({
  categories: [],
  keyword: '',
  setCategories: () => {},
  setKeyword : () => {},
  filterKeyword : (keyword: string) =>{},
  getCategory: () => {},
  setIsSuccess: () => {},
});

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentpage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState<CategoryDetail[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<string>('');


  const filterKeyword = (keyword: string) => {
    setKeyword(keyword);
  };
  const handlePaging = (event: SelectChangeEvent) => {
    setCurrentPage(Number(event.target.value));
  };
  const handlePagingItem = (event: SelectChangeEvent) => {
    setPageSize(Number(event.target.value));
  };

  const getCategory = async () => {
    const token = localStorage.getItem("token") ?? "";
    const res = await categoryService.fetchCategory(
      token,
      currentpage,
      pageSize,
      keyword
    );
    const data = await res.data;
    
    const contentCategory = data.data.map((item: CategoryResponse) => ({
      id: item.id,
      name: item.name,
      file_name: item.avatar.file_name,
      path: item.avatar.path,
      chartColor: item.chartColor,
      createdAt: item.createdAt,
      useCount: item.useCount ?? 0,
      downloadCount: item.downloadCount ?? 0,
    }));
    setTotalPages(Math.ceil(data.total / pageSize));
    setCategories(contentCategory);
  };
  useEffect(() => {
    getCategory();
  }, [keyword,isSuccess]);
  return (
    <CategoryContext.Provider value={{ categories, keyword, setCategories, setKeyword, filterKeyword, getCategory, setIsSuccess}}>
      {children}
    </CategoryContext.Provider>
  );
};
