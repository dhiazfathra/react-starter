'use client';

import { HelpCircle, Home, Menu, Settings, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/utils/Helpers';

import { Switch } from './ui/switch';

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
  const { isTransparent, toggleTransparency } = useSidebar();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen transition-all duration-300',
        isTransparent
          ? 'bg-white/1 backdrop-blur-sm dark:bg-gray-900/80'
          : 'bg-white dark:bg-gray-900',
        isCollapsed ? 'w-16' : 'w-64',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
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

      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center p-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Opaque</span>
          <Switch
            checked={isTransparent}
            onCheckedChange={toggleTransparency}
            aria-label="Toggle sidebar transparency"
          />
          <span className="text-sm">Transparent</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
