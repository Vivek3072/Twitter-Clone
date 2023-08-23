import Footer from "../components/footer/Footer";
import Advertisement from "../components/rightbar/Advertisement";
import FollowMore from "../components/rightbar/FollowMore";
import Sidebar from "../components/sidebar/Sidebar";
import { useTheme } from "../hooks/ThemeContext";

const AppLayout = ({ children }) => {
  const { isDarkMode } = useTheme();
  return (
    <>
      <div
        className={`h-full grid md:grid-cols-5 grid-cols-1 md:grid-rows-1 grid-rows-auto px-1 md:px-5 lg:px-20 py-2 md:py-5 gap-[10px] ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="md:col-span-1 col-span-1">
          <Sidebar />
        </div>
        <div className="h-full md:col-span-3 col-span-1 flex flex-row items-start justify-center flex-1 px-1 md:px-10">
          <main className="w-full">{children}</main>
        </div>
        <div className="md:col-span-1 col-span-1 px-1">
          <Advertisement />
          <FollowMore />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AppLayout;
