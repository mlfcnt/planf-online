import React from 'react';
import { Button, Tag } from 'antd';
import { useRouter } from 'next/router';
import moment from 'moment';
import { useAllTasks } from '../api/tasks';

export const Navigation = () => {
  const router = useRouter();
  const { data: { data: { allTasks } = {} } = {} } = useAllTasks();
  const isHomepage = router.pathname === '/';

  const currentTasksLength = (allTasks || []).filter((x) => !x.isArchived)?.length;

  const handleRedirect = () => {
    if (isHomepage) {
      router.replace({
        pathname: '/',
        query: {
          reservation: moment().format('yyyy-MM-DD'),
        },
      });
    }
    router.push({
      pathname: '/',
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5vh' }}>
      <Button size="large" ghost style={{ marginRight: '3vw' }} onClick={handleRedirect}>
        {isHomepage ? 'Réserver' : 'Calendrier'}
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
        <>
          <span>Tâches / courses à faire</span>{' '}
          {currentTasksLength > 0 && (
            <Tag color="processing" style={{ verticalAlign: 'text-top', marginRight: '5px' }}>
              {currentTasksLength}
            </Tag>
          )}
        </>
      </Button>
    </div>
  );
};
