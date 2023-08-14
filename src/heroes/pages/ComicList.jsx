import { useEffect, useState } from "react";
import { getComicsObservable } from "../helpers/getComics";
import { ComicCard } from "../components/ComicCard";
import { Loading } from "../components/Loading";

export const ComicList = () => {
  const [comics, setComics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchComicsData = async () => {
      try {
        const subscription = getComicsObservable().subscribe(
          (comicsData) => {
            setComics(comicsData);
          },
          (error) => {
            console.error("Error fetching comics:", error);
          }
        );
        return () => {
          subscription.unsubscribe(); // Desinscripción al desmontar
        };
      } catch (error) {
        console.error("Error fetching comics:", error);
      }
    };
    fetchComicsData();
  }, []);

  // Calcular el índice del primer y último cómic de la página actual
  const indexOfLastComic = currentPage * itemsPerPage;
  const indexOfFirstComic = indexOfLastComic - itemsPerPage;

  // Obtener los cómics de la página actual
  const currentComics = comics.slice(indexOfFirstComic, indexOfLastComic);

  const totalPages = Math.ceil(comics.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Comics</h1>
      <hr />
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {comics.length < 1 ? (
          <Loading />
        ) : (
          currentComics.map((comic) => <ComicCard key={comic.id} {...comic} />)
        )}
      </div>

      <div className="pagination mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`btn btn-secondary me-2 ${
              currentPage === index + 1 ? "disabled" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
