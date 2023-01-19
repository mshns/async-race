import Garage from "../garage/Garage";
import Winners from "../winners/Winners";

import "./Main.scss";

function Main({ garageView }: { garageView: boolean }) {
  return (
    <main className="main">
      <Garage garageView={garageView} />
      <Winners garageView={garageView} />
    </main>
  );
}

export default Main;
