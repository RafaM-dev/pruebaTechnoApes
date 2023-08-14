import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getComicByIdObservable } from "../helpers/getComics";

export const ComicPage  = () => {
  const navigate = useNavigate();
  const { comicId } = useParams();

  const [comic, setComic] = useState(null);

  useEffect(() => {
    const fetchComicsData = async () => {
      try {
        const subscription = getComicByIdObservable(comicId).subscribe(
          (comicData) => {
            setComic(comicData);
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
  }, [comicId]);

  const onNavigateBack = () => {
    navigate(-1);
  };

  if (!comic) {
    return <p>Loading comic details...</p>;
  }

  const {
    title,
    variantDescription,
    characters,
    description,
    textObjects,
    prices,
    creators,
    variants,
  } = comic;

  return (
    <div className="col">
      <div className="row mt-5">
        <div className="col-4">
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={title}
            className="img-thumbnail animate__animated animate__fadeInLeft"
          />
        </div>
        <div className="col-8">
          <h2>{title}</h2>
          {variantDescription && <h5>{variantDescription}</h5>}

          {characters.length >= 1 && (
            <div>
              <h5 className="mt-3"> Personajes</h5>
              <ul className="row">
                {characters.items.map((character, index) => (
                  <li key={index} className="col-md-6">
                    {character.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {description.length >= 1 ? (
            <p>{description}</p>
          ) : textObjects.length >= 1 ? (
            textObjects.map((textObj, index) => (
              <p key={index}>{textObj.text}</p>
            ))
          ) : null}

          {prices.length >= 1 && (
            <div className="d-flex align-items-center">
              <h4>Precio:</h4>&nbsp;
              {prices.map((price) => `$${price.price}`)}
            </div>
          )}

          {creators.length >= 1 && (
            <div>
              <h5 className="mt-3">Creadores</h5>
              <ul className="row">
                {creators.items.map((creator, index) => (
                  <li key={index} className="col-md-6">
                    {creator.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button className="btn btn-primary mt-5" onClick={onNavigateBack}>
            Atras
          </button>
        </div>
      </div>
      <div className="row">
        <h1 className="text-center mt-5">Variantes</h1>
        <ul className="d-flex flex-wrap align-items-center">
          {variants.length < 1 ? (
            <h2 className="text-center py-5">Lo siento no hay variantes</h2>
          ) : (
            variants.map((variant, index) => (
              <li
                key={variant.id || `${comic.id}-${index}`}
                className="col-md-6 p-2 text-center text-align-center"
              >
                <span className="mr-2 "></span>
                {variant.name}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

