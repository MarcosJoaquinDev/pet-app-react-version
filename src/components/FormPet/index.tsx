import React, { useState } from "react";
import { PropsFields, list } from "./fieldsReports";
import { MapSearch } from "components/map-box";
import { MyDropzone } from "components/dropzone";
import { ButtonReportPet } from "components/FormPet/buttonForm";
import { userDataToken } from "hooks/DataUserAtom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";

const prop = {
  name: 0,
  type: 1,
  race: 2,
  location: 3,
  description: 4,
  picture: 5,
  lat: 6,
  lng: 7,
};
type petProperties = {
  id?: number;
  name: string;
  type: string;
  race: string;
  location: string;
  description: string;
  lat: number;
  lng: number;
  url_picture: string;
};
function setInformationPet(Pet: petProperties) {
  list[prop.name].placeholder = Pet.name;
  list[prop.race].placeholder = Pet.race;
  list[prop.type].placeholder = Pet.type;
  list[prop.description].text = Pet.description;
  list[prop.location].placeholder = Pet.location;
  coords.lat = Pet.lat;
  coords.lng = Pet.lng;
}
const Title: React.FC = (props: { text: string }) => (
  <h1 className="title is-1" style={{ textAlign: "center" }}>
    {props.text}
  </h1>
);
const API_PUSH_PET = "https://app-pet.onrender.com/me/pet";
const setNewPet = async (token: string, pet: petProperties) => {
  const { name, type, race, url_picture, description, location, lat, lng } =
    pet;

  const resp = await fetch(API_PUSH_PET, {
    method: "POST",
    body: JSON.stringify({
      name,
      type,
      race,
      url_picture,
      description,
      location,
      lat,
      lng,
    }),
    headers: {
      Authorization: `bearer ${token}`,
      "content-type": "application/json",
    },
  });
  const pets: Response = await resp.json();
};
const useSetPetChanges = async (infoPet: any, petId: number, token: string) => {
  infoPet.coords
    ? (infoPet = {
        ...infoPet,
        lat: infoPet.coords.lat,
        lng: infoPet.coords.lng,
      })
    : "";
  const response = await fetch(API_PUSH_PET + petId, {
    method: "PUT",
    body: JSON.stringify(infoPet),
    headers: {
      Authorization: `bearer ${token}`,
      "content-type": "application/json",
    },
  });
  return response;
};
type coords = {
  lat: number;
  lng: number;
};
let coords = {
  lat: 0,
  lng: 0,
};
const FormPet: React.FC = (Pet?: petProperties) => {
  Pet && setInformationPet(Pet);
  if (!Pet.name) {
    coords.lat = -58.381635;
    coords.lng = -34.603577;
  }
  const [token, setToken] = useRecoilState(userDataToken);
  const [coordsForm, setCordsForm] = useState<coords>(null);
  const [url, setUrl] = useState<string>(null);
  const [errorField, setErrorField] = useState(false);
  const navigate = useNavigate();
  const handleData = (e) => {
    e.preventDefault();
    const button: Element = e.nativeEvent.submitter;
    const nameOfTheClassButton: string = button.className;
    console.log(nameOfTheClassButton);
    const eventCorrect: boolean = nameOfTheClassButton.includes("is-success")
      ? true
      : false;
    const data = {
      name: e.target.name.value,
      type: e.target.type.value,
      race: e.target.race.value,
      description: e.target.description.value,
      location: e.target.location.value,
      coords: coordsForm,
      url_picture: url,
    };
    let fieldsCompleted = true;
    if (!Pet.name && eventCorrect) {
      for (const key in data) {
        if (data[key] == "") {
          list[prop[key]].setError();
          fieldsCompleted = false;
        }
        if (data[key] === null) {
          fieldsCompleted = false;
        }
      }
    }
    if (Pet.name && eventCorrect) {
      let changes = {};
      for (const key in data) {
        data[key]
          ? (changes = {
              ...changes,
              [key]: data[key],
            })
          : "";
      }
      console.log("arrays fields", changes);
      const confirmationMessage: boolean = window.confirm(
        "¿Estas seguro que desea guardar los cambios?"
      );
      if (confirmationMessage) {
        useSetPetChanges(changes, Pet.id, token.token).then((res) => {
          const setChange = { token: token.token, changes };
          setToken(setChange);
          navigate("/home");
        });
      }
    }
    if (fieldsCompleted && eventCorrect && !Pet.name) {
      const confirmationMessage: boolean = window.confirm(
        "¿Estas seguro que desea publicar?"
      );
      confirmationMessage &&
        setNewPet(token.token, {
          ...data,
          lat: coordsForm.lat,
          lng: coordsForm.lng,
          url_picture: url,
        }).then((res) => {
          const changes = { newpet: res };
          const setChange = { token: token.token, changes };
          setToken(setChange);
          navigate("/my-pets");
        });
    }
    if (!fieldsCompleted && eventCorrect) {
      setErrorField(true);
      console.log("faltan datos");
    }
  };
  async function deletePet(id: number, token: string) {
    const response = await fetch(API_PUSH_PET + id, {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${token}`,
        "content-type": "application/json",
      },
    });
    console.log(response);
    return response;
  }
  const handleCancelClick = () => {
    if (Pet.id) {
      const confirm = window.confirm("¿Estas seguro que desea dar de alta?");
      confirm &&
        deletePet(Pet.id, token.token).then((res) => {
          const changes = Pet.id + " delete";
          const setChange = { token: token.token, changes };
          setToken(setChange);
          navigate("/home");
        });
    } else {
      navigate("/home");
    }
  };
  const title: string = !Pet.name
    ? "Reportar Mascota"
    : "Cambios de " + Pet.name;
  return (
    <>
      <Title text={title} />
      <main
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <div
          className="box"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form
            onSubmit={handleData}
            style={{ width: "600px", padding: "25px" }}
          >
            {PropsFields.name}
            {PropsFields.type}
            {PropsFields.race}
            <div className="box">
              <MyDropzone handle={setUrl} urlPic={Pet.url_picture} />
            </div>
            {PropsFields.description}
            {PropsFields.notification}
            {PropsFields.location}
            <div
              className="box"
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "rgb(225 239 8 / 38%)",
              }}
            >
              <MapSearch
                onChange={setCordsForm}
                initCords={{ lat: coords.lat, lng: coords.lng }}
              />
            </div>
            {!Pet.name ? (
              <ButtonReportPet text={"Reportar mascota"} />
            ) : (
              <ButtonReportPet text={"Guardar Cambios"} />
            )}
            {errorField ? (
              <p className="help is-danger">
                Error: completar todos los campos
              </p>
            ) : (
              ""
            )}
          </form>
          <button
            style={{ width: "550px" }}
            className="button is-danger is-medium"
            onClick={handleCancelClick}
          >
            {Pet.id ? "Reportar como encontrada" : "Cancelar"}
          </button>
        </div>
      </main>
    </>
  );
};

export { FormPet };
