import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuSideBar from "../../components/MenuSideBar/MenuSideBar";
import HeaderSideBar from "../../components/HeaderSidebar/HeaderSideBar";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  let handleLogout = () => {
    navigate("/login");
  };
  let handleChangeSystem = () => {
    navigate("/phan-he");
  };

  return (
    <div className="h-full w-full bg-slate-100">
      <Grid container>
        <Grid
          item
          className={`h-full ${expanded ? "w-[56px]" : "w-[14%]"} sticky top-0 transition-all`}
        >
          <MenuSideBar props={expanded}/>
        </Grid>
        <Grid
          item
          className={`h-full ${
            expanded ? "w-[calc(100%-56px)]" : "w-[calc(100%-14%)]"
          } transition-all`}
        >
          <Grid container spacing={0} className="h-full">
            <Grid
              container
              item
              xs={12}
              className = 'h-14 items-center'
            >
              <HeaderSideBar expanded={expanded} setExpanded={setExpanded} />
            </Grid>
            <Grid
              item
              xs={12}
              className="pr-6 pb-4 h-[calc(100%-56px)]"
            >
              {children}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Sidebar;

