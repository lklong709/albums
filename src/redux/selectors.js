export const albumsSelector = (state) => state.albums;
export const ModalSelector = (state) => state.modal.isOpen;
export const albumSelector = (state, albumId) => {
  return state.albums.find(o => o.albumId === albumId);
};
