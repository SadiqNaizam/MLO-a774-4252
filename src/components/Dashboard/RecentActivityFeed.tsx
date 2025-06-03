import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  user: string;
  dateTime: string;
  duration: string;
  commission: string;
  status: 'Successful' | 'Pending' | 'Failed';
}

const recentActivityData: Activity[] = [
  {
    id: '1',
    user: 'Esther Howard',
    dateTime: '22 Aug, 5.32 pm',
    duration: '00.18.25',
    commission: '38,582 USD',
    status: 'Successful' as const,
  },
  {
    id: '2',
    user: 'Cameron Williamson',
    dateTime: '22 Aug, 6.12 pm',
    duration: '00.13.39',
    commission: '35,957 USD',
    status: 'Pending' as const,
  },
  {
    id: '3',
    user: 'Brooklyn Simmons',
    dateTime: '22 Aug, 6.50 pm',
    duration: '00.32.21',
    commission: '30,291 USD',
    status: 'Successful' as const,
  },
  {
    id: '4',
    user: 'Ralph Edwards',
    dateTime: '22 Aug, 7.15 pm',
    duration: '00.09.55',
    commission: '28,770 USD',
    status: 'Failed' as const,
  },
    {
    id: '5',
    user: 'Annette Black',
    dateTime: '22 Aug, 8.03 pm',
    duration: '00.21.40',
    commission: '42,100 USD',
    status: 'Successful' as const,
  },
];

const StatusBadge: React.FC<{ status: Activity['status'] }> = ({ status }) => {
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  let className = '';

  switch (status) {
    case 'Successful':
      variant = 'outline';
      className = 'bg-dataai-accent-green/10 text-dataai-accent-green border-dataai-accent-green/50 font-medium';
      break;
    case 'Pending':
      variant = 'outline';
      className = 'bg-yellow-100 text-yellow-700 border-yellow-500/50 font-medium dark:bg-yellow-700/20 dark:text-yellow-400 dark:border-yellow-600/50';
      break;
    case 'Failed':
      variant = 'outline';
      className = 'bg-destructive/10 text-destructive border-destructive/50 font-medium';
      break;
    default:
      variant = 'secondary';
  }
  return <Badge variant={variant} className={cn('capitalize text-xs px-2 py-0.5', className)}>{status.toLowerCase()}</Badge>;
};

const RecentActivityFeed: React.FC = () => {
  const [showCount, setShowCount] = React.useState<string>('4');
  const [selectedDate, setSelectedDate] = React.useState<string>('22 Aug 2023');

  const displayedActivities = recentActivityData.slice(0, parseInt(showCount, 10));

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Recent Activity</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="h-9 text-xs px-3">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            {selectedDate}
          </Button>
          <Select value={showCount} onValueChange={setShowCount}>
            <SelectTrigger className="w-[100px] h-9 text-xs">
              <SelectValue placeholder="Show" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4">Show 4</SelectItem>
              <SelectItem value="8">Show 8</SelectItem>
              <SelectItem value="12">Show 12</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-2 px-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="pl-6 text-muted-foreground font-medium text-xs">User</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs">Date & Time</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs">Duration</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs">Commission</TableHead>
              <TableHead className="pr-6 text-muted-foreground font-medium text-xs">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedActivities.map((activity) => (
              <TableRow key={activity.id} className="hover:bg-muted/30">
                <TableCell className="pl-6 font-medium text-sm text-foreground">{activity.user}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{activity.dateTime}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{activity.duration}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{activity.commission}</TableCell>
                <TableCell className="pr-6">
                  <StatusBadge status={activity.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentActivityFeed;
