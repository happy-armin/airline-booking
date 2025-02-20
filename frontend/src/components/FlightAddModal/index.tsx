import axios from 'axios';
import { useAppContext } from 'contexts';
import React, { useState } from 'react';
import Modal from 'react-modal';

export const FlightAddModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onFlightAdded: () => void;
}> = ({ isOpen, onClose, onFlightAdded }) => {
  const { apiService } = useAppContext();
  const [flightID, setFlightID] = useState('1');
  const [departureAirport, setDepartureAirport] = useState('Singapore');
  const [arrivalAirport, setArrivalAirport] = useState('US');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newFlight = {
      flightID,
      departureAirport,
      arrivalAirport,
      departureTime,
      arrivalTime,
    };
    try {
      await apiService.addFlight(newFlight);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Login failed.');
    } finally {
      onFlightAdded();
    }

    onClose();
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Flight"
      className="flex flex-col w-1/3 p-10 bg-primary text-white shadow rounded mx-auto my-[100px] gap-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Flight</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <label className="w-1/4">Flight ID:</label>
          <input
            type="text"
            value={flightID}
            onChange={(e) => setFlightID(e.target.value)}
            required
            className="flex-1 p-2 rounded-lg bg-dark border border-grey-bright/10 text-white placeholder-white/10  outline-none focus:border-grey-bright/50"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-1/4">Departure Airport:</label>
          <input
            type="text"
            value={departureAirport}
            onChange={(e) => setDepartureAirport(e.target.value)}
            required
            className="flex-1 p-2 rounded-lg bg-dark border border-grey-bright/10 text-white placeholder-white/10  outline-none focus:border-grey-bright/50"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-1/4">Arrival Airport:</label>
          <input
            type="text"
            value={arrivalAirport}
            onChange={(e) => setArrivalAirport(e.target.value)}
            required
            className="flex-1 p-2 rounded-lg bg-dark border border-grey-bright/10 text-white placeholder-white/10  outline-none focus:border-grey-bright/50"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-1/4">Departure Time:</label>
          <input
            type="datetime-local"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            required
            className="flex-1 p-2 rounded-lg bg-dark border border-grey-bright/10 text-white placeholder-white/10  outline-none focus:border-grey-bright/50"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-1/4">Arrival Time:</label>
          <input
            type="datetime-local"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            required
            className="flex-1 p-2 rounded-lg bg-dark border border-grey-bright/10 text-white placeholder-white/10  outline-none focus:border-grey-bright/50"
          />
        </div>
        <div className="flex justify-end mt-5 gap-4">
          <button
            type="submit"
            className="w-[200px] bg-green text-black text-bold py-2 rounded"
          >
            Add Flight
          </button>
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
