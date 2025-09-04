import AppBar from "@mui/material/AppBar";
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
    </Box>
  );
}
