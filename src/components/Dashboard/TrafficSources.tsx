import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { cn } from '@/lib/utils';

interface TrafficSourceDataPoint {
  name: string;
  value: number;
  color: string;
}

const trafficSourcesData: TrafficSourceDataPoint[] = [
  { name: 'Google', value: 89528, color: '#6F52ED' }, // Primary
  { name: 'Social Media', value: 57658, color: '#302A69' }, // Darker Primary for contrast
  { name: 'Direct Message', value: 22717, color: '#0AB39C' }, // Accent Green
  { name: 'Referral', value: 15800, color: '#F06548' }, // Accent Red
  { name: 'Email Marketing', value: 10200, color: '#FFB84C' }, // A yellow/orange for variety
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 shadow-lg rounded-md border border-border">
        <p className="text-sm font-medium text-card-foreground">{`${payload[0].payload.name}`}</p>
        <p style={{ color: payload[0].payload.color }} className="text-xs">
          {`Visitors: ${payload[0].value.toLocaleString()}`}
        </p>
      </div>
    );
  }
  return null;
};

const TrafficSources: React.FC = () => {
  const [month, setMonth] = React.useState<string>('aug');
  const [year, setYear] = React.useState<string>('2023');

  const formatXAxis = (tickItem: number) => {
    if (tickItem === 0) return '0';
    return `${tickItem / 1000}K`;
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Traffic Sources</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-[90px] h-9 text-xs">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aug">Aug</SelectItem>
              <SelectItem value="sep">Sep</SelectItem>
            </SelectContent>
          </Select>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[90px] h-9 text-xs">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View All Sources</DropdownMenuItem>
              <DropdownMenuItem>Filter Sources</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="h-[350px] pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trafficSourcesData} layout="vertical" margin={{ top: 0, right: 40, left: 0, bottom: 0 }} barCategoryGap="35%">
            <XAxis 
              type="number" 
              tickFormatter={formatXAxis} 
              tickLine={false} 
              axisLine={{ stroke: 'hsl(var(--border))' }} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={100} 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--border))', fillOpacity: 0.3 }}/>
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {trafficSourcesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TrafficSources;
