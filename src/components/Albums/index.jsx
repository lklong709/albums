import { useDispatch } from "react-redux";
import Card from "../Card";
import albumsSlice from "../../redux/albumsSlice";

function Albums({ albums, children }) {
  const dispath = useDispatch();

  return (
    <>
      <div className="grid grid-cols-1 max-w-[320px] sm:grid-cols-2 sm:max-w-[680px] lg:grid-cols-3 gap-6 lg:max-w-[1000px] mx-auto">
        {children}
        {albums.map((o) => (
          <Card
            key={o.albumId}
            id={o.albumId}
            imgUrl={o.photos[0]?.photoUrl}
            title={o.albumName}
            des={`${o.photos.length} photo${o.photos.length > 1 ? "s" : ""}`}
          >
            <div className="px-3 py-3 border-t">
              <button
                type="button"
                className="outline-0"
                onClick={() => {
                  dispath(
                    albumsSlice.actions.updateLikeAlbum({ id: o.albumId })
                  );
                }}
              >
                <svg
                  height="32px"
                  width="32px"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-6 -6 60 60 "
                >
                  <path
                    stroke="#facc15"
                    strokeWidth={3}
                    fill={`${o.favorite ? "#facc15" : "#ffffff"}`}
                    d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
	c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
	c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
	c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
	c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
	C22.602,0.567,25.338,0.567,26.285,2.486z"
                  />
                </svg>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Albums;
