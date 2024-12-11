import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiBook, BiLock } from "react-icons/bi";
import { toast } from "react-toastify";
import { BsMailbox } from "react-icons/bs";
import { useLoginMutation } from "../../redux/features/auth/auth.api";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  setUser,
} from "../../redux/features/auth/auth.slice";
import { verifyToken } from "../../utils/verifyToken";

export default function Login() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("vocabwebsite!@");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const CurrentUser = useSelector(selectCurrentUser);
  // Redirect to  DashBoard If Already Login
  useEffect(() => {
    if (CurrentUser) {
      if (CurrentUser?.needsPasswordChange) {
        navigate("/change-password");
      } else {
        navigate(
          `/${
            CurrentUser?.role === "super-admin" ? "admin" : CurrentUser?.role
          }/dashboard`
        );
      }
    }
  }, [CurrentUser, navigate]);
  // Login Mutation Hook
  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitInfo = {
        email: email,
        password: password,
      };
      const res = await login(submitInfo).unwrap();
      const user = verifyToken(res?.data?.accessToken);
      dispatch(
        setUser({
          user: user,
          token: res?.data?.accessToken,
        })
      );

      toast.success("Successfully Log In");
      navigate("/lessons");
    } catch (error) {
      toast.error(error.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-8">
          <div className="bg-indigo-100 p-3 rounded-full">
            <BiBook className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Welcome back to 日本Learn
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BsMailbox className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="text-sm text-center text-gray-600">
            Demo Credentials:
            <br />
            Admin: admin@demo.com / admin123
            <br />
            User: user@demo.com / user123
          </div>
        </form>
      </div>
    </div>
  );
}
