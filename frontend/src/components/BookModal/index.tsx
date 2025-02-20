import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { IBookProps, IFlightProps } from '../../types/props';
import { useAppContext } from '../../contexts/AppContext';

export const BookModal: React.FC<{
  flight: IFlightProps | undefined;
  book: IBookProps | undefined;
  isOpen: boolean;
  onClose: () => void;
  onBookAdded: () => void;
}> = ({ flight, book, isOpen, onClose, onBookAdded }) => {
  const { user, apiService } = useAppContext();

  const [seat, setSeat] = useState<string>();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (book) {
        await apiService.manageBook({ ...book, seat: seat });
      } else {
        await apiService.addBook(flight?.flightID, user?.email, seat);
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Login failed.');
    } finally {
      onBookAdded();
    }

    onClose();
  };

  useEffect(() => {
    if (book) {
      setSeat(book.seat);
    } else {
      setSeat('B');
    }
  }, [book]);

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Buy Ticket"
      className="flex flex-col w-1/3 p-10 bg-primary text-white shadow rounded mx-auto my-[100px] gap-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Buy Ticket</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <label className="w-1/4">Passenger :</label>
          <input
            type="text"
            value={user?.name}
            disabled
            readOnly
            className="flex-1 p-2 rounded-lg bg-dark border border-grey-bright/10 text-white placeholder-white/10  outline-none focus:border-grey-bright/50"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-1/4">Flight ID:</label>
          <input
            type="text"
            value={flight?.flightID}
            disabled
            readOnly
            className="flex-1 p-2 rounded-lg bg-dark border border-grey-bright/10 text-white placeholder-white/10  outline-none focus:border-grey-bright/50"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-1/4">Departure Airport:</label>
          <input
            type="text"
            value={flight?.departureAirport}
            disabled
            readOnly
            className="flex-1 p-2 rounded-lg bg-dark border border-grey-bright/10 text-white placeholder-white/10  outline-none focus:border-grey-bright/50"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-1/4">Arrival Airport:</label>
          <input
            type="text"
            value={flight?.arrivalAirport}
            disabled
            readOnly
            className="flex-1 p-2 rounded-lg bg-dark border border-grey-bright/10 text-white placeholder-white/10  outline-none focus:border-grey-bright/50"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-1/4">Depature Time:</label>
          <input
            type="text"
            value={flight?.departureTime}
            disabled
            readOnly
            className="flex-1 p-2 rounded-lg bg-dark border border-grey-bright/10 text-white placeholder-white/10  outline-none focus:border-grey-bright/50"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-1/4">Arrival Time:</label>
          <input
            type="text"
            value={flight?.arrivalTime}
            disabled
            readOnly
            className="flex-1 p-2 rounded-lg bg-dark border border-grey-bright/10 text-white placeholder-white/10  outline-none focus:border-grey-bright/50"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-1/4">Seat:</label>
          <input
            type="text"
            value={seat}
            onChange={(e) => setSeat(e.target.value)}
            autoFocus
            className="flex-1 p-2 rounded-lg bg-dark border border-grey-bright/10 text-white placeholder-white/10  outline-none focus:border-grey-bright/50"
          />
        </div>

        <div className="flex justify-end mt-5 gap-4">
          {book ? (
            <button
              type="submit"
              className="w-[200px] bg-yellow text-black text-bold py-2 rounded"
            >
              Edit Book
            </button>
          ) : (
            <button
              type="submit"
              className="w-[200px] bg-green text-black text-bold py-2 rounded"
            >
              Add Book
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-[200px] bg-pink text-black text-bold py-2 rounded"
          >
            Cancel
          </button>
        </div>
        {message && <p className="mt-2 text-pink text-center">{message}</p>}
      </form>
    </Modal>
  );
};
