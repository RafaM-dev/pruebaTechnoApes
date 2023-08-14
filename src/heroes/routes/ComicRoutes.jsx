import { Route, Routes } from "react-router-dom";
import { SearchPage } from "../pages/SearchPage";
import { ComicList } from "../pages/ComicList";
import { ComicPage } from "../pages/ComicPage";
import { Navbar } from "../components/NavBar";

export const ComicRoutes = () => {

  return (
    <>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<ComicList />} />
          <Route path="/comic/:comicId" element={<ComicPage />} />
          <Route path="buscar" element={<SearchPage />} />
        </Routes>
      </div>
    </>
  );
};
