import { useState } from "react";

import "./App.scss";

import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";


function App() {
  const [garageView, setGarageView] = useState(true);

  return (
    <div className="wrapper">
      <Header garageView={garageView} setGarageView={setGarageView} />
      <Main garageView={garageView} />
      <Footer />
    </div>
  );
}

export default App;
