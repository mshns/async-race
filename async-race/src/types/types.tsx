import { Dispatch, SetStateAction } from "react";

export interface ICarItem {
  name: string;
  color: string;
  id: number;
}

export interface ICarCreat {
  name: string;
  color: string;
}

export interface ICarName {
  brand: string;
  model: string[];
}

export interface ITrack {
  item: ICarItem;
  removeCar: (id: number) => void;
  idCarSelect: number;
  setIdCarSelect: Dispatch<SetStateAction<number>>;
  setNameUpdate: Dispatch<SetStateAction<string>>;
  setColorUpdate: Dispatch<SetStateAction<string>>;
  raceStart: boolean;
  setRaceStart: Dispatch<SetStateAction<boolean>>;
  raceReset: boolean;
  setRaceReset: Dispatch<SetStateAction<boolean>>;
}