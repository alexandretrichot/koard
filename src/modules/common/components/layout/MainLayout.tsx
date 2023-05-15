import React from 'react';
import { AppBar } from './AppBar';
import { Footer } from './Footer';
import { SideBar } from './SideBar';

export type MainLayoutProps = {
  children?: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className='grid min-h-screen' style={{gridTemplateRows: `auto minmax(0, 1fr) auto`}}>
      <AppBar />
      <div className='grid' style={{ gridTemplateColumns: `auto minmax(0, 1fr)` }}>
        <SideBar />
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
};
