import React, { useState, useEffect } from "react";
import style from "./sign-in.css";
import { Form } from "components/Form";
import { UserSignInAtom, getUserSignInToken } from "hooks/SignInAtom";
import { userDataToken } from "hooks/DataUserAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

type errorInput = {
  its: boolean;
  message: string;
};
type loginData = {
  email: string;
  pass: string;
};
const defaultError = { its: false, message: "" };
const fieldIncompletedError = { its: true, message: "Campo de incompleto" };

const SignInPage: React.FC = () => {
  const [emailError, setEmailError] = useState<errorInput>(defaultError);
  const [passwordError, setPasswordError] = useState<errorInput>(defaultError);
  const [user, setUser] = useRecoilState(UserSignInAtom);
  const [userToken, setUserToken] = useRecoilState(userDataToken);
  const [fields, setFields] = useState<loginData>(null);
  const response = useRecoilValue(getUserSignInToken);

  const go = useNavigate();
  const dataChangesForm = (data: loginData) => {
    data.email != "" && data.pass != "" ? setUser(data) : "";
    data.email == "" && setEmailError(fieldIncompletedError);
    data.pass == "" && setPasswordError(fieldIncompletedError);
  };

  useEffect(() => {
    fields ? dataChangesForm(fields) : "";
  }, [fields]);

  useEffect(() => {
    if (response == false && fields?.email) {
      setEmailError({ its: true, message: "Este Email no esta registrado" });
    }
    if (response == "Error: Datos incorrectos" && fields) {
      setPasswordError({ its: true, message: "Contraseña Invalida" });
    }
    if (response.token) {
      const data = { token: response.token, changes: "" };
      setUserToken(data);
      go("/home");
    }
  }, [response, fields]);

  const propertiesFields = [
    {
      name: "email",
      label: "Email",
      id: "sign-email",
      type: "text",
      error: emailError,
    },
    {
      name: "pass",
      label: "Contraseña",
      id: "sign-pass",
      type: "password",
      error: passwordError,
    },
  ];
  return (
    <>
      <h1 className="title is-1" style={{ textAlign: "center" }}>
        Ingresar
      </h1>
      <main className={style.container}>
        <Form
          fields={propertiesFields}
          button={{ class: "button is-link", label: "Aceptar" }}
          handle={setFields}
        />
      </main>
    </>
  );
};

export default SignInPage;
