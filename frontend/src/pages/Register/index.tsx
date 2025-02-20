import React, { useState } from 'react';
import axios from 'axios';
import { useAppContext } from 'contexts';

export const Register: React.FC = () => {
  const { apiService } = useAppContext();
  const [name, setName] = useState(''); // Add `name` state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const registerMsg = await apiService.register(name, email, password);
      setMessage(registerMsg);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-1/3 p-4 shadow rounded mx-auto my-20 gap-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center ">Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 rounded-lg bg-dark border border-grey-bright/10 text-white placeholder-white/10  outline-none focus:border-grey-bright/50"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded-lg bg-dark border border-grey-bright/10 text-white placeholder-white/10  outline-none focus:border-grey-bright/50"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 rounded-lg bg-dark border border-grey-bright/10 text-white placeholder-white/10  outline-none focus:border-grey-bright/50"
      />
      <button
        type="submit"
        className="w-full bg-yellow text-black py-2 rounded"
      >
        Register
      </button>
      {message && <p className="mt-2 text-pink text-center">{message}</p>}
    </form>
  );
};
