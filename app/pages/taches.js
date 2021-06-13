import React from 'react';
import { useAllTasks, useUpdateTask } from '../api/tasks';
import { Table, Button } from 'antd';
import { useToggle } from 'react-use';
import moment from 'moment';
import { orderBy } from 'lodash';
import { TaskForm } from '../components/TaskForm';
import { useMediaQuery } from 'react-responsive';
moment.locale('fr');

const { Column } = Table;

function todo() {
  const { isLoading, data: { data: { allTasks } = {} } = {} } = useAllTasks();
  const [archivedFilter, toggleArchivedFilter] = useToggle(true);
  const { mutate: updateTask } = useUpdateTask();
  const [showModal, toggleModal] = useToggle(false);
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });

  if (isLoading) return <p>Chargement des tâches...</p>;

  const orderByDate = (tasks) => orderBy(tasks, ['isArchived', 'createdAt'], ['asc', 'desc']);

  const getTasksToDisplay = () => {
    const tasksToDisplay = !archivedFilter ? allTasks : allTasks.filter((x) => !x.isArchived);
    return orderByDate(tasksToDisplay);
  };

  const handleDelete = (task) => {
    updateTask({
      id: task.id,
      data: {
        isArchived: true,
      },
    });
  };

  return (
    <>
      <div style={{ paddingTop: '10px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'start',
            marginBottom: '20px',
          }}
        >
          <Button
            onClick={toggleModal}
            style={{ marginLeft: '20px', marginBottom: isDesktopOrLaptop ? 'initial' : '20px' }}
            type="primary"
          >
            Ajouter une tâche
          </Button>
          <Button onClick={toggleArchivedFilter} style={{ marginLeft: '20px' }}>
            {`${archivedFilter ? 'Afficher' : 'Masquer'} les tâches supprimées`}
          </Button>
        </div>
        <Table
          dataSource={getTasksToDisplay()}
          style={{ margin: 'auto' }}
          scroll
          pagination={false}
        >
          <Column title="Tâche" dataIndex="name" key="name" />
          {isDesktopOrLaptop && (
            <>
              <Column
                title="Ajoutée par"
                dataIndex="createdBy"
                key="quantity"
                render={(text, record) => {
                  return record.createdBy.name || '?';
                }}
              />
              <Column
                title="Ajoutée le"
                dataIndex="createdAt"
                key="quantity"
                render={(text, record) => {
                  return moment(record.createdAt).format('DD MMMM YYYY');
                }}
              />
            </>
          )}
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Button
                disabled={record.isArchived}
                danger={!record.isArchived}
                onClick={() => handleDelete(record)}
              >
                {record.isArchived ? 'Tâche supprimée' : 'Supprimer'}
              </Button>
            )}
          />
        </Table>
      </div>
      <TaskForm show={showModal} toggle={toggleModal} />
    </>
  );
}

export default todo;
