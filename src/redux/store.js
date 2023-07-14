import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import albumsSlice from "./albumsSlice";

const store = configureStore({
  reducer: {
    albums: albumsSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export default store;
