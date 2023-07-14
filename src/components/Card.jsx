import { Link } from "react-router-dom";
import LazyImageWithLoading from "./LazyImageWithLoading";

function Card({ imgUrl, title, des, favorite, id, onClick, children }) {
  return (
    <div className="rounded overflow-hidden border flex flex-col justify-between relative select-none">
      <div>
        {title ? (
          <Link
            to={title}
            state={{ albumId: id, title: title }}
            className="block w-full h-[200px]"
          >
            <LazyImageWithLoading
              classes="w-full h-full object-cover"
              alt={title}
              src={imgUrl}
            />
          </Link>
        ) : (
          <div className="block w-full h-[200px]">
            <LazyImageWithLoading
              classes="w-full h-full object-cover cursor-pointer"
              onClick={onClick && onClick}
              alt={title}
              src={imgUrl}
            />
          </div>
        )}
        {title && (
          <div className="p-5">
            <Link
              to={title}
              state={{ albumId: id, title: title }}
              className="text-lg capitalize font-medium mb-1"
            >
              {title}
            </Link>
            <p className="text-gray-400">{des}</p>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
export default Card;
