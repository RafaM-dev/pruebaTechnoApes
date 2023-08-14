import "./Hero.css";

export const Loading = () => {
  return (
    <div className="bodyContainer">
      <div className="bodyLoader">
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="handLoader">
          <span></span>
          <div className="faceLoader"></div>
          <div className="cowlLoader"></div>
        </div>
      </div>
      <div className="speedLoader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1 className="titleLoader">Cargando</h1>
    </div>
  );
};
