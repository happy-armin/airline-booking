import React from 'react';
import { useAppContext } from 'contexts';

import { DashboardAdmin, DashboardUser } from './components';

export const Dashboard: React.FC = () => {
  const { user } = useAppContext();

  return (
    <div className="flex flex-col p-10 text-white gap-4">
      {user && (user.isAdmin ? <DashboardAdmin /> : <DashboardUser />)}
    </div>
  );
};
