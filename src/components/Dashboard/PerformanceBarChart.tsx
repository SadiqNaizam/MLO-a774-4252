import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { cn } from '@/lib/utils';

interface PerformanceDataPoint {
  month: string;
  target: number;
  paid: number;
  pending: number;
}

const performanceData: PerformanceDataPoint[] = [
  { month: 'Jan', target: 2000000, paid: 1800000, pending: 100000 },
  { month: 'Feb', target: 2500000, paid: 2800000, pending: 150000 },
  { month: 'Mar', target: 1800000, paid: 2200000, pending: 50000 },
  { month: 'Apr', target: 2200000, paid: 1500000, pending: 200000 },
  { month: 'May', target: 1500000, paid: 1200000, pending: 80000 },
  { month: 'Jun', target: 1800000, paid: 1600000, pending: 120000 },
  { month: 'Jul', target: 2800000, paid: 2500000, pending: 250000 },
  { month: 'Aug', target: 4000000, paid: 3500000, pending: 300000 },
  { month: 'Sep', target: 3000000, paid: 2800000, pending: 100000 },
  { month: 'Oct', target: 3500000, paid: 3200000, pending: 150000 },
  { month: 'Nov', target: 6000000, paid: 5700000, pending: 300000 },
  { month: 'Dec', target: 4500000, paid: 4000000, pending: 200000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 shadow-lg rounded-md border border-border">
        <p className="text-sm font-medium text-card-foreground">{`${label}`}</p>
        {payload.map((pld: any, index: number) => (
          <p key={index} style={{ color: pld.fill }} className="text-xs">
            {`${pld.name}: ${(pld.value / 1000000).toFixed(1)}M`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PerformanceBarChart: React.FC = () => {
  const [year, setYear] = React.useState<string>('2023');

  const formatYAxis = (tickItem: number) => {
    if (tickItem === 0) return '0';
    return `${tickItem / 1000000}M`;
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Performance</CardTitle>
        <div className="flex items-center space-x-2">
          <LegendContent />
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[90px] h-9 text-xs">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="h-[350px] pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={performanceData} margin={{ top: 5, right: 0, left: -25, bottom: 5 }} barGap={4} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="month" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              tickFormatter={formatYAxis} 
              tickLine={false} 
              axisLine={false} 
              tickCount={6}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--border))', fillOpacity: 0.5 }} />
            {/* Legend is handled by custom LegendContent component to match image style */}
            {/* Recharts default Legend could be used with <Legend /> */}
            <Bar dataKey="target" name="Target" fill="#C5BFF3" radius={[4, 4, 0, 0]} />
            <Bar dataKey="paid" name="Paid" fill="#6F52ED" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pending" name="Pending" fill="#F06548" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const LegendContent: React.FC = () => (
  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
    <div className="flex items-center">
      <span className="w-3 h-3 rounded-full bg-[#C5BFF3] mr-1.5"></span>Target
    </div>
    <div className="flex items-center">
      <span className="w-3 h-3 rounded-full bg-[#6F52ED] mr-1.5"></span>Paid
    </div>
    <div className="flex items-center">
      <span className="w-3 h-3 rounded-full bg-[#F06548] mr-1.5"></span>Pending
    </div>
  </div>
);

export default PerformanceBarChart;
