import "./loader.css";
export default function Loader() {
  /* From Uiverse.io by andrew-demchenk0 */
  return (
    <div className="loader-content">
      <div className="pyramid-loader">
        <div className="wrapper">
          <span className="side side1"></span>
          <span className="side side2"></span>
          <span className="side side3"></span>
          <span className="side side4"></span>
          <span className="shadow"></span>
        </div>
      </div>
    </div>
  );
}
