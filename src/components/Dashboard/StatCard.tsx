import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, TrendingUp, TrendingDown, ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  percentageChange: number;
  changeDescription?: string;
  icon: React.ElementType;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentageChange,
  changeDescription = 'From Last Month',
  icon: IconComponent,
  className,
}) => {
  const isPositiveChange = percentageChange >= 0;

  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-primary/10 rounded-md">
            <IconComponent className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Export Data</DropdownMenuItem>
            <DropdownMenuItem>Refresh</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          {isPositiveChange ? (
            <TrendingUp className="h-4 w-4 mr-1 text-dataai-accent-green" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1 text-destructive" />
          )}
          <span className={cn('font-semibold', isPositiveChange ? 'text-dataai-accent-green' : 'text-destructive')}>
            {isPositiveChange ? '↑' : '↓'} {Math.abs(percentageChange).toFixed(2)}%
          </span>
          <span className="ml-1">{changeDescription}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
