import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "../Header";
import Navbar from "../Navbar";
import Footer from "../Footer";

export const Route = createRootRoute({
  component: () => {
    const [userName, setUserName] = useState("Olivia");
    return (
      <>
        <Header user={userName} />
        <Navbar />
        <Outlet />
        <Footer />
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  },
});
