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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserRating {
  id: string;
  rank: number;
  name: string;
  avatarUrl?: string;
  commission: number;
}

const userRatingsData: UserRating[] = [
  {
    id: '1',
    rank: 1,
    name: 'Esther Howard',
    avatarUrl: 'https://i.pravatar.cc/40?u=esther',
    commission: 25000,
  },
  {
    id: '2',
    rank: 2,
    name: 'Leslie Alexander',
    avatarUrl: 'https://i.pravatar.cc/40?u=leslie',
    commission: 18000,
  },
  {
    id: '3',
    rank: 3,
    name: 'Jenny Wilson',
    avatarUrl: 'https://i.pravatar.cc/40?u=jenny',
    commission: 14000,
  },
  {
    id: '4',
    rank: 4,
    name: 'Ronald Richards',
    avatarUrl: 'https://i.pravatar.cc/40?u=ronald',
    commission: 10000,
  },
  {
    id: '5',
    rank: 5,
    name: 'Cameron Williamson',
    avatarUrl: 'https://i.pravatar.cc/40?u=cameron',
    commission: 8500,
  },
];

const UserRatingsTable: React.FC = () => {
  const [month, setMonth] = React.useState<string>('aug');
  const [year, setYear] = React.useState<string>('2023');

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">User Rating</CardTitle>
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
        </div>
      </CardHeader>
      <CardContent className="pt-2 px-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[60px] text-center text-muted-foreground font-medium text-xs pl-6">Rank</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs">User</TableHead>
              <TableHead className="text-right text-muted-foreground font-medium text-xs pr-6">Commission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userRatingsData.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/30">
                <TableCell className="font-medium text-center text-foreground pl-6">{user.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm text-foreground">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium text-sm text-foreground pr-6">
                  ${user.commission.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserRatingsTable;
