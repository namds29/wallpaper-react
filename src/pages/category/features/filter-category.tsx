import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { FC, useState, useRef, useContext, useEffect } from "react";
import { ListCategory } from "../../../shared/types/wallpapers-type";
import categoryService from "../../../services/categoryService";
import ModalCreateWallpaper from "../../../components/modal/modal-create-wallpaper";
import ModalCreateCategory from "../../../components/modal/modal-create-category";
import { CategoryContext } from "../context/category-context";

interface FilterWallpaperProps {}

const FilterCategory: FC<FilterWallpaperProps> = ({}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  const { categories, filterKeyword, sortAscDesc, sortByField } = useContext(CategoryContext);
  const [sortField, setSortField] = useState<string>("name");
  const [sortType, setSortType] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleInputChange = () => {
    if (inputRef.current != null) {
      const value = inputRef.current.value.toLowerCase();
      clearTimeout(timeoutRef.current as number); // Clear the previous timeout
      timeoutRef.current = setTimeout(() => {
        const filtered = value.toLowerCase();
        filterKeyword(filtered);
        // Call the filterKeyword function with the keyword
      }, 500);
    }
  };
  const handleSortByField = async (e: SelectChangeEvent) => {
    setSortField(e.target.value);
    sortByField(e.target.value);
  };

  const handleSortAscDesc = async (e: SelectChangeEvent) => {
    setSortType(+e.target.value);
    sortAscDesc(+e.target.value);
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

        <div className="flex justify-between mt-4 ">
          <div className="sort flex items-center gap-4">
            <p className="">Sort by:</p>
            <FormControl>
              <Select
                sx={{ backgroundColor: "white", height: 40 }}
                labelId="category"
                id="category"
                value={sortField}
                onChange={handleSortByField}
              >
                <MenuItem value="id">
                  <em>Id</em>
                </MenuItem>
                <MenuItem value="name">
                  <em>Name</em>
                </MenuItem>
                <MenuItem value="createdAt">
                  <em>Created at</em>
                </MenuItem>
                <MenuItem value="updatedAt">
                  <em>Updated at</em>
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <Select
                sx={{ backgroundColor: "white", height: 40 }}
                labelId="category"
                id="category"
                value={sortType.toString()}
                onChange={handleSortAscDesc}
              >
                <MenuItem value="0">
                  <em>Ascending</em>
                </MenuItem>
                <MenuItem value="1">
                  <em>Descending</em>
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <button
            className="rounded px-4 py-3 bg-blue-500"
            onClick={handleOpen}
          >
            + Add category
          </button>
        </div>
      </div>
      {open && (
          <ModalCreateCategory
            isCreateSuccess={isCreateSuccess}
            setIsCreateSuccess={setIsCreateSuccess}
            open={open}
            handleClose={handleClose}
          />
        )}
    </>
  );
};

export default FilterCategory;
