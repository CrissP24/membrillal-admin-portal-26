import React from 'react';
import { BudgetWidget } from './widgets/BudgetWidget';
import { InfoRequestsWidget } from './widgets/InfoRequestsWidget';
import { MonthlyNewsWidget } from './widgets/MonthlyNewsWidget';
import { UpcomingEventsWidget } from './widgets/UpcomingEventsWidget';
import { MiniInbox } from './widgets/MiniInbox';
import { RecentActivityFeed } from './widgets/RecentActivityFeed';

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-ink-900">Dashboard</h1>
        <p className="text-ink-600 mt-2">Panel de control - GAD Parroquial Membrillal</p>
      </div>

      {/* Fila 1: Ejecución Presupuestaria y Solicitudes de Información */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7">
          <BudgetWidget />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <InfoRequestsWidget />
        </div>
      </div>

      {/* Fila 2: Noticias, Eventos y Mini Bandeja */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4">
          <MonthlyNewsWidget />
        </div>
        <div className="col-span-12 md:col-span-4">
          <UpcomingEventsWidget />
        </div>
        <div className="col-span-12 md:col-span-4">
          <MiniInbox />
        </div>
      </div>

      {/* Fila 3: Actividad Reciente */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <RecentActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

