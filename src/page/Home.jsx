import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom/dist";

const Home = () => {
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  return (
    <>
      {isHomepage ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <Link to="/albums" className="font-medium text-5xl text-center leading-normal">
            Click here to go to Albums Page
          </Link>
        </div>
      ) : (
        <div className="px-5 my-[50px]">
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Home;
