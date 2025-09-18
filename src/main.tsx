import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./state/store.ts";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./index.css";
import routes from "./routes.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <RouterProvider router={router} />

        {/* <BrowserRouter>
          <App />
        </BrowserRouter> */}
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
