import { BsSpeedometer2 } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import { Navigate } from "react-router-dom";
import UserList from "../pages/admin/userManagement/UserList";
import UserCreate from "../pages/admin/userManagement/UserCreate";
import UserEdit from "../pages/admin/userManagement/UserEdit";
import LessonList from "../pages/admin/lessonManagement/LessonList";
import LessonCreate from "../pages/admin/lessonManagement/LessonCreate";
import LessonEdit from "../pages/admin/lessonManagement/LessonEdit";
import VocabularyList from "../pages/admin/vocabularyManagement/VocabularyList";
import VocabularyCreate from "../pages/admin/vocabularyManagement/VocabularyCreate";
import VocabularyEdit from "../pages/admin/vocabularyManagement/VocabularyEdit";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "",
    element: <Navigate to={`/admin/dashboard`} replace={true} />,
  },
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
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
      {
        name: "Lesson Management",
        path: "lesson_management",
        icon: <GiSettingsKnobs />,
        children: [
          {
            name: "",
            path: "",
            element: <LessonList />,
          },
          {
            name: "Create",
            path: "create",
            element: <LessonCreate />,
          },
          {
            name: "Edit",
            path: ":lessonId",
            element: <LessonEdit />,
          },
        ],
      },
      {
        name: "Vocabulary Management",
        path: "vocabulary_management",
        icon: <GiSettingsKnobs />,
        children: [
          {
            name: "",
            path: "",
            element: <VocabularyList />,
          },
          {
            name: "Create",
            path: "create",
            element: <VocabularyCreate />,
          },
          {
            name: "Edit",
            path: ":vocabularyId",
            element: <VocabularyEdit />,
          },
        ],
      },
    ],
  },
];
