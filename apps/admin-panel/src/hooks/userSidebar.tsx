import React, { createContext, useContext, useState } from 'react';

interface ISidebarContext {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext({} as ISidebarContext);

export const SidebarProvider = ({ children }: React.PropsWithChildren): React.ReactElement => {
  const [open, setOpen] = useState(false);

  return <SidebarContext.Provider value={{ open, setOpen }}>{children}</SidebarContext.Provider>;
};

export default function useSidebar(): ISidebarContext {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }

  return context;
}
