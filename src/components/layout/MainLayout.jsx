import { Outlet } from "react-router-dom";

export default function MainLayout({ isExpanded }) {
  return (
    <div
      className={`h-[80vh] px-3 md:pr-8 lg:pr-12 overflow-auto ${
        isExpanded ? "sm:pl-3 md:pl-[17rem] lg:pl-72" : "sm:pl-3 md:pl-24"
      }`}
    >
      <Outlet />
    </div>
  );
}
