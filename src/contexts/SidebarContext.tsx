import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type SidebarContextType = {
  isTransparent: boolean;
  toggleTransparency: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isTransparent, setIsTransparent] = useState(false);

  const toggleTransparency = useCallback(() => {
    setIsTransparent((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      isTransparent,
      toggleTransparency,
    }),
    [isTransparent, toggleTransparency],
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
