import React from 'react';
import { Navigation } from './Navigation';
import { useMediaQuery } from 'react-responsive';
import { Footer } from 'antd/lib/layout/layout';
import { useRouter } from 'next/router';

export const MainLayout = ({ children }) => {
  const router = useRouter();
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });

  return (
    <>
      <div className="mainContainer" style={{ maxWidth: isDesktopOrLaptop ? '70%' : '100%' }}>
        <h1
          className="mainTitle"
          onClick={() =>
            router.push({
              pathname: '/',
            })
          }
        >
          Planf'Online
        </h1>
        <Navigation />
        <main style={{ padding: isDesktopOrLaptop ? '1.5rem' : '0rem' }}>{children}</main>
      </div>
      {/* <Footer className="footer">
       Remarques, suggestions, invitations pour manger du lapin :{' '}
        <a href="mailto:tommymartin1234@gmail.com">tommymartin1234@gmail.com</a>
      </Footer> */}
    </>
  );
};
