'use client';

import { HelpCircle, Home, Menu, Settings, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/Helpers';

const sidebarItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Close sidebar when route changes (for mobile)
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-white transition-all duration-300 dark:border-gray-700 dark:bg-gray-900 rtl:border-l rtl:border-r-0',
        isCollapsed ? 'w-16' : 'w-64',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Logo
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="md:hidden"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {sidebarItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                'mb-2 w-full justify-start',
                pathname === item.href
                  ? 'bg-gray-100 dark:bg-gray-800'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800',
                isCollapsed ? 'px-2' : 'px-4',
              )}
            >
              <item.icon className="size-5" />
              {!isCollapsed && <span className="ml-2">{item.name}</span>}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4">
        <Button variant="outline" className="w-full">
          {isCollapsed ? <User size={20} /> : 'Log out'}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
