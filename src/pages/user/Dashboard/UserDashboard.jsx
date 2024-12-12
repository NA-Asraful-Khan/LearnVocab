import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../../redux/features/auth/auth.slice";
import { useSelector } from "react-redux";
import { FaUserShield } from "react-icons/fa";

export default function UserDashboard() {
  const user = useSelector(selectCurrentUser);

  const adminFeatures = [
    {
      title: "Start Lesson",
      description: "View All Lesson",
      icon: FaUserShield,
      link: "/user/lessons",
    },
    {
      title: "Watch Tutorial",
      description: "View Tutorial",
      icon: FaUserShield,
      link: "/user/lessons",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto mb-7">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, {user?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              to={feature.link}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h2>
                  <p className="text-gray-500 mt-1">{feature.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
