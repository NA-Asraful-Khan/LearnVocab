import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MainLayout from "./MainLayout";
import Footer from "./Footer";

const Layout = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div>
      <Navbar setIsExpanded={setIsExpanded} />
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <MainLayout isExpanded={isExpanded} />
      <Footer isExpanded={isExpanded} />
    </div>
  );
};

export default Layout;
