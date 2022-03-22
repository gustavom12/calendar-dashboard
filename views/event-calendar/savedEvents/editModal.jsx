import React, { useState, useEffect } from "react";
import { FormattedMessage, intl } from "../translate/fake_react_intl";
import {
  Modal,
  Button,
  Form,
  Select,
  Input,
  DatePicker,
  TimePicker,
} from "antd";
import FormItemGenerator from "../base/FormItemGenerator";
import { EventCalendar } from "../../../entities/eventCalendar";
import Userc from "../../../entities/user";
import moment from "moment";
import NotificationGenerator from "../base/NotificationGenerator";
import TitleGenerator from "../base/TitleGenerator";

const EditModal = ({ editModal, setEditModal, getData }) => {
  const EventCalendarClass = new EventCalendar();
  const UserClass = new Userc();
  const [form] = Form.useForm();
  const [state, setState] = useState({
    date: "",
    start: "",
    end: "",
    duration: "",
    typeOfEvents: [],
    typeOfEvent: "",
    invited: "",
  });
  const [errors, setErrors] = useState({
    overlaps: "",
  });
  useEffect(() => {
    UserClass.currentAccount().then((res) => {
      EventCalendarClass.getEventTypes(res._id)
        .then((data) => setState({ ...state, typeOfEvents: data }))
        .catch(console.log);
    });
  }, []);

  useEffect(() => {
    if (editModal) {
      form.setFieldsValue({
        // 'type of event': state.typeOfEvents.find(a => a._id === editModal.eventTypeId),
        "type of event": editModal.eventTypeId,
        invited: editModal.clients[0].email,
      });
      setState({
        ...state,
        date: moment(editModal.start, "YYYY-MM-DD"),
        start: moment(editModal.start),
        end: moment(editModal.start).add(editModal.duration, "minutes"),
        eventTypeId: editModal.eventTypeId,
        invited: editModal.clients[0].email,
      });
    }
  }, [editModal]);

  useEffect(() => {
    if (state.end && state.start)
      if (state.end.isBefore(state.start))
        setErrors({ ...errors, overlaps: "End can't be lower than start" });
  }, [state.start, state.end]);
  const onSubmit = () => {
    form
      .validateFields()
      .then(() => {
        const selectedType = state.typeOfEvents.find(
          (a) => a._id === state.typeOfEvent
        );
        const parsedObj = {
          start: `${state.date.utc().format("YYYY-MM-DD")}T${state.start
            .utc()
            .format("HH:mm:ssZ")}`,
          duration: Math.abs(state.end.diff(state.start, "minutes")),
          clients: [
            {
              ...editModal.clients[0],
              email: state.invited,
            },
          ],
          title: selectedType ? selectedType.title : editModal.title,
          eventTypeId: selectedType ? selectedType._id : editModal.eventTypeId,
          type: selectedType ? selectedType.type : editModal.type,
        };
        EventCalendarClass.updateSavedEvent(editModal._id, parsedObj)
          .then((res) => {
            NotificationGenerator("Evento editado con éxito", intl, false);
            setEditModal(false);
            getData();
          })
          .catch(console.log);
      })
      .catch();
  };
  return (
    <Modal
      visible={editModal}
      onCancel={() => setEditModal(false)}
      footer={null}
      className="createeventypemodal"
      width={400}
      title={
        <h5 className="mb-0 mt-1 ">
          <strong>
            <FormattedMessage id="Configurate availability" />
          </strong>
        </h5>
      }
    >
      <Form
        className="mb-0 pb-0"
        form={form}
        requiredMark={false}
        scrollToFirstError
      >
        <div style={{ marginTop: -6 }}>
          <TitleGenerator id="Date" className="mt-0" />
          <DatePicker
            allowEmpty={[false]}
            style={{
              width: "100%",
              marginTop: 5,
              height: 42,
            }}
            allowClear={false}
            value={state.date}
            disabledDate={(date) =>
              date.isSameOrBefore(moment().startOf("day"))
            }
            format="YYYY-MM-DD"
            onChange={(moment, dateString) => {
              setState({ ...state, date: moment });
            }}
          />
          <div className="d-flex mt-4 justify-content-between w-100 gap-20">
            <div className="w-50">
              <TitleGenerator id="Start hour" className="mt-0" />
              <TimePicker
                // allowEmpty={[false]}
                className="w-100"
                format="HH:mm"
                allowClear={false}
                style={{
                  width: "100%",
                  marginTop: 5,
                  height: 42,
                  border: errors.overlaps && "1px solid #ff0000",
                }}
                value={state.start}
                onChange={(moment, dateString) => {
                  setState({ ...state, start: moment });
                }}
              />
            </div>
            <div className="w-50">
              <TitleGenerator id="Finish hour" className="mt-0" />
              <TimePicker
                allowEmpty={[false]}
                className="w-100"
                allowClear={false}
                minuteStep={5}
                style={{
                  width: "100%",
                  marginTop: 5,
                  height: 42,
                  border: errors.overlaps && "1px solid #ff0000",
                }}
                format="HH:mm"
                value={state.end}
                onChange={(moment, dateString) => {
                  setState({ ...state, end: moment });
                }}
              />
            </div>
          </div>
          {errors.overlaps && (
            <p className="text-danger my-3 text-center">
              <FormattedMessage id={errors.overlaps} />
            </p>
          )}
          <div className="mt-3">
            <FormItemGenerator
              label="Invited"
              handleChange={(v) => setState({ ...state, invited: v })}
              state={state.invited}
            />
          </div>
          <div style={{ marginTop: -8 }}>
            <FormItemGenerator
              label="Type of event"
              required
              requiredMark={false}
            >
              <Select
                value={state.typeOfEvent}
                className="w-100"
                style={{ height: 42, marginTop: -4 }}
                onChange={(v) => setState({ ...state, typeOfEvent: v })}
              >
                {state.typeOfEvents.map((e, i) => (
                  <Select.Option key={i} value={e._id}>
                    {e.title}
                  </Select.Option>
                ))}
              </Select>
            </FormItemGenerator>
          </div>
          <Button
            className="btn-purple w-100"
            style={{ marginTop: 0, height: 38 }}
            onClick={onSubmit}
          >
            <FormattedMessage id="Save" />
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditModal;
