import { AppBar, Toolbar, IconButton, Typography, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./header.module.scss";
import DropdownHeader from "../../dropdown/dropdown-header";

const Header = ({ handleMenuToggle }: any) => {
  return (
    <>
      <AppBar position="sticky" className={styles["app-bar"]}>
        <Toolbar>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuToggle}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={styles.title}>
                Finger Front End
              </Typography>
            </div>

            <div className="flex">
              <Avatar>N</Avatar>
              <DropdownHeader />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
