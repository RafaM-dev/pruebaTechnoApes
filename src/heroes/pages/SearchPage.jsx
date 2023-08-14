import { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";

import { ComicCard } from "../components/ComicCard";
import {
  getComicsByNameObservable,
  getComicsObservable,
} from "../helpers/getComics";
import { useForm } from "../../hooks/useForm";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [comics, setComics] = useState([]);
  const { q = "" } = queryString.parse(location.search);

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

  useEffect(() => {
    const fetchFilteredComics = async () => {
      try {
        const filteredComics = getComicsByNameObservable(q).subscribe(
          (comicsData) => {
            setComics(comicsData);
          },
          (error) => {
            console.error("Error fetching comics:", error);
          }
        );
        return () => {
          filteredComics.unsubscribe(); // Desinscripción al desmontar
        };
      } catch (error) {
        console.error("Error fetching comics:", error);
      }
    };

    fetchFilteredComics();
  }, [q]);

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`?q=${searchText}`);
  };

  const showSearch = q.length === 0; // Calculating showSearch
  const showError = q.length > 0 && comics.length === 0;

  return (
    <>
      <h1 className="mt-5">Buscar</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Buscando</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-1" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Resultados</h4>
          <hr />
          <div
            className="alert alert-primary animate__animated animate__fadeIn"
            style={{ display: showSearch ? "" : "none" }}
          >
            Busca un Comic
          </div>

          <div
            className="alert alert-danger animate__animated animate__fadeIn"
            style={{ display: showError ? "" : "none" }}
          >
            No existe un comic <b>{q}</b>
          </div>
          {showSearch ? null : ( // Added condition here
            <div className="comics-container">
              {comics.map((comic) => (
                <ComicCard key={comic.id} {...comic} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
