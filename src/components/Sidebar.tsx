'use client';

import { HelpCircle, Home, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/Helpers';

const sidebarItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white px-4 py-8 dark:border-gray-700 dark:bg-gray-900 rtl:border-l rtl:border-r-0">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
        Logo
      </h2>

      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav>
          {sidebarItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  'mb-2 w-full justify-start',
                  pathname === item.href
                    ? 'bg-gray-100 dark:bg-gray-800'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800',
                )}
              >
                <item.icon className="mr-2 size-5" />
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="mt-6">
          <Button variant="outline" className="w-full">
            Log out
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
