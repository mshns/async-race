import { ReactComponent as Car } from "../../assets/petr.svg";

import { ICarItem } from "../../types/types";
import "./Track.scss";

function Track(props: {
  item: ICarItem;
  removeCar: (id: number) => void;
  key: number | undefined;
}) {
  return (
    <div className="track">
      <div className="car-settings">
        <button className="track_button">Select</button>
        <button
          className="track_button"
          type="button"
          onClick={() => props.removeCar(props.item.id)}
        >
          Remove
        </button>
        <span>{props.item.name}</span>
      </div>
      <div className="track_line">
        <div className="car-remote">
          <button className="track_button">Start</button>
          <button className="track_button">Pause</button>
        </div>
        <div className="track_race">
          <Car className="track_car" fill={props.item.color} />
        </div>
      </div>
    </div>
  );
}

export default Track;
