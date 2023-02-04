import React, { useState } from "react";
import { TextField } from "components/field";
import style from "./form-info.css";
import { useNavigate } from "react-router-dom";
type InfoPetPros = {
  handle: () => {};
  petId: number;
  petName: string;
};
const URL_API_INFO = "https://app-pet.onrender.com/send-mail";
const sendInformationToTheOwner = async (idPet, name, phone, description) => {
  const response = await fetch(URL_API_INFO, {
    method: "POST",
    body: JSON.stringify({ idPet, name, phone, description }),
    headers: {
      "content-type": "application/json",
    },
  });
  const resJson = await response.json();
  console.log(resJson);
};
const FormInformation: React.FC = (props: InfoPetPros) => {
  const defaultError = { its: false, message: "" };
  const fieldIncomplete = { its: true, message: "Campo incompleto" };
  const [nameError, setNameError] = useState(defaultError);
  const [phoneError, setPhoneError] = useState(defaultError);
  const [descripError, setDescriptError] = useState(defaultError);
  const handleSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    const data = {
      name: target.name.value,
      description: target.description.value,
      phone: target.phone.value,
    };
    data.name == "" ? setNameError(fieldIncomplete) : "";
    data.description == "" ? setDescriptError(fieldIncomplete) : "";
    data.phone == "" ? setPhoneError(fieldIncomplete) : "";
    let fieldsCompleted = true;
    for (const key in data) {
      if (data[key] == "") {
        fieldsCompleted = false;
      }
    }
    fieldsCompleted
      ? sendInformationToTheOwner(
          props.petId,
          data.name,
          data.phone,
          data.description
        )
      : "";
  };
  return (
    <>
      <section className={style["information-container"]}>
        <div className={style["form-container"]}>
          <h2 className="subtitle">Reportar info de {props.petName}</h2>
          <form onSubmit={handleSubmit} className="form-information">
            <TextField
              id="name"
              name="name"
              label="Nombre"
              type="text"
              placeholder="Nombre"
              error={nameError}
            />
            <TextField
              id="phone"
              name="phone"
              label="Telefono"
              type="text"
              placeholder="Ej: 1155-555"
              error={phoneError}
            />
            <TextField
              id="description"
              name="description"
              label="¿Donde Lo viste?"
              type="text"
              placeholder="Descripcion"
              error={descripError}
            />
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link info-send">Enviar</button>
              </div>
              <div className="control">
                <button
                  className="button is-link is-light info-cancel"
                  onClick={() => props.handle()}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
export { FormInformation };
