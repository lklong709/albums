import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Card from "./Card";
import { useDispatch } from "react-redux";
import albumsSlice from "../redux/albumsSlice";
import Button from "./Button";

const Photos = ({ photos, onAdd, albumId }) => {
  const [index, setIndex] = useState(-1);

  const dispatch = useDispatch();

  const slides = photos?.map((o) => {
    return { src: o.photoUrl, type: "custom-slide", title: o.photoAlt };
  });

  return (
    <>
      <div className="grid grid-cols-1 max-w-[320px] sm:grid-cols-2 sm:max-w-[680px] lg:grid-cols-3 gap-6 lg:max-w-[1000px] mx-auto">
        <div className="border rounded">
          <Button
            style={"thumbAddNew"}
            type={"button"}
            onClick={onAdd}
            title="Add Photo"
          />
        </div>
        {photos?.map((o, index) => (
          <Card
            key={o.photoId}
            love={o.love}
            id={o.photoId}
            imgUrl={o.photoUrl}
            onClick={() => setIndex(index)}
          >
            <div className={`top-0 right-0 absolute z-10`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-5 -5 132.88 117.39"
                height="55px"
                width="55px"
                version="1.1"
                className={`p-3 cursor-pointer`}
                onClick={() => {
                  dispatch(
                    albumsSlice.actions.updatePhotoLove({
                      albumId: albumId,
                      photoId: o.photoId,
                    })
                  );
                }}
              >
                <path
                  stroke={`#fff`}
                  fill={`${o.love ? "#dc2626" : "none"}`}
                  strokeWidth={8}
                  d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z"
                />
              </svg>
            </div>
          </Card>
        ))}
      </div>
      <Lightbox
        slides={slides}
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        render={{
          slide: ({ slide }) =>
            slide.type === "custom-slide" ? (
              <div>
                <img src={slide.src} alt={slide.title} />
              </div>
            ) : undefined,
        }}
      />
    </>
  );
};

export default Photos;
