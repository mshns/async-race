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

export interface IRacer {
  id: number;
  status: boolean;
  velocity: number;
}