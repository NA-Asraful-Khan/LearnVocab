import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import ProfileDropDownCard from "./ProfileDropDownCard/ProfileDropDownCard";
import { useEffect, useRef, useState } from "react";
import { BiBook } from "react-icons/bi";

const Navbar = ({ setIsExpanded }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [searchModalOpen, setSearchModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // const toggleSearchModal = () => {
  //   setSearchModalOpen(!searchModalOpen);
  // };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left Side */}
          <div className="flex items-center space-x-4 md:invisible">
            <button
              onClick={() => {
                setIsExpanded(true);
              }}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <FiMenu size={24} />
            </button>
          </div>
          {/* Left Side */}
          <div className="flex items-center space-x-4">
            <Link to={"/admin"}>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center space-x-2">
                  <BiBook className="h-6 w-6 text-indigo-600" />
                  <span className="text-xl font-bold text-gray-900">
                    日本Learn
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <div className="relative" ref={dropdownRef}>
              <img
                onClick={toggleDropdown}
                className="w-8 h-8 rounded-full cursor-pointer"
                src="/fallBack_Image.jpg"
                alt="User avatar"
              />
              <ProfileDropDownCard
                dropdownOpen={dropdownOpen}
                onClose={closeDropdown}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
