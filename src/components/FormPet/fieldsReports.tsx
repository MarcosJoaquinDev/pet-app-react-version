import React, { useState } from "react";
import { list } from "./props";
import { TextField } from "components/field";

const prop = {
  name: 0,
  type: 1,
  race: 2,
  location: 3,
  description: 4,
};
const useError = () => {
  const emptyField = { its: true, message: "Campo incompleto" };
  const [error, setError] = useState({ its: false, message: "" });
  const setErrorField = () => setError(emptyField);
  return {
    error,
    setErrorField,
  };
};
const NameProp: React.FC = (name?: string) => {
  const { error, setErrorField } = useError();
  list[prop.name].error = error;
  list[prop.name].setError = setErrorField;
  return (
    <TextField
      key={list[prop.name].id}
      name={list[prop.name].name}
      label={list[prop.name].label}
      type={list[prop.name].type}
      placeholder={list[prop.name].placeholder}
      error={list[prop.name].error}
    />
  );
};

const TypeProp: React.FC = () => {
  const { error, setErrorField } = useError();
  list[prop.type].error = error;
  list[prop.type].setError = setErrorField;
  return (
    <TextField
      key={list[prop.type].id}
      name={list[prop.type].name}
      label={list[prop.type].label}
      type={list[prop.type].type}
      placeholder={list[prop.type].placeholder}
      error={list[prop.type].error}
    />
  );
};

const RaceProp: React.FC = () => {
  const { error, setErrorField } = useError();
  list[prop.race].error = error;
  list[prop.race].setError = setErrorField;
  return (
    <TextField
      key={list[prop.race].id}
      name={list[prop.race].name}
      label={list[prop.race].label}
      type={list[prop.race].type}
      placeholder={list[prop.race].placeholder}
      error={list[prop.race].error}
    />
  );
};
const DescriptionProp: React.FC = () => {
  const { error, setErrorField } = useError();
  list[prop.description].error = error;
  list[prop.description].setError = setErrorField;
  return (
    <div className="box">
      <label className="label">Description</label>
      <textarea
        className={error.its ? "textarea is-danger" : "textarea"}
        name="description"
        placeholder={list[prop.description].text}
      ></textarea>
      {error.its ? <p className="help is-danger">{error?.message}</p> : ""}
    </div>
  );
};
const LocationProp: React.FC = () => {
  const { error, setErrorField } = useError();
  list[prop.location].error = error;
  list[prop.location].setError = setErrorField;
  return (
    <TextField
      key={list[prop.location].id}
      name={list[prop.location].name}
      label={list[prop.location].label}
      type={list[prop.location].type}
      placeholder={list[prop.location].placeholder}
      error={list[prop.location].error}
    />
  );
};
const NotificationProp: React.FC = () => (
  <div className="notification is-warning is-light">
    <button className="delete"></button>
    Buscá un punto de <strong>referencia para reportar a tu mascota.</strong>
    Puede ser una dirección, un barrio o una ciudad.
  </div>
);
const PropsFields = {
  name: <NameProp />,
  type: <TypeProp />,
  race: <RaceProp />,
  description: <DescriptionProp />,
  notification: <NotificationProp />,
  location: <LocationProp />,
};

export { PropsFields, list };
