import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Albums from "./page/Albums";
import AlbumDetail from "./page/AlbumsDetail";
import NotFound from "./page/NotFound";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="albums" element={<Albums name="test" />} />
          <Route path="albums/:title" element={<AlbumDetail />} />
          {/* <Route path="albums/*" element={<NotFound />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
