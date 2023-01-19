import "./Header.scss";

function Header({
  garageView,
  setGarageView,
}: {
  garageView: boolean;
  setGarageView: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <header className="header">
      <h1 className="header_logo">Async Race</h1>
      <ul className="header_navigation">
        <li
          className={`navigation-item ${garageView ? "active" : ""}`}
          onClick={() => setGarageView(true)}
        >
          Garage
        </li>
        <li
          className={`navigation-item ${garageView ? "" : "active"}`}
          onClick={() => setGarageView(false)}
        >
          Winners
        </li>
      </ul>
    </header>
  );
}

export default Header;
