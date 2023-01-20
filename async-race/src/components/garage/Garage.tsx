import { useState } from "react";
import { PopoverPicker } from "../popoverPicker/PopoverPicker";

import Track from "../track/Track";

import "./Garage.scss";
import "../../App.scss";

import { ICarItem } from "../../types/types";

function Garage({ garageView }: { garageView: boolean }) {
  const [carList, setCarList] = useState<ICarItem[]>([]);

  const [colorCreate, setColorCreate] = useState("#ff8800");
  const [nameCreate, setNameCreate] = useState("");

  const [colorUpdate, setColorUpdate] = useState("#ff8800");
  const [nameUpdate, setNameUpdate] = useState("");

  function createCar(nameCreate: string, colorCreate: string) {
    const item: ICarItem = {
      name: nameCreate,
      color: colorCreate,
    };
    setCarList([item, ...carList]);
  }

  function updateCar(nameUpdate: string, colorUpdate: string) {
    const item: ICarItem = {
      name: nameUpdate,
      color: colorUpdate,
    };
    setCarList([...carList, item]);
  }

  console.log(carList);

  return (
    <div className={`garage ${garageView ? "" : "hidden"}`}>
      <section className="garage_settings">
        <div className="settings_control">
          <div className="settings_remote">
            <input
              className="remote_input"
              type="text"
              onChange={(event) => setNameCreate(event.target.value)}
            />
            <PopoverPicker color={colorCreate} onChange={setColorCreate} />
            <button
              type="button"
              className="remote_button"
              onClick={() => createCar(nameCreate, colorCreate)}
            >
              Create
            </button>
          </div>
          <div className="settings_remote">
            <input
              className="remote_input"
              type="text"
              onChange={(event) => setNameUpdate(event.target.value)}
            />
            <PopoverPicker color={colorUpdate} onChange={setColorUpdate} />
            <button
              type="button"
              className="remote_button"
              onClick={() => updateCar(nameUpdate, colorUpdate)}
            >
              Update
            </button>
          </div>
        </div>
        <div className="settings_buttons">
          <button className="remote_button">Race</button>
          <button className="remote_button">Reset</button>
          <button className="remote_button">Generate Cars</button>
        </div>
      </section>
      <h2>Garage / {carList.length}</h2>
      <section className="garage_autodrom">
        {carList.map((item: ICarItem, index: number) => (
          <Track item={item} key={index} />
        ))}
      </section>
      <div className="garage_pagination"></div>
    </div>
  );
}

export default Garage;
