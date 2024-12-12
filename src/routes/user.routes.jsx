import { BsSpeedometer2 } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import { Navigate } from "react-router-dom";
import Lessons from "../pages/user/Lesson/Lessons";
import LessonDetails from "../pages/user/Lesson/LessonDetails";

export const userPaths = [
  {
    name: "Dashboard",
    path: "",
    element: <Navigate to={`/user/dashboard`} replace={true} />,
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
    path: "lessons",
    multimenu: false,
    children: [
      {
        name: "Lessons",
        path: "",
        icon: <GiSettingsKnobs />,
        element: <Lessons />,
      },
      {
        name: "Lessons",
        path: ":lessonId",
        icon: <GiSettingsKnobs />,
        element: <LessonDetails />,
      },
    ],
  },
];
