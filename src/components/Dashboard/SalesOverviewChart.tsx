import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot } from 'recharts';
import { cn } from '@/lib/utils';

interface SalesDataPoint {
  date: string;
  sales: number;
  annotation?: string;
}

const salesData: SalesDataPoint[] = [
  { date: 'Aug 21', sales: 30000 },
  { date: 'Aug 22', sales: 35000 },
  { date: 'Aug 23', sales: 42000 },
  { date: 'Aug 24', sales: 38000 },
  { date: 'Aug 25', sales: 32000 },
  { date: 'Aug 26', sales: 25254, annotation: '$25,254 / ↑2.5%' },
  { date: 'Aug 27', sales: 30000 },
  { date: 'Aug 28', sales: 60000 },
  { date: 'Aug 29', sales: 110000 },
  { date: 'Aug 30', sales: 95000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 shadow-lg rounded-md border border-border">
        <p className="text-sm font-medium text-card-foreground">{`${label}`}</p>
        <p className="text-xs text-primary">{`Sales: $${payload[0].value.toLocaleString()}`}</p>
        {payload[0].payload.annotation && 
          <p className="text-xs text-dataai-accent-green mt-1">{payload[0].payload.annotation.split(' / ')[1]}</p>}
      </div>
    );
  }
  return null;
};

const SalesOverviewChart: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState<string>('sprint');
  const [month, setMonth] = React.useState<string>('aug');
  const [year, setYear] = React.useState<string>('2023');

  const annotatedPoint = salesData.find(d => d.annotation);

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Sales Overview</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[100px] h-9 text-xs">
              <SelectValue placeholder="Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sprint">Sprint</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-[90px] h-9 text-xs">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aug">Aug</SelectItem>
              <SelectItem value="sep">Sep</SelectItem>
              <SelectItem value="oct">Oct</SelectItem>
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
              <DropdownMenuItem>Detailed Report</DropdownMenuItem>
              <DropdownMenuItem>Configure</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="h-[350px] pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6F52ED" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#6F52ED" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="date" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              tickFormatter={(value) => value > 0 ? `${value/1000}k` : '0'} 
              tickLine={false} 
              axisLine={false} 
              tickCount={5}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Area type="monotone" dataKey="sales" stroke="#6F52ED" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
            {annotatedPoint && (
              <ReferenceDot 
                x={annotatedPoint.date} 
                y={annotatedPoint.sales} 
                r={5} 
                fill="#6F52ED" 
                stroke="hsl(var(--card))" 
                strokeWidth={2}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesOverviewChart;
