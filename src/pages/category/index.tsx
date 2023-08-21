import React, { FC, useState,useRef, useContext, useEffect } from "react";
import FetchCategory from "./features/fetch-category";
import ModalCreateCategory from "../../components/modal/modal-create-category";
import { CategoryContext, CategoryProvider } from "./context/category-context";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import FilterCategory from "./features/filter-category";

interface pageProps {}

const Category: FC<pageProps> = ({}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const [keyword, setKeyword] = useState<string>();

  
 
  useEffect(()=>{

  })
  return (
    <CategoryProvider>
      <div>
        <FilterCategory />
        <FetchCategory keyword={keyword} isCreateSuccess={isCreateSuccess} />
        <ModalCreateCategory
          setIsCreateSuccess={setIsCreateSuccess}
          open={open}
          handleClose={handleClose}
        />
      </div>
    </CategoryProvider>
  );
};

export default Category;
