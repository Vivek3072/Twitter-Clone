import Footer from "../components/footer/Footer";
import Advertisement from "../components/rightbar/Advertisement";
import FollowMore from "../components/rightbar/FollowMore";
import Spaces from "../components/rightbar/Spaces";
import Sidebar from "../components/sidebar/Sidebar";

const AppLayout = ({ children }) => {
  return (
    <>
      <div className="h-full grid md:grid-cols-5 grid-cols-1 md:grid-rows-1 grid-rows-auto px-1 md:px-20 py-5 gap-[10px]">
        <div className="md:col-span-1 col-span-1">
          <Sidebar />
        </div>
        <div className="h-full md:col-span-3 col-span-1 flex flex-row flex-1">
          <main className="w-full">{children}</main>
        </div>
        <div className="md:col-span-1 col-span-1">
          <Advertisement />
          <Spaces />
          <FollowMore />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AppLayout;
