import { Button, Input, Select } from 'antd';
import { Form } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useMemo } from 'react';
import { useAllPeople } from '../api/people';
import { useSaveTask } from '../api/tasks';
const { Option } = Select;

export const TaskForm = ({ show, toggle }) => {
  const [form] = Form.useForm();
  const { isLoading: loadingPeople, data } = useAllPeople();
  const { mutate: saveTask } = useSaveTask();

  const allPeople = useMemo(() => {
    if (!data) return [];
    return data.data.allPeople;
  }, [data]);

  const peopleOptions = useMemo(
    () =>
      (allPeople || [])
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((people) => (
          <Option
            key={people.id}
            value={people.id}
          >{`${people.name} ${people.family.name}`}</Option>
        )),
    [allPeople],
  );

  if (loadingPeople) return <p>Chargement...</p>;

  const onFinish = ({ name, createdBy }) => {
    console.log({ name, createdBy });
    try {
      saveTask({
        name,
        createdBy: {
          connect: {
            id: createdBy,
          },
        },
      });
      toggle();
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    toggle();
    form.resetFields();
  };

  return (
    <Modal title="Ajouter une tâche" visible={show} onCancel={handleClose} footer={null}>
      <Form form={form} name="book" onFinish={onFinish}>
        <Form.Item
          label="Tâche"
          name="name"
          rules={[
            {
              required: true,
              message: 'Veuillez préciser la description de la tâche',
            },
          ]}
        >
          <Input.TextArea placeholder="Ex: Apporter du liquide vaisselle" />
        </Form.Item>
        <Form.Item
          label="Ajoutée par"
          name="createdBy"
          rules={[
            {
              required: true,
              message: 'Veuillez préciser qui créé cette tâche',
            },
          ]}
        >
          <Select placeholder="Qui créé cette tâche ?" allowClear>
            {peopleOptions}
          </Select>
        </Form.Item>

        <Form.Item style={{ marginRight: '2vh' }}>
          <Button type="primary" htmlType="submit">
            Enregistrer
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
