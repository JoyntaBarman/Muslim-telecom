import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import HomeRoutes from "./routes/HomeRoutes.jsx";
import { Toaster } from "react-hot-toast";
import Provider from "./provider/Provider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider>
      <StrictMode>
        <HomeRoutes />
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 2000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 2000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </StrictMode>
    </Provider>
  </BrowserRouter>
);
