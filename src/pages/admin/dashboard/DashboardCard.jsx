import { BiBookOpen, BiUserCircle } from "react-icons/bi";

import { Link } from "react-router-dom";
import { useGetReportQuery } from "../../../redux/features/user/userManagement.api";
import { FaGraduationCap } from "react-icons/fa";

const CardItem = ({ icon: Icon, title, count, link }) => {
  const Content = (
    <div className="px-4 py-8 rounded-md flex flex-col justify-center items-center bg-[#227DE750]">
      <div className="flex items-center gap-2 font-semibold mb-2">
        <Icon className="text-2xl" />
        <span>{title}</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">{count}</h1>
    </div>
  );

  // Conditionally render the card as a `Link` if the `link` prop is present, otherwise render it as a `div`
  return link ? <Link to={link}>{Content}</Link> : <div>{Content}</div>;
};

const DashboardCard = () => {
  const { data: report } = useGetReportQuery();
  const reportData = report?.data;

  const cardItems = [
    {
      icon: BiUserCircle,
      title: "User",
      count: reportData?.user,
      link: "/admin/user_management",
    },
    {
      icon: BiBookOpen,
      title: "Lesson",
      count: reportData?.lesson,
      link: "/admin/lesson_management",
    },
    {
      icon: FaGraduationCap,
      title: "Vocabulary",
      count: reportData?.vocabulary,
      link: "/admin/vocabulary_management",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
      {cardItems.map((item, index) => {
        if (item?.count > 0) {
          return (
            <CardItem
              key={index}
              icon={item?.icon}
              title={item?.title}
              count={item?.count}
              link={item?.link} // Cards without links won't be wrapped in a `Link`
            />
          );
        }
      })}
    </div>
  );
};

export default DashboardCard;
