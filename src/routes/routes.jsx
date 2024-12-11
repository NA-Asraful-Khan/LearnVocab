import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";

import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import Error from "../pages/Error/Error";
import Login from "../pages/auth/Login";
import { userPaths } from "./user.routes.jsx";
import Register from "../pages/auth/Register.jsx";

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
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: <App />,
    children: routeGenerator(userPaths),
  },
  //   {
  //     path: "/faculty",
  //     element: (
  //       <ProtectedRoute role="faculty">
  //         <App />
  //       </ProtectedRoute>
  //     ),
  //     children: routeGenerator(facultyPaths),
  //   },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/change-password",
    element: "<ChangePassword />",
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
