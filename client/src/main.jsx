import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppLayout from "./layout/AppLayout.jsx";
import App from "./App";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Registration from "./components/auth/Register.jsx";
import Login from "./components/auth/Login.jsx";
import Protected from "./utils/Protected.jsx";
import Message from "./components/message/Message";
import Profile from "./components/profile/Profile";
import People from "./components/people/People";
import ContextLayout from "./layout/ContextLayout";
import { ThemeProvider } from "./hooks/ThemeContext";
import ErrorPage from "./components/error/ErrorPage";

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <Protected>
          <App />
        </Protected>
      </AppLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Registration />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/message",
    element: (
      <AppLayout>
        <Protected>
          <Message />
        </Protected>
      </AppLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: (
      <AppLayout>
        <Protected>
          <Profile />
        </Protected>
      </AppLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/people",
    element: (
      <AppLayout>
        <Protected>
          <People />
        </Protected>
      </AppLayout>
    ),
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ContextLayout>
        <RouterProvider router={router}>
          <Outlet />
        </RouterProvider>
      </ContextLayout>
    </ThemeProvider>
  </React.StrictMode>
);
