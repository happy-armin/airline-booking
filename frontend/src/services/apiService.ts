import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export class ApiService {
  setAuthorization(token: string | null) {
    if (token) {
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;
    } else {
      axiosInstance.defaults.headers.common['Authorization'] = '';
    }
  }

  async register(name: string, email: string, password: string) {
    const response = await axiosInstance.post('/user/register', {
      name,
      email,
      password,
    });
    return response.data.token;
  }

  async login(email: string, password: string) {
    const response = await axiosInstance.post('/user/login', {
      email,
      password,
    });
    return response.data.token;
  }

  async loadUser() {
    const response = await axiosInstance.get('/user/profile');
    return response.data.user;
  }

  async loadFlightList() {
    const response = await axiosInstance.get('/flight/lists');
    return response.data;
  }

  async loadBookList(weeklyShow: boolean) {
    const response = await axiosInstance.get(
      weeklyShow ? '/book/weekly-lists' : '/book/lists'
    );
    return response.data;
  }

  async loadFlightAvaliable() {
    const response = await axiosInstance.get('/flight/availables');
    return response.data;
  }

  async addFlight(newFlight: any) {
    await axiosInstance.post('flight/add', newFlight);
  }

  async addBook(
    flightID: string | undefined,
    email: string | undefined,
    seat: string | undefined
  ) {
    await axiosInstance.post('book/add', {
      flightID,
      email,
      seat,
    });
  }

  async manageBook(book: any) {
    await axiosInstance.put('book/manage', book);
  }

  async makeFlightAvailable(flightID: string) {
    await axiosInstance.put(`flight/manage-available/${flightID}`);
  }

  async cancelBook(bookID: string) {
    await axiosInstance.delete(`book/cancel/${bookID}`);
  }

  async queryFlight(departure: string, arrival: string) {
    const response = await axiosInstance.get(
      `flight/availables?departure=${departure}&arrival=${arrival}`
    );
    return response.data;
  }
}
