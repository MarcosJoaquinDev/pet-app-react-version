import React, { useState, useEffect } from "react";
import { Form } from "components/Form";
import { propertiesFields } from "./profile-props";
import { getUserData } from "hooks/DataUserAtom";
import { useRecoilValue, useRecoilState } from "recoil";
import { userDataToken } from "hooks/DataUserAtom";

type DataUser = {
  name: string;
  last_name: string;
  user_name: string;
  email: string;
};
const URL_API = "https://dwf-m7-postgre-prueba.herokuapp.com/me";

const EdithProfile: React.FC = () => {
  const data: DataUser = useRecoilValue<DataUser>(getUserData);
  const [fields, setFields] = useState(null);
  const [changes, setChanges] = useState(null);
  const [dataAtom, setDataAtom] = useRecoilState(userDataToken);

  const updateUserData = async (userChanges, token: string) => {
    const changes = {
      name: userChanges.name,
      last_name: userChanges.lastname,
      user_name: userChanges.username,
      email: userChanges.email,
    };
    const resp = await fetch(URL_API, {
      method: "PUT",
      body: JSON.stringify(changes),
      headers: {
        Authorization: `bearer ${token}`,
        "content-type": "application/json",
      },
    });
    const user: Response = await resp.json();
    console.log(user);
    setDataAtom({ ...dataAtom, changes: userChanges });
  };

  useEffect(() => {
    if (fields) {
      let dataChanges = {};
      for (const key in fields) {
        fields[key] == ""
          ? console.log("vacio")
          : (dataChanges = { ...dataChanges, [key]: fields[key] });
      }
      setChanges(dataChanges);
    }
  }, [fields]);

  useEffect(() => {
    console.log(changes);
    if (changes) {
      const confirm = window.confirm(
        "¿Estas seguro que desea hacer los cambios?"
      );
      confirm ? updateUserData(changes, dataAtom.token) : "";
    }
  }, [changes]);
  const user = {
    name: data.name,
    lastname: data.last_name,
    username: data.user_name,
    email: data.email,
  };
  const placeholderValues = Object.values(user);
  let i = -1;
  const props = propertiesFields.map((prop) => {
    i++;
    return {
      ...prop,
      placeholder: placeholderValues[i],
    };
  });

  return (
    <>
      <h1 className="title" style={{ alignText: "center" }}>
        Cambiar mi informacion
      </h1>
      <Form
        fields={props}
        button={{ class: "button is-link", label: "Guardar cambios" }}
        handle={setFields}
      ></Form>
    </>
  );
};

export default EdithProfile;
