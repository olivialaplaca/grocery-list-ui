import { Link } from "@tanstack/react-router";
import AppBar from "@mui/material/AppBar";
import Navbar from "./Navbar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

export default function Header(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Box
            component="a"
            sx={{
              display: "flex",
              alignItems: "center",
            }}>
            <img
              src="/olive1.png"
              alt="header logo"
              style={{ height: "50px", marginRight: "8px" }}
            />
          </Box>
          <Button color="inherit">Welcome back, {props.user}!</Button>
        </Toolbar>
      </AppBar>
      <Navbar />
    </Box>
  );
}
