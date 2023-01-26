import { useEffect, useState } from "react";
import { PopoverPicker } from "../popoverPicker/PopoverPicker";

import Track from "../track/Track";

import "../../App.scss";
import "./Garage.scss";

import { getRandomColor } from "../../lib/helpers/getRandomColor";
import CarNameList from "../../lib/data/CarNameList";
import constants from "../../lib/data/Constants";

import { ICarCreat, ICarItem } from "../../types/types";

function Garage({ garageView }: { garageView: boolean }) {
  const [carList, setCarList] = useState<ICarItem[]>([]);
  const [carCount, setCarCount] = useState<string | null>("");

  const [pageNumber, setPageNumber] = useState<number>(1);

  const [nameCreate, setNameCreate] = useState<string>("");
  const [colorCreate, setColorCreate] = useState<string>(
    constants.defaultColor
  );

  const [nameUpdate, setNameUpdate] = useState<string>("");
  const [colorUpdate, setColorUpdate] = useState<string>(
    constants.defaultColor
  );
  const [idCarSelect, setIdCarSelect] = useState<number>(0);

  const [raceStart, setRaceStart] = useState(false);
  const [raceReset, setRaceReset] = useState(false);
  const [raceButtonActive, setRaceButtonActive] = useState(true);

  useEffect(() => {
    fetch(
      `${constants.api}garage?_page=${pageNumber}&_limit=${constants.carPerPage}`
    )
      .then((response) => response.json())
      .then((data) => setCarList(data));

    fetch(`${constants.api}garage?_page=1`)
      .then((response) => response.headers.get("X-Total-Count"))
      .then((data) => setCarCount(data));
  }, [carCount, pageNumber]);

  async function createCar(nameCreate: string, colorCreate: string) {
    const item: ICarCreat = {
      name: nameCreate,
      color: colorCreate,
    };

    await fetch(`${constants.api}garage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    setCarCount("");
  }

  async function updateCar() {
    const item: ICarCreat = {
      name: nameUpdate,
      color: colorUpdate,
    };

    await fetch(`${constants.api}garage/${idCarSelect}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    setCarCount("");
  }

  async function removeCar(id: number) {
    await fetch(`${constants.api}garage/${id}`, {
      method: "DELETE",
    });

    setCarCount("");
  }

  function generateCars() {
    const hundredCars: ICarCreat[] = [];

    for (let i = 0; i < 100; i++) {
      const randomBrand = Math.floor(Math.random() * CarNameList.length);
      const randomModel = Math.floor(
        Math.random() * CarNameList[randomBrand].model.length
      );
      const brand = CarNameList[randomBrand].brand;
      const model = CarNameList[randomBrand].model[randomModel];
      hundredCars.push({ name: `${brand} ${model}`, color: getRandomColor() });
    }

    hundredCars.map((item) => createCar(item.name, item.color));
  }

  function handlerUpdateButton() {
    updateCar();
    setIdCarSelect(0);
    setNameUpdate("");
    setColorUpdate(constants.defaultColor);
  }

  return (
    <div className={`garage ${!garageView && "hidden"}`}>
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
              className="remote_button"
              type="button"
              onClick={() => createCar(nameCreate, colorCreate)}
            >
              Create
            </button>
          </div>
          <div className={`settings_remote ${!idCarSelect && "disabled"}`}>
            <input
              className="remote_input"
              type="text"
              value={nameUpdate}
              onChange={(event) => setNameUpdate(event.target.value)}
            />
            <PopoverPicker color={colorUpdate} onChange={setColorUpdate} />
            <button
              className="remote_button"
              type="button"
              onClick={handlerUpdateButton}
            >
              Update
            </button>
          </div>
        </div>
        <div className="settings_buttons">
          <button
            className={`remote_button
            ${raceButtonActive ? "active" : "disabled"}`}
            type="button"
            onClick={() => {
              setRaceStart(true);
              setRaceButtonActive(false);
            }}
          >
            Race
          </button>
          <button
            className={`remote_button
            ${raceButtonActive ? "disabled" : "active"}`}
            type="button"
            onClick={() => {
              setRaceButtonActive(true);
              setRaceReset(true);
            }}
          >
            Reset
          </button>
          <button
            className="remote_button"
            type="button"
            onClick={generateCars}
          >
            Generate Cars
          </button>
        </div>
      </section>
      <div className="garage_pagination">
        <h2 className="garage_title">
          Garage
          <span className="title_icon">emoji_transportation</span>
          {carCount}
        </h2>
        <div className="garage_page">
          <button
            className={`page_button__prev ${pageNumber === 1 && "disabled"}`}
            type="button"
            onClick={() => {
              setPageNumber(pageNumber - 1);
            }}
          >
            Prev
          </button>
          <span className="page_number">Page {pageNumber}</span>
          <button
            className={`page_button__next ${
              pageNumber >= Number(carCount) / constants.carPerPage &&
              "disabled"
            }`}
            type="button"
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <section className="garage_autodrom">
        {carList.map((item: ICarItem) => (
          <Track
            item={item}
            key={item.id}
            removeCar={removeCar}
            idCarSelect={idCarSelect}
            setIdCarSelect={setIdCarSelect}
            setNameUpdate={setNameUpdate}
            setColorUpdate={setColorUpdate}
            raceStart={raceStart}
            setRaceStart={setRaceStart}
            raceReset={raceReset}
            setRaceReset={setRaceReset}
          />
        ))}
      </section>
    </div>
  );
}

export default Garage;
