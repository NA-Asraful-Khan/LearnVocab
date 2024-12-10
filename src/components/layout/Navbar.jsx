import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = ({ setIsExpanded }) => {
  //   const [dropdownOpen, setDropdownOpen] = useState(false);
  //   const [searchModalOpen, setSearchModalOpen] = useState(false);
  //   const dropdownRef = useRef(null);

  //   const toggleDropdown = () => {
  //     setDropdownOpen(!dropdownOpen);
  //   };

  //   const toggleSearchModal = () => {
  //     setSearchModalOpen(!searchModalOpen);
  //   };

  //   const closeDropdown = () => {
  //     setDropdownOpen(false);
  //   };

  //   useEffect(() => {
  //     const handleClickOutside = (event) => {
  //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //         closeDropdown();
  //       }
  //     };

  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, []);

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
            {/* <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
              <FiMenu size={24} />
            </button> */}
            <Link to={"/"}>
              {/* <img className="max-w-[80px]" src="/Dhuum_Logo.png" alt="" /> */}
              HOME
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* <FiSearch
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
              size={24}
              onClick={toggleSearchModal}
            />
            <ThemeToggle />
            <FiBell
              className="text-gray-600 hover:text-gray-800 cursor-pointer relative"
              size={24}
            /> */}
            {/* <div className="relative" ref={dropdownRef}>
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
             
            </div> */}
            <div className="relative">P</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
