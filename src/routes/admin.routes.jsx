import { BsSpeedometer2 } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import { Navigate } from "react-router-dom";
import UserList from "../pages/admin/userManagement/UserList";
import UserCreate from "../pages/admin/userManagement/UserCreate";
import UserEdit from "../pages/admin/userManagement/UserEdit";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "",
    element: <Navigate to={`/admin/dashboard`} replace={true} />,
  },
  {
    name: "Dashboard",
    path: "dashboard",
    element: "<FacultyDashboard />",
    icon: <BsSpeedometer2 />,
  },
  {
    name: "Management",
    icon: <GiSettingsKnobs />,
    path: "",
    children: [
      {
        name: "User Management",
        path: "user_management",
        icon: <GiSettingsKnobs />,
        children: [
          {
            name: "",
            path: "",
            element: <UserList />,
          },
          {
            name: "Create",
            path: "create",
            element: <UserCreate />,
          },
          {
            name: "Edit",
            path: ":userId",
            element: <UserEdit />,
          },
        ],
      },
    ],
  },
];
