import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <h1 className="header_logo">Async Race</h1>
      <ul className="header_navigation">
        <li className="navigation-item">Garage</li>
        <li className="navigation-item">Winners</li>
      </ul>
    </header>
  );
}

export default Header;
