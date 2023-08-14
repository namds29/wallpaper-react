import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useContext } from "react";
import {
  sortByDatePropertyAsc,
  sortByNumericPropertyAsc,
} from "../../../shared/utils/sort";

import { useForm } from "react-hook-form";
import { WallpaperContext } from "../context/wallpaper-context";
import { WallpaperDetail } from "../../../shared/types/wallpapers-type";

interface Props {}

const FilterAnimation: FC<Props> = ({}) => {
  const { wallpapers, setWallpapers, setSearchByName } =
    useContext(WallpaperContext);
  const { register } = useForm();

  const searchByName = (e: any) => {
    const value = e.target.value;
    setSearchByName(value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    let sortedWallpapers: WallpaperDetail[] = [];

    switch (value) {
      case "asc_createdAt":
        sortedWallpapers = sortByDatePropertyAsc(wallpapers, "createdAt");
        break;
      case "desc_createdAt":
        sortedWallpapers = sortByDatePropertyAsc(
          wallpapers,
          "createdAt"
        ).reverse();
        break;
      case "asc_priority":
        sortedWallpapers = sortByNumericPropertyAsc(wallpapers, "priority");
        break;
      case "desc_priority":
        sortedWallpapers = sortByNumericPropertyAsc(
          wallpapers,
          "priority"
        ).reverse();
        break;
      case "asc_downloadCount":
        sortedWallpapers = sortByNumericPropertyAsc(
          wallpapers,
          "downloadCount"
        );
        break;
      case "desc_downloadCount":
        sortedWallpapers = sortByNumericPropertyAsc(
          wallpapers,
          "downloadCount"
        ).reverse();

        break;
      default:
        break;
    }
    setWallpapers([...sortedWallpapers]);
  };
  return (
    <>
      <div className="w-full bg-primary rounded p-4">
        <div className="grid grid-cols-3 mt-3 gap-5">
          <input
            type="text"
            placeholder="Search by name..."
            className="rounded pl-2 text-black"
            {...register("name", { onChange: (e) => searchByName(e) })}
          />
          <FormControl fullWidth>
            <InputLabel
              sx={{
                color: "white",
                top: "-10px",
                left: "-15px",
                fontSize: "1.2rem",
              }}
              id="createdAt"
            >
              Sort by Created time:
            </InputLabel>
            <Select
              sx={{ backgroundColor: "white", height: 40 }}
              labelId="createdAt"
              id="createdAt"
              defaultValue="asc_createdAt"
              onChange={handleChange}
            >
              <MenuItem value="asc_createdAt">
                <em>Ascending </em>
              </MenuItem>
              <MenuItem value="desc_createdAt">
                <em>Descending </em>
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                color: "white",
                top: "-10px",
                left: "-15px",
                fontSize: "1.2rem",
              }}
              id="priority"
            >
              Sort by Priority:
            </InputLabel>
            <Select
              sx={{ backgroundColor: "white", height: 40 }}
              labelId="priority"
              id="priority"
              defaultValue="asc_priority"
              onChange={handleChange}
            >
              <MenuItem value="asc_priority">
                <em>Ascending </em>
              </MenuItem>
              <MenuItem value="desc_priority">
                <em>Descending </em>
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                color: "white",
                top: "-10px",
                left: "-15px",
                fontSize: "1.2rem",
              }}
              id="downloadCount"
            >
              Sort by Download:
            </InputLabel>
            <Select
              sx={{ backgroundColor: "white", height: 40 }}
              labelId="downloadCount"
              id="downloadCount"
              defaultValue="asc_downloadCount"
              onChange={handleChange}
            >
              <MenuItem value="asc_downloadCount">
                <em>Ascending </em>
              </MenuItem>
              <MenuItem value="desc_downloadCount">
                <em>Descending </em>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* <div className="grid place-items-end mt-5">
          <button
            className="rounded px-3 py-2 text-sm bg-blue-500"
            onClick={handleOpenModal}
          >
            + Add new picture
          </button>
        </div> */}
      </div>
      {/* {isOpen && (
        <ModalCreateWallpaper open={isOpen} handleClose={handleClose} />
      )} */}
    </>
  );
};

export default FilterAnimation;
