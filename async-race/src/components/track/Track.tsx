import { Dispatch, SetStateAction } from "react";
import { ReactComponent as Car } from "../../assets/petr.svg";

import { ICarItem } from "../../types/types";
import "./Track.scss";

function Track(props: {
  item: ICarItem;
  key: number | undefined;
  removeCar: (id: number) => void;
  idCarSelect: number;
  setIdCarSelect: Dispatch<SetStateAction<number>>;
  setNameUpdate: Dispatch<SetStateAction<string>>;
  setColorUpdate: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="track">
      <div className="car-settings">
        <button
          className={`track_button ${props.item.id === props.idCarSelect? "active" : ""}`}
          type="button"
          onClick={() => {
            props.setIdCarSelect(props.item.id);
            props.setNameUpdate(props.item.name);
            props.setColorUpdate(props.item.color);
          }}
        >
          Select
        </button>
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
