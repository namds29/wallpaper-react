import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useEffect, useState, useRef } from "react";
import { ListCategory } from "../../../shared/types/wallpapers-type";
import categoryService from "../../../services/categoryService";
import ModalCreateWallpaper from "../../../components/modal/modal-create-wallpaper";

interface FilterWallpaperProps {
  updateCategoryId: (id: number) => void;
  filterKeyword: (keyword: string) => void;
  filterType: (type: number) => void;
  sortByField: any;
  sortAscDesc: any;
  isLoading: boolean;
  setIsLoading: any;
}

const FilterWallpaper: FC<FilterWallpaperProps> = ({
  updateCategoryId,
  filterKeyword,
  filterType,
  sortByField,
  sortAscDesc,
  isLoading,
  setIsLoading,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [categoryList, getCategoryList] = useState<ListCategory[]>([]);
  const [categoryName, setCategoryName] = useState<string>("Category");
  const [sortField, setSortField] = useState<string>("name");
  const [sortType, setSortType] = useState<number>(0);
  const [type, setType] = useState<string>("Type");
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const getListCategory = async () => {
    const token = localStorage.getItem("token") ?? "";
    const listCategory = await categoryService.getCategoryList(token);
    getCategoryList(listCategory);
  };

  const handleOpenModal = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleChange = async (event: SelectChangeEvent) => {
    setIsLoading(true);
    let value = event.target.value;
    if (value == "All") {
      setCategoryName("");
      value = "";
    }
    if (event.target.value == "All") setCategoryName("");
    setCategoryName(event.target.value);
    updateCategoryId(Number(value));
  };

  const handleSortByField = async (e: SelectChangeEvent) => {
    setSortField(e.target.value);
    sortByField(e.target.value)
  };

  const handleSortAscDesc = async (e: SelectChangeEvent) => {
    setSortType(+e.target.value);
    sortAscDesc(+e.target.value)
  };

  const filterCategoryType = (event: SelectChangeEvent) => {
    let value = event.target.value;
    if (value == "All") {
      setType("");
      value = "";
    }
    setType(event.target.value);
    filterType(Number(value));
  };
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

  useEffect(() => {
    getListCategory();
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
            <Select
              sx={{ backgroundColor: "white", height: 40 }}
              labelId="category"
              id="category"
              value={categoryName}
              onChange={handleChange}
            >
              <MenuItem value="Category" disabled>
                <em>Category</em>
              </MenuItem>
              <MenuItem value="All">
                <em>All</em>
              </MenuItem>
              {categoryList &&
                categoryList.map((item, index) => (
                  <MenuItem key={item.name} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <input
              type="text"
              ref={inputRef}
              placeholder="Search by name..."
              className="h-full rounded p-2 text-black"
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <Select
              sx={{ backgroundColor: "white", height: 40 }}
              labelId="category"
              id="category"
              value={type}
              onChange={filterCategoryType}
            >
              <MenuItem value="Type" disabled>
                <em>Type</em>
              </MenuItem>
              <MenuItem value="All">
                <em>All</em>
              </MenuItem>
              <MenuItem value="1">
                <em>Single Image</em>
              </MenuItem>
              <MenuItem value="2">
                <em>Double Image</em>
              </MenuItem>
              <MenuItem value="3">
                <em>Video</em>
              </MenuItem>
            </Select>
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
                <MenuItem value="price">
                  <em>Price</em>
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
            className="rounded px-3 py-2 text-sm bg-blue-500"
            onClick={handleOpenModal}
          >
            + Add new picture
          </button>
        </div>
      </div>
      {isOpen && (
        <ModalCreateWallpaper open={isOpen} handleClose={handleClose} />
      )}
    </>
  );
};

export default FilterWallpaper;
