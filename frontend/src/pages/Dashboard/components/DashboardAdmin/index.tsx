import React, { useState, useEffect } from 'react';
import { FlightAddModal, BookModal } from 'components';
import axios from 'axios';
import { IBookProps, IFlightProps } from 'types';
import { useAppContext } from 'contexts';

export const DashboardAdmin: React.FC = () => {
  const { apiService } = useAppContext();
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [flights, setFlights] = useState<IFlightProps[]>([]);
  const [books, setBooks] = useState<IBookProps[]>([]);
  const [currentBook, setCurrentBook] = useState<IBookProps>();
  const [currentFlight, setCurrentFlight] = useState<IFlightProps>();
  const [weeklyShow, setWeeklyShow] = useState<boolean>(false);
  const openFlightModal = () => setIsFlightModalOpen(true);
  const closeFlightModal = () => setIsFlightModalOpen(false);
  const openBookModal = () => setIsBookModalOpen(true);
  const closeBookModal = () => setIsBookModalOpen(false);

  const fetchDashboard = async () => {
    try {
      const flights = await apiService.loadFlightList();
      setFlights(flights); // Set user data

      const books = await apiService.loadBookList(weeklyShow);
      setBooks(books); // Set user data
    } catch (err: any) {
      // setMessage(err.response?.data?.message || 'Failed to fetch dashboard.');
    }
  };

  const setWeeklyMode = async () => {
    setWeeklyShow(!weeklyShow);
    try {
      const books = await apiService.loadBookList(!weeklyShow);
      setBooks(books); // Set user data
    } catch (err: any) {
      // setMessage(err.response?.data?.message || 'Failed to fetch dashboard.');
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleAddFlight = () => {
    fetchDashboard();
  };

  const handleAvaiableClick = async (flightID: string) => {
    try {
      await apiService.makeFlightAvailable(flightID);
    } catch (err: any) {
    } finally {
      fetchDashboard();
    }
  };

  const handleCancelBook = async (_id: string) => {
    try {
      await apiService.cancelBook(_id);
    } catch (err: any) {
    } finally {
      fetchDashboard();
    }
  };

  const findFlight = (flightID: string): IFlightProps | undefined => {
    return flights.find((flight) => flight.flightID === flightID);
  };

  return (
    <div className="flex flex-col text-white gap-4">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">Manage Flight</p>
        <button
          type="submit"
          className="w-[200px] bg-green-light text-black font-bold py-2 rounded"
          onClick={openFlightModal}
        >
          Add Flight
        </button>
      </div>
      <div className="grid grid-cols-4 grid-flow-row gap-4">
        {flights.map((flight: IFlightProps, index: number) => (
          <div
            key={index + flight.flightID}
            className="flex flex-col rounded-lg bg-grey font-bold p-4 gap-2"
          >
            <div className="flex items-center gap-4">
              <p className="flex w-1/3 text-grey-normal">Flight ID</p>
              <p className="flex flex-1 text-grey-bright">{flight.flightID}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="flex w-1/3 text-grey-normal">Departure Airport</p>
              <p className="flex flex-1 text-grey-bright">
                {flight.departureAirport}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="flex w-1/3 text-grey-normal">Arrival Airport</p>
              <p className="flex flex-1 text-grey-bright">
                {flight.arrivalAirport}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="flex w-1/3 text-grey-normal">Departure Time</p>
              <p className="flex flex-1 text-grey-bright">
                {flight.departureTime}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="flex w-1/3 text-grey-normal">Arrival Time</p>
              <p className="flex flex-1 text-grey-bright">
                {flight.arrivalTime}
              </p>
            </div>

            <button
              type="submit"
              className={`"w-full py-2 rounded mt-4 ${
                flight.available ? 'bg-pink' : 'bg-green-light'
              } text-black text-bold"`}
              onClick={() => handleAvaiableClick(flight.flightID)}
            >
              Make it {flight.available ? 'Unavaiable' : 'Available'}
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-start items-center mt-4 gap-10">
        <p className="text-2xl font-bold">Manage Book</p>
        <button
          type="submit"
          onClick={setWeeklyMode}
          className="flex py-2 px-4 rounded bg-yellow text-black justify-center"
        >
          {weeklyShow ? 'Show all' : 'Weekly Report'}
        </button>
      </div>
      <div className="grid grid-cols-4 grid-flow-row gap-4">
        {books.map((book: IBookProps, index: number) => (
          <div
            key={index + book.flightID + book.email}
            className="flex flex-col rounded-lg bg-grey font-bold p-4 gap-2"
          >
            <div className="flex items-center gap-4">
              <p className="flex w-1/3 text-grey-normal">Flight ID</p>
              <p className="flex flex-1 text-grey-bright">{book.flightID}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="flex w-1/3 text-grey-normal">Email</p>
              <p className="flex flex-1 text-grey-bright">{book.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="flex w-1/3 text-grey-normal">Seat</p>
              <p className="flex flex-1 text-grey-bright">{book.seat}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="flex w-1/3 text-grey-normal">Date</p>
              <p className="flex flex-1 text-grey-bright">
                {book.date.toString()}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="flex w-1/2 py-2 rounded mt-4 bg-yellow text-black justify-center"
                onClick={() => {
                  setCurrentBook(book);
                  setCurrentFlight(findFlight(book.flightID));
                  openBookModal();
                }}
              >
                Change
              </button>

              <button
                type="submit"
                className="flex w-1/2 py-2 rounded mt-4 bg-pink text-black justify-center"
                onClick={() => {
                  handleCancelBook(book._id);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
      <FlightAddModal
        isOpen={isFlightModalOpen}
        onClose={closeFlightModal}
        onFlightAdded={handleAddFlight}
      />
      <BookModal
        isOpen={isBookModalOpen}
        onClose={closeBookModal}
        flight={currentFlight}
        book={currentBook}
        onBookAdded={fetchDashboard}
      />
    </div>
  );
};
