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

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
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
      <div className="flex min-h-screen flex-col">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <div className="flex min-h-screen flex-1 flex-col">
          <Navbar>
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu size={24} />
            </Button>
          </Navbar>
          <main className="flex-1 p-4">
            <Hero />
          </main>
          <Footer />
        </div>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50"
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
