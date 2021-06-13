import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import moment from 'moment';

export const Navigation = () => {
  const router = useRouter();
  const isHomepage = router.pathname === '/'

  const handleRedirect = () => {
    if (isHomepage) {
      router.replace({
        pathname: '/',
        query: {
          reservation: moment().format('yyyy-MM-DD'),
        },
      })
   }
   router.push({
    pathname: '/',
  })

  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5vh' }}>
      <Button
        size="large"
        ghost
        style={{ marginRight: '3vw' }}
        onClick={handleRedirect}
      >
       {isHomepage ? 'Réserver' : 'Calendrier'  }
      </Button>
      <Button
        size="large"
        ghost
        onClick={() =>
          router.push({
            pathname: '/taches',
          })
        }
      >
        Tâches / courses à faire
      </Button>
    </div>
  );
};
