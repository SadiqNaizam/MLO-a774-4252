import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  BarChart3,
  Home,
  FileText,
  BarChartBig,
  Database,
  Settings as SettingsIcon, // Renamed to avoid conflict with React.FC Settings
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Zap
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  isExpandable?: boolean;
  // Sub-items are not depicted in the provided image or requirements for this iteration.
  // If sub-items were needed, they could be added here: subItems?: NavItem[];
}

const mainNavItems: NavItem[] = [
  { id: 'overview', label: 'Overview', href: '#/', icon: Home },
  { id: 'reports', label: 'Reports', href: '#/reports', icon: FileText, isExpandable: true },
  { id: 'analytics', label: 'Analytics', href: '#/analytics', icon: BarChartBig, isExpandable: true },
  { id: 'data-sources', label: 'Data Sources', href: '#/data-sources', icon: Database, isExpandable: true },
  { id: 'setting', label: 'Setting', href: '#/setting', icon: SettingsIcon, isExpandable: true }, // Renamed Settings to SettingIcon to avoid conflict
  { id: 'help', label: 'Help', href: '#/help', icon: HelpCircle, isExpandable: true },
];

const SidebarNav: React.FC = () => {
  const [activePath, setActivePath] = useState<string>('#/');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    reports: false,
    analytics: false,
    'data-sources': false,
    setting: false,
    help: false,
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // In a real app, navigation would use react-router-dom's <Link> and useLocation
  const handleNavClick = (href: string, id: string, isExpandable?: boolean) => {
    setActivePath(href);
    if (isExpandable) {
      toggleSection(id);
    }
    // Placeholder for navigation: window.location.hash = href;
  };

  return (
    <aside className="fixed top-0 left-0 z-20 flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center px-6 border-b border-sidebar-foreground/10">
        <BarChart3 className="h-7 w-7 mr-3 text-white" />
        <h1 className="text-xl font-bold text-white">DataAI</h1>
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {mainNavItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activePath === item.href;
            return (
              <div key={item.id}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start h-10 px-3 text-sm font-medium',
                    isActive
                      ? 'bg-white/20 text-sidebar-foreground'
                      : 'text-sidebar-foreground/80 hover:bg-white/10 hover:text-sidebar-foreground',
                  )}
                  onClick={() => handleNavClick(item.href, item.id, item.isExpandable)}
                >
                  <IconComponent className="mr-3 h-5 w-5" />
                  {item.label}
                  {item.isExpandable && (
                    <span className="ml-auto">
                      {openSections[item.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </span>
                  )}
                </Button>
                {/* Placeholder for sub-menu if item is expandable and open 
                {item.isExpandable && openSections[item.id] && (
                  <div className="ml-7 mt-1 space-y-1">
                     Sub-items would go here 
                  </div>
                )} 
                */}
              </div>
            );
          })}
        </nav>
      </ScrollArea>
      <div className="mt-auto p-4">
        <div className="p-4 rounded-lg bg-black/10 border border-sidebar-foreground/10">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-1.5 rounded-md bg-sidebar-foreground text-sidebar">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm text-sidebar-foreground">Data Ai Pro</p>
            </div>
          </div>
          <p className="text-xs text-sidebar-foreground/70">
            Get access to all features on Data Ai
          </p>
        </div>
      </div>
    </aside>
  );
};

export default SidebarNav;
