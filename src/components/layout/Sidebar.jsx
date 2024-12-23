import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import { FaSignInAlt } from "react-icons/fa";

import { useEffect, useState } from "react";
import { sidebarItemsGenerator } from "../../utils/sidebarItemGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { useSelector } from "react-redux";
import { useCurrentToken } from "../../redux/features/auth/auth.slice";
import { verifyToken } from "../../utils/verifyToken";
import { userPaths } from "../../routes/user.routes";

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const token = useSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }

  let SidebarRoute;
  switch (user?.role) {
    case "admin":
      SidebarRoute = sidebarItemsGenerator(adminPaths, "admin");
      break;

    case "user":
      SidebarRoute = sidebarItemsGenerator(userPaths, "user");
      break;

    default:
      break;
  }

  const [menuItem, setMenuItem] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsExpanded]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    setToggleMenu(false);
  };

  const handleMouseEnter = () => {
    if (!isExpanded) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isExpanded) {
      setIsHovered(false);
      setToggleMenu(false);
    }
  };

  const handleMenuClick = (index) => {
    if (menuItem === index) {
      setToggleMenu(!toggleMenu);
    } else {
      setMenuItem(index);
      setToggleMenu(true);
    }
  };

  const handleLinkClick = (index) => {
    setMenuItem(index);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-[0_35px_30px_0px_rgba(0,0,0,0.3)] z-50 ${
        isExpanded || isHovered
          ? "w-64"
          : "w-16 opacity-0 md:opacity-100 max-md:pointer-events-none"
      } transition-all duration-500 ease-in`}
    >
      <div className={`relative items-center p-4 justify-center gap-2`}>
        <div
          className={`text-blue-500 text-xl transition-opacity duration-300 flex justify-center transform ${
            isExpanded || isHovered ? "opacity-100" : "opacity-0 "
          }`}
        >
          <img className="max-w-[130px]" src="/Dhuum_Logo.png" alt="" />
        </div>
        <button
          className={`${
            isExpanded || isHovered
              ? "rotate-180 rounded-tl-[5px] rounded-bl-[5px]"
              : "rotate-0 rounded-tr-[5px] rounded-br-[5px]"
          } focus:outline-none absolute right-[-32px] top-0 bg-black text-white py-4 px-2 `}
          onClick={toggleSidebar}
        >
          <FaSignInAlt className={``} />
        </button>
      </div>

      <div
        className={`p-4 text-black overflow-y-auto  ${
          isExpanded || isHovered ? "scrollbar-custom" : "scrollbar-hide"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ maxHeight: "calc(90vh - 80px)" }}
      >
        <ul>
          {SidebarRoute?.filter((item) => item.access).map((item, index) => (
            <li key={index} className="items-center mb-4 block ">
              {item?.content ? (
                <>
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => handleMenuClick(index)}
                  >
                    <button
                      className={`hover:text-blue-500 flex justify-center items-center gap-2 text-lg ${
                        menuItem === index && "text-blue-500"
                      }`}
                    >
                      <span className="min-w-[30px]">{item.icon}</span>
                      <span
                        className={`${
                          isExpanded || isHovered
                            ? "opacity-100 block"
                            : "opacity-0 hidden"
                        } transition-opacity duration-300 transform ${
                          isExpanded || isHovered
                            ? "translate-x-0"
                            : "translate-x-[-10px] hidden"
                        }`}
                      >
                        {item.name}
                      </span>
                    </button>
                    {(isExpanded || isHovered) &&
                      (toggleMenu && menuItem === index ? (
                        <BiChevronUp />
                      ) : (
                        <BiChevronDown />
                      ))}
                  </div>
                  <ul
                    className={`transition-all duration-300 ease-in-out overflow-hidden pl-5  ${
                      toggleMenu && menuItem === index
                        ? "max-h-[500px] opacity-100 pt-2"
                        : "max-h-0 opacity-0"
                    } `}
                  >
                    {item?.children
                      ?.filter((subItem) => subItem.access)
                      .map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="flex items-center mb-2 w-full"
                        >
                          {subItem.icon}
                          <span
                            className={`${
                              isExpanded || isHovered
                                ? "opacity-100 block"
                                : "opacity-0 hidden"
                            } transition-opacity duration-300 transform ${
                              isExpanded || isHovered
                                ? "translate-x-0"
                                : "translate-x-[-10px]"
                            }`}
                          >
                            {subItem.name}
                          </span>
                        </li>
                      ))}
                  </ul>
                </>
              ) : (
                // <Link to={`/admin${item.path}`}>
                //   <button
                //     className={`flex justify-center items-center gap-2 text-lg hover:text-blue-500 ${
                //       menuItem === index && "text-blue-500"
                //     }`}
                //     onClick={() => {
                //       handleLinkClick(index);
                //     }}
                //   >

                //   </button>
                // </Link>
                <button
                  className={`flex justify-center items-center gap-2 text-lg hover:text-blue-500 ${
                    menuItem === index && "text-blue-500"
                  }`}
                  onClick={() => {
                    handleLinkClick(index);
                  }}
                >
                  <span className="min-w-[30px]">{item.icon}</span>
                  <span
                    className={`${
                      isExpanded || isHovered
                        ? "opacity-100 block"
                        : "opacity-0 hidden"
                    } transition-opacity duration-300 transform ${
                      isExpanded || isHovered
                        ? "translate-x-0"
                        : "translate-x-[-10px]"
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={`relative items-center p-4 justify-center gap-2`}></div>
    </div>
  );
};

export default Sidebar;
