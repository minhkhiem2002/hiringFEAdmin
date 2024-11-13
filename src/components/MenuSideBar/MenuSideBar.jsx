import React, { useEffect, useState } from "react";
import { ListItem, ListItemButton, ListItemIcon, Stack, Tooltip } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import menuData from "../../ultils/menuitem";
import LogoApp from "../../assets/images/logo_img.png";
import LogoDtSoft from "../../assets/images/logo_res_img.png";

function MenuSideBar({ props }) {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [activePath, setActivePath] = useState(""); 
  const menuItems = menuData['qlgm'] || []; 

  const handleClick = (path) => {
    setActivePath(path); 
    navigate(`/${path}`); 
  };

  const handleLogoClick = () => {
    setActivePath(""); 
    navigate("/");
  };

  useEffect(() => {
    const path = location.pathname.replace("/", ""); 
    if (path) {
      setActivePath(path);
    }
  }, [location.pathname]); 

  return (
    <div className="h-full">
      <div
        style={{ height: "calc(100% / 12)" }}
        className="flex justify-center items-center "
      >
        <img
          className="w-32 h-14 object-contain cursor-pointer" 
          src={props ? LogoDtSoft : LogoApp}
          alt="logo"
          onClick={handleLogoClick}
        />
      </div>
      <div className="text-black decoration-none truncate w-full">
        {menuItems.map(({ text, icon, path }) => (
          <ListItem
            key={text}
            disablePadding
            disableGutters
            sx={{ textDecoration: 'none' }}
          >
            <Tooltip
              title={!props ? "" : text} 
              placement="right"
              arrow
              disableHoverListener={!props} 
            >
              <ListItemButton
                onClick={() => handleClick(path)}
                sx={{
                  display: 'flex',
                  justifyContent: props ? 'center' : 'start',
                  alignItems: 'center',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  backgroundColor: activePath === path ? '#4590FF' : 'transparent', 
                  '&:hover': {
                    backgroundColor: '#4cc7ff36',
                  },
                  color: activePath === path ? 'white' : 'inherit', 
                  paddingLeft: props ? '' : '0px'
                }}
              >
                <ListItemIcon
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: props ? '0%' : '10%',
                    color: activePath === path ? 'white' : 'inherit', 
                    '& img': {
                      filter: activePath === path ? 'invert(100%)' : 'none', 
                    },
                  }}
                >
                  <img src={icon} alt="icon" width={20} />
                  {!props && (
                    <span className={`pl-1 truncate ${activePath === path ? 'text-white' : ''} text-base`}>
                      {text}
                    </span>
                  )}
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </div>
    </div>
  );
}

export default MenuSideBar;
