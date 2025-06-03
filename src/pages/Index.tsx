import React from 'react';
import MainAppLayout from '../../components/layout/MainAppLayout';
import StatsCardGrid from '../../components/Dashboard/StatsCardGrid';
import SalesOverviewChart from '../../components/Dashboard/SalesOverviewChart';
import PerformanceBarChart from '../../components/Dashboard/PerformanceBarChart';
import TrafficSources from '../../components/Dashboard/TrafficSources';
import ClientResponseGraph from '../../components/Dashboard/ClientResponseGraph';
import UserRatingsTable from '../../components/Dashboard/UserRatingsTable';
import RecentActivityFeed from '../../components/Dashboard/RecentActivityFeed';

/**
 * DashboardPage component
 * 
 * This component serves as the main container for the dashboard overview.
 * It utilizes MainAppLayout for the overall page structure (sidebar, header)
 * and arranges various dashboard widgets in a responsive grid.
 */
const DashboardPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* 
        The main content area uses a CSS grid for layout. 
        - Default: Single column for mobile screens.
        - Large screens (lg): 6-column grid for more complex arrangements.
        - 'gap-6': Consistent spacing between grid items.
        - 'auto-rows-auto': Rows will size based on their content.
      */}
      <div className="grid grid-cols-1 gap-6 auto-rows-auto lg:grid-cols-6">
        {/* Row 1: Statistics Cards Grid */}
        {/* Spans all 6 columns on large screens to take full width. */}
        <div className="lg:col-span-6">
          <StatsCardGrid />
        </div>

        {/* Row 2: Sales Overview and Performance Charts */}
        {/* Each chart takes up 3 of 6 columns on large screens (50% width each). */}
        <div className="lg:col-span-3">
          <SalesOverviewChart />
        </div>
        <div className="lg:col-span-3">
          <PerformanceBarChart />
        </div>

        {/* Row 3: Traffic Sources and Client Response Graph */}
        {/* TrafficSources is wider (4 columns) than ClientResponseGraph (2 columns) on large screens. */}
        <div className="lg:col-span-4">
          <TrafficSources />
        </div>
        <div className="lg:col-span-2">
          <ClientResponseGraph />
        </div>
        
        {/* Row 4: User Ratings Table and Recent Activity Feed */}
        {/* Each table/feed takes up 3 of 6 columns on large screens (50% width each). */}
        <div className="lg:col-span-3">
          <UserRatingsTable />
        </div>
        <div className="lg:col-span-3">
          <RecentActivityFeed />
        </div>
      </div>
    </MainAppLayout>
  );
};

export default DashboardPage;
