import {
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
  } from "@mui/material";
  import React, { FC, useState,useRef, useContext, useEffect } from "react";
  import { ListCategory } from "../../../shared/types/wallpapers-type";
  import categoryService from "../../../services/categoryService";
  import ModalCreateWallpaper from "../../../components/modal/modal-create-wallpaper";
import ModalCreateCategory from "../../../components/modal/modal-create-category";
import { CategoryContext } from "../context/category-context";
  
  interface FilterWallpaperProps {
  }
  
  const FilterCategory: FC<FilterWallpaperProps> = ({}) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isCreateSuccess, setIsCreateSuccess] = useState(false);
    const {categories, filterKeyword} = useContext(CategoryContext)
    const inputRef = useRef<HTMLInputElement>(null);
    const timeoutRef = useRef<number | null>(null);

    const handleInputChange =  () => {
        if (inputRef.current != null) {
          const value = inputRef.current.value.toLowerCase();
          clearTimeout(timeoutRef.current as number); // Clear the previous timeout
          timeoutRef.current = setTimeout(() => {
            const filtered = value.toLowerCase();
            filterKeyword(filtered)
           // Call the filterKeyword function with the keyword
          }, 500);
         
        }
      };


    useEffect(() => {
   
      return () => {
        clearTimeout(timeoutRef.current as number);
      };
    }, []);
    return (
      <>
      <div className="w-full bg-primary rounded p-4">
          <div className="flex">
            <div className="w-2/3">Filter:</div>
          </div>

          <div className="grid grid-cols-3 mt-3 gap-5">
            <FormControl fullWidth>
              <input
                type="text"
                ref={inputRef}
                placeholder="Search by name..."
                className="h-full rounded p-2 text-black"
                onChange={handleInputChange}
              />
            </FormControl>
          </div>

          <div className="grid place-items-end mt-5">
            <button
              className="rounded px-4 py-3 bg-blue-500"
              onClick={handleOpen}
            >
              + Add category
            </button>
          </div>
        </div>
        <ModalCreateCategory
          setIsCreateSuccess={setIsCreateSuccess}
          open={open}
          handleClose={handleClose}
        />
      </>
    );
  };
  
  export default FilterCategory;
  