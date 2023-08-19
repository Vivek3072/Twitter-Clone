import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppLayout from "./layout/AppLayout.jsx";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Registration from "./components/auth/Register.jsx";
import Login from "./components/auth/Login.jsx";
import Protected from "./utils/Protected.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <Protected />
      </AppLayout>
    ),
    errorElement: <div>Error Page</div>,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <div>Error Page</div>,
  },
  {
    path: "/register",
    element: <Registration />,
    errorElement: <div>Error Page</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  </React.StrictMode>
);
