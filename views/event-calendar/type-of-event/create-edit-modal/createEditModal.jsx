import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Select, Input, TimePicker } from "antd";
import FormItemGenerator from "../../base/FormItemGenerator";
import { FormattedMessage } from "../../translate/fake_react_intl";
import { EventCalendar } from "../../../../entities/eventCalendar";
import Userc from "../../../../entities/user";
import moment from "moment";
import TitleGenerator from "../../base/TitleGenerator";

function CreateEditModal({
  createEditModal,
  setCreateEditModal,
  typeOfEvents,
  setTypeOfEvents,
  User,
}) {
  const UserClass = new Userc();
  const formRef = React.createRef();
  const EventCalendarClass = new EventCalendar();
  const [state, setState] = useState({
    type: { name: "", type_enum: "" },
    title: "",
    duration: 30,
    admins: [{}],
    private: false,
  });

  const [userConnectedWithCalendar, setUserConnectedWithCalendar] =
    useState(false);

  const onChange = (key, v) => {
    setState((val) => ({ ...val, [key]: v }));
  };

  useEffect(() => {
    UserClass.currentAccount().then((res) => {
      EventCalendarClass.userIsConnectedWithCalendar(res._id)
        .then((data) => setUserConnectedWithCalendar(data))
        .catch(console.log);
    });
  }, []);

  useEffect(() => {
    if (createEditModal && createEditModal !== true) {
      formRef.current.setFieldsValue({
        "name of the event": createEditModal.title,
        "location/medium": createEditModal.type.type_enum,
        type: createEditModal.type.name,
        location: createEditModal.type.name,
        durationinminutes: createEditModal.duration,
      });
      setState(createEditModal);
    }
  }, [createEditModal]);
  const [form] = Form.useForm();

  const onSubmit = () => {
    form
      .validateFields()
      .then(() => {
        if (!state.duration) return;
        if (!state._id)
          EventCalendarClass.createEventType({
            ...state,
            admins: [
              {
                firstName: User.personalData.firstName,
                adminId: User._id,
                lastName: User.personalData.lastName,
                imageURL: User.personalData.imageURL,
              },
            ],
            adminsIds: [User._id],
          })
            .then((res) => {
              setTypeOfEvents((val) => [...val, res]);
              setCreateEditModal(null);
            })
            .catch(() => {
              setCreateEditModal(null);
            });
        else
          EventCalendarClass.updateEventTypes(state._id, { ...state })
            .then((res) => {
              setTypeOfEvents((val) =>
                val.map((el, i) => (el._id === state._id ? state : el))
              );
              setCreateEditModal(null);
            })
            .catch(() => {
              setCreateEditModal(null);
            });
      })
      .catch();
  };

  return (
    <Modal
      style={{ width: 400 }}
      visible={createEditModal}
      onCancel={() => {
        form.resetFields();
        setCreateEditModal(false);
      }}
      footer={null}
      className="createeventypemodal"
      width={400}
      title={
        <h5 className="mb-0 mt-1">
          <strong>
            <FormattedMessage id="Create event" />
          </strong>
        </h5>
      }
    >
      <Form requiredMark={false} ref={formRef} form={form} scrollToFirstError>
        <FormItemGenerator
          label="Name of the event"
          state={state.title}
          className="mt-0"
          required
          handleChange={(v) => onChange("title", v)}
        />
        <TitleGenerator id="Location/Medium" style={{ padding: "0 0 8px 0" }} />
        <Select
          name="location/medium"
          placeholder={<FormattedMessage id="Location/Medium" />}
          onChange={(v) =>
            setState((val) => ({
              ...val,
              type: { name: val?.type?.name, type_enum: v },
            }))
          }
          required
          className="w-100 mt-3"
          value={state.type.type_enum}
        >
          {userConnectedWithCalendar && (
            <Select.Option value="meet">Google Meet</Select.Option>
          )}{" "}
          <Select.Option value="face_to_face">
            {" "}
            <FormattedMessage id="FaceToFace" />{" "}
          </Select.Option>
          <Select.Option value="another">
            <FormattedMessage id="Another" />{" "}
          </Select.Option>
          {/* <Select.Option value=""><FormattedMessage id="FaceToFace" /></Select.Option> */}
        </Select>
        {state.type.type_enum === "another" && (
          <FormItemGenerator
            label="Type"
            state={state.type.name}
            className="mt-3"
            required
            handleChange={(v) =>
              setState((val) => ({
                ...val,
                type: { name: v, type_enum: val?.type?.type_enum },
              }))
            }
          />
        )}
        {state.type.type_enum === "face_to_face" && (
          <FormItemGenerator
            label="Location"
            className="mt-3"
            state={state.type.name}
            required
            handleChange={(v) =>
              setState((val) => ({
                ...val,
                type: { name: v, type_enum: val?.type?.type_enum },
              }))
            }
          />
        )}
        <div className="mt-4">
          {/* <Form.Item>
            <Input
              className="mt-3"
              state={state.duration || null}
              required
              type="number"
              step={5}
              max={500}

            />
          </Form.Item> */}
          <TitleGenerator id="DurationInMinutes" />
          <TimePicker
            allowEmpty={[false]}
            className="w-100"
            allowClear={false}
            style={{
              width: "100%",
              marginTop: 5,
              height: 42,
              // border: errors.overlaps && '1px solid #ff0000',
            }}
            format="HH:mm"
            value={moment().startOf("day").add(state.duration, "minutes")}
            onChange={(moment, dateString) => {
              setState({
                ...state,
                duration: moment.hours() * 60 + moment.minutes(),
              });
            }}
            minuteStep={5}
          />
          {/* <Select
            name="location/medium"
            placeholder={<FormattedMessage id="Location/Medium" />}
            onChange={(v) => {
              setState((val) => ({
                ...val,
                duration: Number(v),
              }));
            }}
            required
            className="w-100 mt-3"
            value={state.duration || null}
          >
            {[...Array(91)].map((_, i) => (
              <Select.Option key={i} value={i * 5}>
                {i * 5}
              </Select.Option>
            ))}
          </Select> */}
        </div>
        <Button className="btn-purple w-100 mt-5" onClick={onSubmit}>
          {!state._id ? (
            <FormattedMessage id="Create event" />
          ) : (
            <FormattedMessage id="Save" />
          )}
        </Button>
      </Form>
    </Modal>
  );
}
export default CreateEditModal;
