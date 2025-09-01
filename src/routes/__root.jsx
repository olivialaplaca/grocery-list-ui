import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MealPlanContext } from "../contexts";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ab97d6",
    },
  },
});

export const Route = createRootRoute({
  component: () => {
    const [userName, setUserName] = useState("Olivia");
    const mealPlanHook = useState([]);
    return (
      <ThemeProvider theme={theme}>
        <MealPlanContext.Provider value={mealPlanHook}>
          <Header user={userName} />
          <Outlet />
          <Footer />
        </MealPlanContext.Provider>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </ThemeProvider>
    );
  },
});
