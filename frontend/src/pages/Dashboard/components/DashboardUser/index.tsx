import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookModal } from 'components';
import { IBookProps, IFlightProps } from 'types';
import { useAppContext } from 'contexts';
import { queries } from '@testing-library/dom';

export const DashboardUser: React.FC = () => {
  const { user, apiService } = useAppContext();
  const [flights, setFlights] = useState<IFlightProps[]>([]);
  const [books, setBooks] = useState<IBookProps[]>([]);
  const [currentBook, setCurrentBook] = useState<IBookProps>();
  const [currentFlight, setCurrentFlight] = useState<IFlightProps>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [departure, setDeparture] = useState<string>('');
  const [arrival, setArrival] = useState<string>('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearch = async () => {
    try {
      const queryFlights = await apiService.queryFlight(departure, arrival);
      setFlights(queryFlights);

      const books = await apiService.loadBookList();
      setBooks(books); // Set user data
    } catch (err: any) {}
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const findBook = (flightID: string): IBookProps | undefined => {
    return books.find(
      (book) => book.flightID === flightID && book.email === user?.email
    );
  };
  return (
    <div className="flex flex-col text-white gap-4">
      <form className="flex flex-col gap-4">
        <div className="flex gap-10 mb-4">
          <div className="flex items-center gap-4">
            <label className="w-1/4">Departure</label>
            <input
              type="text"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="flex-1 p-2 rounded-lg bg-dark border border-grey-bright/10 text-white placeholder-white/10  outline-none focus:border-grey-bright/50"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="w-1/4">Arriaval</label>
            <input
              type="text"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              className="flex-1 p-2 rounded-lg bg-dark border border-grey-bright/10 text-white placeholder-white/10  outline-none focus:border-grey-bright/50"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className={`"w-full px-4 py-2 rounded bg-green-light text-black text-bold"`}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </form>

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

            {findBook(flight.flightID) ? (
              <button
                type="submit"
                className={`"w-full py-2 rounded mt-4 bg-yellow text-black text-bold"`}
                onClick={() => {
                  setCurrentBook(findBook(flight.flightID));
                  setCurrentFlight(flight);
                  openModal();
                }}
              >
                Manage Book
              </button>
            ) : (
              <button
                type="submit"
                className={`"w-full py-2 rounded mt-4 bg-green-light text-black text-bold"`}
                onClick={() => {
                  setCurrentBook(findBook(flight.flightID));
                  setCurrentFlight(flight);
                  openModal();
                }}
              >
                Buy Ticket
              </button>
            )}
          </div>
        ))}
      </div>

      <BookModal
        isOpen={isModalOpen}
        onClose={closeModal}
        flight={currentFlight}
        book={currentBook}
        onBookAdded={handleSearch}
      />
    </div>
  );
};
