import React from "react";
import { Navigation } from './Navigation';
import { useMediaQuery } from 'react-responsive'


export const MainLayout = ({ children }) => {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })

  return (
    <div className="mainContainer" style={{maxWidth : isDesktopOrLaptop ? '70%' : '100%'}}>
      <h1 className="mainTitle">Planf'Online</h1>
      <Navigation />
      <main style={{padding : isDesktopOrLaptop ? '1.5rem' : '0rem'}}>{children}</main>
    </div>
  );
}
