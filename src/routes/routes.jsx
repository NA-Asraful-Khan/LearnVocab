import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";

import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import Error from "../pages/Error/Error";
import Login from "../pages/auth/Login";
import { userPaths } from "./user.routes.jsx";
import Register from "../pages/auth/Register.jsx";
import ChangePassword from "../pages/auth/ChangePassword.jsx";
import ProtectedRoute from "../components/layout/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={`/login`} replace={true} />,
    children: [
      {
        path: "about",
        element: "<About />",
      },
      {
        path: "contact",
        element: "<Contact />",
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths),
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/change_password",
    element: <ChangePassword />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
