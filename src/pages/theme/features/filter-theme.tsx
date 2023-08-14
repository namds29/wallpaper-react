import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useContext} from "react";
import {
  sortByDatePropertyAsc,
  sortByNumericPropertyAsc,
} from "../../../shared/utils/sort";

import { useForm } from "react-hook-form";
import { ThemeContext } from "../context/theme-context";
import { Theme } from "../../../shared/types/themes-types";

interface Props {}

const FilterTheme: FC<Props> = ({}) => {
  const { themes, setThemes, setSearchByName } = useContext(ThemeContext);
  const { register } = useForm();

  const searchByName = (e: any) => {
    const value = e.target.value;
    setSearchByName(value)
  };

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    let sortedThemes: Theme[] = [];

    switch (value) {
      case "asc_createdAt":
        sortedThemes = sortByDatePropertyAsc(themes, "createdAt");
        break;
      case "desc_createdAt":
        sortedThemes = sortByDatePropertyAsc(
          themes,
          "createdAt"
        ).reverse();
        break;
      case "asc_priority":
        sortedThemes = sortByNumericPropertyAsc(themes, "priority");
        break;
      case "desc_priority":
        sortedThemes = sortByNumericPropertyAsc(
          themes,
          "priority"
        ).reverse();
        break;
      default:
        break;
    }

    setThemes([...sortedThemes]);
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
        </div>
      </div>

    </>
  );
};

export default FilterTheme;
