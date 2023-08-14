import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import {
  Dashboard as DashboardIcon,
  Assessment as ReportIcon,
  ShoppingBasket as OrderIcon,
  Animation as AnimationIcon
} from "@mui/icons-material";

const Sidebar = ({ menuOpen }: any) => {
    const menuItem = [
      { title: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
      { title: "Theme", icon: <ReportIcon />, route: "/theme" },
      { title: "Wallpaper", icon: <OrderIcon />, route: "/wallpaper" },
      { title: "Animation", icon: <AnimationIcon />, route: "/animation" },
    ]
    return (
        <div className={styles.sidebar}>
            {menuItem.map((item,index) => (
                <nav key={index}  aria-label="main mailbox folders" style={{ padding: 0 }}>
                    <Link to={item.route} className={styles.link}>
                        <div className={styles['menu-sidebar']}>
                            <div className={styles['icon-sidebar']}>
                                {item.icon}
                            </div>
                            <div className={menuOpen ? styles['menu--text'] : styles['menu--text-closed']}>{item.title} </div>
                        </div>
                    </Link>
                </nav>
            ))}


        </div>
    );
};

export default Sidebar;
