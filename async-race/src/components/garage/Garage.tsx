import { useEffect, useState } from "react";
import { PopoverPicker } from "../popoverPicker/PopoverPicker";

import Track from "../track/Track";
import CarNameList from "../../data/CarNameList";

import "./Garage.scss";
import "../../App.scss";

import { ICarCreat, ICarItem } from "../../types/types";
import { getRandomColor } from "../../lib/helpers/getRandomColor";

function Garage({ garageView }: { garageView: boolean }) {
  const [carList, setCarList] = useState<ICarItem[]>([]);
  const [carCount, setCarCount] = useState<string | null>("");

  const [pageNumber, setPageNumber] = useState<number>(1);

  const [nameCreate, setNameCreate] = useState<string>("");
  const [colorCreate, setColorCreate] = useState<string>("#ff8800");

  const [nameUpdate, setNameUpdate] = useState<string>("");
  const [colorUpdate, setColorUpdate] = useState<string>("#ff8800");
  const [idCarSelect, setIdCarSelect] = useState<number>(0);

  useEffect(() => {
    getCarList();
    getCarCount();
  }, [pageNumber]);

  async function getCarList() {
    const response = await fetch(
      `http://127.0.0.1:3000/garage?_page=${pageNumber}&_limit=7`
    );
    const carList = await response.json();
    setCarList(carList);
  }

  async function getCarCount() {
    const response = await fetch("http://127.0.0.1:3000/garage?_page=1");
    const carCount = response.headers.get("X-Total-Count");
    setCarCount(carCount);
  }

  async function createCar(nameCreate: string, colorCreate: string) {
    const item: ICarCreat = {
      name: nameCreate,
      color: colorCreate,
    };

    await fetch("http://127.0.0.1:3000/garage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    getCarList();
    getCarCount();
  }

  async function updateCar() {
    const item: ICarCreat = {
      name: nameUpdate,
      color: colorUpdate,
    };

    await fetch(`http://127.0.0.1:3000/garage/${idCarSelect}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    getCarList();
  }

  async function removeCar(id: number) {
    await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: "DELETE",
    });

    getCarList();
    getCarCount();
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
    getCarList();
  }
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
              className="remote_button"
              type="button"
              onClick={() => createCar(nameCreate, colorCreate)}
            >
              Create
            </button>
          </div>
          <div className={`settings_remote ${idCarSelect ? "" : "disabled"}`}>
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
              onClick={() => {
                updateCar();
                setIdCarSelect(0);
                setNameUpdate("");
                setColorUpdate("#ff8800");
              }}
            >
              Update
            </button>
          </div>
        </div>
        <div className="settings_buttons">
          <button className="remote_button">Race</button>
          <button className="remote_button">Reset</button>
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
            className="page_button__prev"
            type="button"
            onClick={() => {
              setPageNumber(pageNumber - 1);
              getCarList();
            }}
          >
            Prev
          </button>
          <span className="page_number">Page {pageNumber}</span>
          <button
            className="page_button__next"
            type="button"
            onClick={() => {
              setPageNumber(pageNumber + 1);
              getCarList();
            }}
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
          />
        ))}
      </section>
    </div>
  );
}

export default Garage;
