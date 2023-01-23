import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  RefObject,
} from "react";
import { ReactComponent as Car } from "../../assets/petr.svg";
import constants from "../../lib/data/Constants";

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
  const refCar: RefObject<SVGSVGElement> = React.createRef();

  const [duration, setDuration] = useState(0);
  const [animationPlay, setAnimationPlay] = useState(false);

  useEffect(() => {
    if (animationPlay) {
      refCar.current!.animate(
        [
          { transform: `translateX(0)` },
          { transform: `translateX(calc(100vw - 250px))` },
        ],
        {
          duration: duration,
          iterations: 1,
          fill: "forwards",
        }
      );
    }
  }, [animationPlay, duration, refCar]);

  async function startEngine(id: number) {
    const response = await fetch(
      `${constants.api}engine?id=${id}&status=started`,
      {
        method: "PATCH",
      }
    );
    return await response.json();
  }
/*
  async function stopEngine(id: number) {
    const response = await fetch(
      `${constants.api}engine?id=${id}&status=stopped`,
      {
        method: "PATCH",
      }
    );
    return await response.json();
  }

  async function switchEngineMode(id: number) {
    const response = await fetch(
      `${constants.api}engine?id=${id}&status=drive`,
      {
        method: "PATCH",
      }
    );
    return await response.json();
  }
*/
  return (
    <div className="track">
      <div className="car-settings">
        <button
          className={`track_button
          ${props.item.id === props.idCarSelect ? "active" : ""}`}
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
        <span className="track_name">{props.item.name}</span>
      </div>
      <div className="track_line">
        <div className="car-remote">
          <button
            className="track_button"
            type="button"
            onClick={() => {
              console.log("click");
              startEngine(props.item.id).then((content) => {
                setDuration(content.distance / content.velocity);
                setAnimationPlay(true);
              });
            }}
          >
            Start
          </button>
          <button className="track_button" type="button" onClick={() => {}}>
            Pause
          </button>
        </div>
        <div className="track_race">
          <Car ref={refCar} className="track_car" fill={props.item.color} />
        </div>
      </div>
    </div>
  );
}

export default Track;
