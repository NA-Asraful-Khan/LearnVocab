import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";

import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";

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
    element: "<Login />",
  },
  {
    path: "/change-password",
    element: "<ChangePassword />",
  },
  {
    path: "/register",
    element: "<Register />",
  },
]);

export default router;
