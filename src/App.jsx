import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { CssBaseline } from "@mui/material";

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

function App() {
  return (
    <StrictMode>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
