import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdWifiPassword } from "react-icons/md";
import { logout } from "../../../redux/features/auth/auth.slice";

export default function ProfileDropDownCard({ dropdownOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      className={`z-50 absolute right-0 mt-2 w-64 bg-white text-black rounded-md shadow-lg transition-all duration-500 ${
        dropdownOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="p-4 flex items-center space-x-3">
        <img
          className="w-10 h-10 rounded-full"
          src="/fallBack_Image.jpg"
          alt="User avatar"
        />
      </div>
      <hr />

      <Link
        to={`/change_password`}
        className="flex items-center px-4 py-2 hover:bg-gray-200"
        onClick={onClose}
      >
        <MdWifiPassword className="mr-2" /> Change Password
      </Link>

      <hr />
      <a
        href="#"
        className="flex items-center px-4 py-2 hover:bg-gray-200 text-red-500"
        onClick={() => {
          handleLogout();
          onClose();
        }}
      >
        <BiLogOut className="mr-2" /> Logout
      </a>
    </div>
  );
}
