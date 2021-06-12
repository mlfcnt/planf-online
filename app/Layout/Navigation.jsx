import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';

export const Navigation = () => {
  const router = useRouter();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5vh' }}>
      <Button
        size="large"
        ghost
        style={{ marginRight: '3vw' }}
        onClick={() =>
          router.replace({
            pathname: '/',
            query: {
              reservation: true,
            },
          })
        }
      >
        Réserver
      </Button>
      <Button
        size="large"
        ghost
        disabled
        onClick={() =>
          router.push({
            pathname: '/todo',
          })
        }
      >
        Todo List (en construction...)
      </Button>
    </div>
  );
};
