import { Link } from "react-router-dom/dist";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-3">404 - Page Not Found</h1>
        <p className="mb-5">The requested page does not exist.</p>
        <Link to="/albums" className="rounded bg-green-500 text-white inline-block border py-3 px-5 font-semibold">Back to ALbums</Link>
      </div>
    </div>
  );
};

export default NotFound;
