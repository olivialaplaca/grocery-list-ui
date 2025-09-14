import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MealPlanContext } from "../contexts";
import AppTheme from "../AppTheme";
import { Box, CssBaseline, Toolbar } from "@mui/material";

export const Route = createRootRoute({
  component: () => {
    const [userName, setUserName] = useState("Olivia");
    const mealPlanHook = useState([]);
    return (
      <AppTheme>
        <MealPlanContext.Provider value={mealPlanHook}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Header user={userName} />
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar />
              <Outlet />
              <Footer />
            </Box>
          </Box>
        </MealPlanContext.Provider>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </AppTheme>
    );
  },
});
