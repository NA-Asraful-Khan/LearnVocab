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
  },
  {
    name: "Lessons",
    path: "",
    children: [
      {
        name: "Lessons",
        path: "lessons",
        children: [
          {
            name: "lessons",
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
