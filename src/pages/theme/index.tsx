
import { FC, useState } from "react";
import FetchTheme from "./features/fetch-theme";
import { ThemeProvider } from "./context/theme-context";
import ModalCreateTheme from "./features/modal-create-theme";
import FilterTheme from "./features/filter-theme";



interface pageProps {}

const Theme: FC<pageProps> = ({}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <ThemeProvider>
      <div>
        <FilterTheme />
        <div className="text-right my-3">
          <button
            className="rounded px-4 py-3 bg-blue-500 "
            onClick={handleOpen}
          >
            + Add Theme
          </button>
        </div>
        {open && (
          <ModalCreateTheme
            setIsCreateSuccess={setIsCreateSuccess}
            open={open}
            handleClose={handleClose}
          />
        )}
        <FetchTheme />
      </div>
    </ThemeProvider>
  );
};

export default Theme;
