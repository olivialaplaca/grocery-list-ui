import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Link } from "@tanstack/react-router";

const drawerWidth = 240;

export default function Navbar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}>
      <ul className="nav-list">
        <li>
          <Link to="/ingredients" className="text-link">
            Kitchen Inventory
          </Link>
        </li>
        <li>
          <Link to="/allrecipes" className="text-link">
            Recipe Box
          </Link>
        </li>
        <li>
          <Link to="/mealplanner" className="text-link">
            Meal Planner
          </Link>
        </li>
        <li>
          <Link to="/groceries" className="text-link">
            Grocery List
          </Link>
        </li>
      </ul>
    </Drawer>
  );
}
