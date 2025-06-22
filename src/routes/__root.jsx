import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Route = createRootRoute({
  component: () => {
    const [userName, setUserName] = useState("Olivia");
    return (
      <>
        <div className="wrapper">
          <div>
            <Header user={userName} />
            <Navbar />
          </div>
          <Outlet />
          <Footer />
        </div>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  },
});
