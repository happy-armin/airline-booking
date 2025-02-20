import React, { useState } from 'react';
import axios from 'axios';
import { useAppContext } from 'contexts';

interface LoginProps {
  onLogin: (token: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { apiService } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loginMsg = await apiService.login(email, password);
      onLogin(loginMsg);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-1/3 p-4 shadow rounded mx-auto my-20 gap-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center ">Login</h2>
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
      <button type="submit" className="w-full bg-green text-black py-2 rounded">
        Login
      </button>
      {message && <p className="mt-2 text-pink text-center">{message}</p>}
    </form>
  );
};
