import React from 'react';
import { ImpactAnalytics } from '../../components/ImpactAnalytics';

export const AdminImpactPage = ({ stats }) => {
  return (
    <div>
      <ImpactAnalytics stats={stats} />
    </div>
  );
};

export default AdminImpactPage;
