import { BiBook } from "react-icons/bi";
import { BsGithub, BsMailbox } from "react-icons/bs";

export default function Footer({ isExpanded }) {
  return (
    <div
      className={`px-3 md:pr-8 lg:pr-12 ${
        isExpanded ? "sm:pl-3 md:pl-[17rem] lg:pl-72" : "sm:pl-3 md:pl-24"
      } fixed bottom-0`}
    >
      <footer className="bg-white shadow-inner mt-auto">
        <div className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2">
                <BiBook className="h-6 w-6 text-indigo-600" />
                <span className="text-xl font-bold text-gray-900">
                  日本Learn
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Learn Japanese vocabulary the easy way
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Contact
              </h3>
              <div className="mt-4 space-y-2">
                <a
                  href="mailto:n.a.asraful.khan@gmail.com"
                  className="text-base text-gray-500 hover:text-indigo-600 flex items-center"
                >
                  <BsMailbox className="h-5 w-5 mr-2" />
                  n.a.asraful.khan@gmail.com
                </a>
                <a
                  href="https://github.com/NA-Asraful-Khan"
                  className="text-base text-gray-500 hover:text-indigo-600 flex items-center"
                  target="_blank"
                >
                  <BsGithub className="h-5 w-5 mr-2" />
                  @NA-Asraful-Khan
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Legal
              </h3>
              <div className="mt-4 space-y-2">
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-indigo-600"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-indigo-600"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-center text-base text-gray-400">
              &copy; 2024 日本Learn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
