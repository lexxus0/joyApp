import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { IoIosHome } from "react-icons/io";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ marginRight: 2, marginLeft: 3 }}
      >
        <IoIosHome />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
        }}
      >
        <div>
          <Typography variant="h6" sx={{ padding: 2 }}>
            Dashboard
          </Typography>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{/* <HomeIcon /> */}</ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{/* <SettingsIcon /> */}</ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{/* <LogoutIcon /> */}</ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
