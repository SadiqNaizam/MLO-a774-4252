import React from 'react';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  // Layout requirements state:
  // sidebar: fixed w-64
  // header: fixed h-16, left-64
  // mainContent: p-6, mt-16 (relative to its container which is offset by sidebar)

  return (
    <div className={cn('h-screen w-screen overflow-hidden bg-background text-foreground')}>
      <SidebarNav />
      {/* Main content area pushed to the right of the sidebar */}
      <div className="ml-64 flex h-full flex-col">
        <TopHeader />
        {/* Scrollable main content area below the header */}
        <main className="flex-1 overflow-y-auto pt-16">
          {/* Padding for the content itself */}
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
