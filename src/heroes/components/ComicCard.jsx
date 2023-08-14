import { Link } from "react-router-dom";
import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { db } from "../../config/firebaseConfig"; // Ajusta la ruta a tu archivo de configuración
import "./Hero.css";
const ComicCard = React.memo(({ id, thumbnail, title, format }) => {
  const [isStarFilled, setIsStarFilled] = useState(false); // Estado para rastrear el llenado de la estrella

  const handleStarClick = async () => {
    setIsStarFilled(!isStarFilled);

    // Referencia a la colección de favoritos en Firestore
    const favoritesCollection = db.collection("favorites");
    const comicDocRef = favoritesCollection.doc(id.toString());

    if (isStarFilled) {
      // Si ya está marcado como favorito, elimínalo de la base de datos
      await comicDocRef.delete();
    } else {
      // Si no está marcado como favorito, añádelo a la base de datos
      await comicDocRef.set({ id, title, thumbnail });
    }
  };
  return (
    <div className="col animate__animated animate__fadeIn" key={id}>
      <div className="card">
        <div className="row no-gutters">
          <div className="col-5">
            <div className="card-img-container">
              <img
                className="card-img"
                src={`${thumbnail.path}.${thumbnail.extension}`}
                alt=""
                loading="lazy"
              />
            </div>
          </div>
          <div className="col-7">
            <div className="card-body d-flex flex-column h-100 ">
              <h5 className="card-title">{title}</h5>
              <p className="card-text"> {format === "" ? "Comic" : format}</p>
              <div className="d-flex flex-column align-items-start h-100 justify-content-end">
                <div className="d-flex justify-content-between w-100">
                  <Link to={`/comic/${id}`} className="mt-auto ">
                    Ver Más
                  </Link>
                  {isStarFilled ? (
                    <AiFillStar
                      size={25}
                      onClick={handleStarClick}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <AiOutlineStar
                      size={25}
                      onClick={handleStarClick}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
ComicCard.displayName = "ComicCard"; // Agregar esta línea

export { ComicCard };
