import React from 'react';
import StatCard from './StatCard';
import { Users, MousePointerClick, FileText, LineChart } from 'lucide-react';

const StatsCardGrid: React.FC = () => {
  const statsData = [
    {
      title: 'Total Visitors',
      value: '2,01,620',
      percentageChange: 2.31,
      icon: Users,
      changeDescription: 'From Last Month',
    },
    {
      title: 'Total Clicks',
      value: '1,96,325',
      percentageChange: 5.93,
      icon: MousePointerClick,
      changeDescription: 'From Last Month',
    },
    {
      title: 'Commission',
      value: '1,20,145',
      percentageChange: 9.05,
      icon: FileText,
      changeDescription: 'From Last Month',
    },
    {
      title: 'Bounce Rate',
      value: '1,546',
      percentageChange: -1.03,
      icon: LineChart, // Using LineChart as per image, or Activity could also fit
      changeDescription: 'From Last Month',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          percentageChange={stat.percentageChange}
          icon={stat.icon}
          changeDescription={stat.changeDescription}
        />
      ))}
    </div>
  );
};

export default StatsCardGrid;
