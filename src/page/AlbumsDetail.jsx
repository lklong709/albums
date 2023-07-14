import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModalSelector, albumSelector } from "../redux/selectors";
import modalSlice from "../redux/modalSlice";
import Modal from "../components/Modal";
import PhotoForm from "../components/PhotoForm";
import Photos from "../components/Photos";
import { useEffect } from "react";

function AlbumDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return <Navigate to="/404" replace={true} />;
  }

  const { albumId } = location.state;
  const album = useSelector((state) => albumSelector(state, albumId));

  useEffect(() => {
    if (album === undefined) {
      navigate("/albums");
    }
  }, []);

  const isOpen = useSelector(ModalSelector);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(modalSlice.actions.openModal());
  };

  const handleCloseModal = () => {
    dispatch(modalSlice.actions.closeModal());
  };

  return (
    
    <div className="max-w-[1000px] mx-auto">
      <Link
        to="/albums"
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
        <span className="font-semibold text-lg ms-4">Back to Albums</span>
      </Link>
      <Modal
        isOpen={isOpen}
        title={"Add New Photo"}
        closeModal={handleCloseModal}
      >
        <PhotoForm closeModal={handleCloseModal} albumId={albumId} />
      </Modal>
      <Photos
        photos={album?.photos}
        albumId={albumId}
        onAdd={handleOpenModal}
      />
    </div>
  );
}
export default AlbumDetail;
