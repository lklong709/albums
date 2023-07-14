import AlbumsList from "../components/Albums";
import { useDispatch, useSelector } from "react-redux";
import { ModalSelector, albumsSelector } from "../redux/selectors";
import Modal from "../components/Modal";
import AlbumForm from "../components/AlbumForm";
import modalSlice from "../redux/modalSlice";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import albumsSlice from "../redux/albumsSlice";
import { Link } from "react-router-dom";

function Albums() {
  const albums = useSelector(albumsSelector);
  const isOpen = useSelector(ModalSelector);
  const dispath = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      fetchMoreItems();
    }
  }, [isLoading]);

  const fetchMoreItems = () => {
    dispath(albumsSlice.actions.loadMoreAlbum());
    setIsLoading(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setIsLoading(true);
    }
  };

  const handleOpenModal = () => {
    dispath(modalSlice.actions.openModal());
  };

  const handleCloseModal = () => {
    dispath(modalSlice.actions.closeModal());
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      <Link
        to="/"
        className="inline-flex items-center border rounded p-3 me-4 mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="17"
          viewBox="0 0 13.496 11.21"
        >
          <path
            d="M12.737,46.22l.021,0H3.727L6.566,43.38a.746.746,0,0,0,0-1.048l-.442-.442a.739.739,0,0,0-1.043,0L.215,46.755a.744.744,0,0,0,0,1.047l4.867,4.867a.74.74,0,0,0,1.043,0l.442-.442a.731.731,0,0,0,.215-.521.709.709,0,0,0-.215-.512L3.7,48.332h9.052a.765.765,0,0,0,.749-.757V46.95A.75.75,0,0,0,12.737,46.22Z"
            transform="translate(0 -41.674)"
          />
        </svg>
        <span className="font-semibold text-lg ms-4">Back to Home</span>
      </Link>
      <AlbumsList albums={albums}>
        <div className="border rounded">
          <Button
            style={"thumbAddNew"}
            type={"button"}
            onClick={handleOpenModal}
            title="Add Album"
          />
        </div>
      </AlbumsList>
      {isLoading && <div>Loading...</div>}

      <Modal
        isOpen={isOpen}
        title={"Add New Album"}
        closeModal={handleCloseModal}
      >
        <AlbumForm closeModal={handleCloseModal} />
      </Modal>
    </div>
  );
}

export default Albums;
