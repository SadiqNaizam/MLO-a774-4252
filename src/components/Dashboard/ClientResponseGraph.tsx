import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface ResponseDataPoint {
  time: string;
  responses: number;
}

const clientResponseData: ResponseDataPoint[] = [
  { time: '7am', responses: 120 },
  { time: '8am', responses: 80 },
  { time: '9am', responses: 150 },
  { time: '10am', responses: 130 },
  { time: '11am', responses: 180 },
  { time: '12pm', responses: 220 },
  { time: '1pm', responses: 310 },
  { time: '2pm', responses: 250 },
  { time: '3pm', responses: 190 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 shadow-lg rounded-md border border-border">
        <p className="text-sm font-medium text-card-foreground">{`${label}`}</p>
        <p className="text-xs text-primary">{`Responses: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const ClientResponseGraph: React.FC = () => {
  const totalResponsesToday = 16468;

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">Client Responds</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Today: <span className="font-semibold text-foreground">{totalResponsesToday.toLocaleString()}</span>
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Last 24 hours</DropdownMenuItem>
            <DropdownMenuItem>Last 7 days</DropdownMenuItem>
            <DropdownMenuItem>Custom Range</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="h-[200px] pt-4 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={clientResponseData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="colorResponses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6F52ED" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#6F52ED" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              hide 
            />
            <YAxis hide domain={['dataMin - 20', 'dataMax + 20']} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Area 
              type="monotone" 
              dataKey="responses" 
              stroke="#6F52ED" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#colorResponses)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ClientResponseGraph;
