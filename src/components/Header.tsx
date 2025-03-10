import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <header
      className={`px-20 w-full h-[80px] bg-blue-200 flex items-center ${
        location.pathname === "/" ? " justify-end" : ""
      }`}
    >
      <div className="">
        {location.pathname === "/" ? (
          <Link
            to={"/add"}
            className="w-[320px] h-[40px] bg-white p-3 rounded-2xl drop-shadow-md hover:bg-gray-100"
          >
            Add Book
          </Link>
        ) : (
          <Link
            to={"/"}
            className=" w-[320px] h-[40px] bg-white p-3 rounded-2xl drop-shadow-md hover:bg-gray-100"
          >
            Back
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
