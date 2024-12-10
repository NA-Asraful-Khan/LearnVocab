import { BsSpeedometer2 } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import { Navigate } from "react-router-dom";

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
    name: "Lessons",
    icon: <GiSettingsKnobs />,
    path: "",
    children: [
      {
        name: "Lessons",
        path: "lessons",
        icon: <GiSettingsKnobs />,
        children: [
          {
            name: "",
            path: "",
            element: "All Lessons",
          },
          {
            name: "Single Lesson",
            path: ":lessonnumber",
            element: "singleLesson",
          },
        ],
      },
    ],
  },
];
