import React, { useMemo, useEffect } from "react";
import { Form, Button, DatePicker, Select, Input } from 'antd';
import { useSaveBooking, useUpdateBooking } from "../api/bookings";
import moment from "moment";
import { useAllPeople } from "../api/people";
moment.locale("fr");
const { Option } = Select;


function BookForm({ initialValues = {}, eventToEdit = {}, toggleModal }) {
  const [form] = Form.useForm();
  const { isLoading: loadingPeople, error: errorPeople, data } = useAllPeople();
  const allPeople = useMemo(() => {
    if (!data) return [];
    return data.data.allPeople;
  }, [data]);

  const { mutate: saveBooking } = useSaveBooking();
  const { mutate: updateBooking } = useUpdateBooking();
  const { mutate: deleteBooking } = useUpdateBooking(true);

  useEffect(() => {
    form.setFieldsValue(initialValues)
   }, [form, initialValues])

  const onFinish = ({ who, endDate, startDate, comment }) => {
    if (eventToEdit.key) {
      const editEvent = {
        id: eventToEdit.key,
        data: {
          who: {
            connect: { id: who },
          },
          comment,
          startDate: moment(startDate).format('yyyy-MM-DD'),
          endDate: moment(endDate).format('yyyy-MM-DD'),
        },
      };
      updateBooking(editEvent);
      toggleModal();
      return;
    }

    const newEvent = {
      who: {
        connect: {
          id: who,
        },
      },
      comment,
      startDate: moment(startDate).format('yyyy-MM-DD'),
      endDate: moment(endDate).format('yyyy-MM-DD'),
    };

    form.resetFields();
    saveBooking(newEvent);
    toggleModal();
  };

  const deleteEvent = (id) => {
    // const confirm = window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?');
    // if (confirm === true) {
      deleteBooking({ id });
      toggleModal();
    // } else return;
  };

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

  if (loadingPeople) return <p>Chargement des données...</p>;
  if (errorPeople) return <p>{errorPeople}</p>;

  return (
    <Form form={form} name="book" onFinish={onFinish} initialValues={initialValues}>
      <Form.Item
        label="Qui"
        name="who"
        rules={[
          {
            required: true,
            message: 'Veuillez préciser qui passe la réservation',
          },
        ]}
      >
        <Select placeholder="Qui passe la réservation ?" allowClear>
          {peopleOptions}
        </Select>
      </Form.Item>
      <Form.Item
        label="Arrivée"
        name="startDate"
        rules={[
          {
            required: true,
            message: "Veuillez préciser la date d'arrivée",

          },
        ]}
      >
        <DatePicker placeholder="Date d'arrivée" format={'DD MMMM'} />
      </Form.Item>
      <Form.Item
        label="Départ"
        name="endDate"
        rules={[
          {
            required: true,
            message: 'Veuillez préciser la date de départ',
          }
        ]}
      >
        <DatePicker placeholder="Date de départ" format={'DD MMMM'} />
      </Form.Item>
      <Form.Item label="Commentaire (facultatif)" name="comment">
        <Input.TextArea />
      </Form.Item>
      <div style={{display : 'flex'}}>
          <Form.Item style={{marginRight : '2vh'}}>
            <Button type="primary" htmlType="submit">
              Enregistrer
            </Button>
          </Form.Item>
          {eventToEdit.key && (
            <Form.Item>
              <Button type="danger" onClick={() => deleteEvent(eventToEdit.key)}>
                Supprimer la réservation
              </Button>
            </Form.Item>
          )}
      </div>
    </Form>
  );
}

export default BookForm;
