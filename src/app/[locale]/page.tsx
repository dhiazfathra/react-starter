'use client';

import { Menu } from 'lucide-react';
import { useCallback, useState } from 'react';

import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { Footer } from '@/templates/Footer';
import { Hero } from '@/templates/Hero';
import { Navbar } from '@/templates/Navbar';

export default function IndexPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSidebar();
      }
    },
    [closeSidebar],
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <div className="flex min-h-screen flex-1 flex-col">
          <Navbar>
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:hidden"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </Button>
          </Navbar>
          <main className="flex-1 p-4">
            {' '}
            {/* Add padding here */}
            <Hero />
          </main>
          <Footer />
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={closeSidebar}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label="Close sidebar"
          />
        )}
      </div>
    </SidebarProvider>
  );
}
