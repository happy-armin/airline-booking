import { ApiService } from 'services';

export interface IUserProps {
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface IAppContextProps {
  token: string | null;
  user: IUserProps | null;
  setUser: (user: IUserProps | null) => void;
  setToken: (token: string | null) => void;
  apiService: ApiService;
}
export interface IFlightProps {
  flightID: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  available: boolean;
}

export interface IBookProps {
  _id: string;
  flightID: string;
  email: string;
  seat: string;
  date: Date;
}
