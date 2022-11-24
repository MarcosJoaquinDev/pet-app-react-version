import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type propsField = {
  name: string;
  placeholder: string;
  error: {
    its: boolean;
    message: string;
  };
};
const Passwordfield: React.FC = (props: propsField) => {
  return (
    <div className="field">
      <p className="control has-icons-left">
        <input
          className={props.error.its ? "input is-danger" : "input"}
          type="password"
          name={props.name}
          placeholder={props.placeholder}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-lock"></i>
        </span>
        {props.error.its ? (
          <p className="help is-danger">{props.error.message}</p>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};
const EmailField: React.FC = (props: propsField) => {
  return (
    <>
      <div className="control has-icons-left has-icons-right">
        <input
          className={props.error.its ? "input is-danger" : "input"}
          type="email"
          name={props.name}
          placeholder={props.placeholder}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-envelope"></i>
        </span>
        {props.error.its ? (
          <p className="help is-danger">{props.error.message}</p>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
const URL_API_TOKEN = "https://dwf-m7-postgre-prueba.herokuapp.com/auth/token";
const URL_API_UPDATE =
  "https://dwf-m7-postgre-prueba.herokuapp.com/me/password";
const getToken = async (email: string, password: string) => {
  const response = await fetch(URL_API_TOKEN, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "content-type": "application/json",
    },
  });
  const resJson = await response.json();
  return resJson;
};
const changesPassword = async (token: string, newpass) => {
  console.log(token, newpass, "chanfespass");

  const resp = await fetch(URL_API_UPDATE, {
    method: "PUT",
    body: JSON.stringify(newpass),
    headers: {
      Authorization: `bearer ${token}`,
      "content-type": "application/json",
    },
  });
  const user: Response = await resp.json();
  return user;
};

const EdithAuthorization: React.FC = () => {
  const go = useNavigate();
  const defaultError = { its: false, message: "" };
  const fieldIncompleted = { its: true, message: "Campo incompleto" };
  const [emailError, setEmailError] = useState(defaultError);
  const [actualPass, setActualPass] = useState(defaultError);
  const [newPass, setNewPass] = useState(defaultError);
  const [newPass2, setNewPass2] = useState(defaultError);
  const [user, setUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const targt = e.target;
    const data = {
      email: targt["email"].value,
      password: targt["password"].value,
      newPasswordT: targt["new-pass-top"].value,
      newPasswordD: targt["new-pass-bottom"].value,
    };
    data.email == "" ? setEmailError(fieldIncompleted) : "";
    data.password == "" ? setActualPass(fieldIncompleted) : "";
    data.newPasswordT == "" ? setNewPass(fieldIncompleted) : "";
    data.newPasswordD == "" ? setNewPass2(fieldIncompleted) : "";
    const newPassCheck = data.newPasswordD != data.newPasswordT;
    newPassCheck
      ? setNewPass2({ its: true, message: "no coinciden las contraseñas" })
      : "";
    let fieldsCompleted = true;

    for (const key in data) {
      if (data[key] == "") {
        fieldsCompleted = false;
      }
    }
    fieldsCompleted && !newPassCheck
      ? setUser({
          email: data.email,
          password: data.password,
          new_password: data.newPasswordD,
        })
      : "";
  };
  async function pushData(data) {
    const result = await getToken(data.email, data.password);
    if (result == "Error: Datos incorrectos") {
      setActualPass({ its: true, message: "Error: Datos incorrectos" });
    }
    if (result.token) {
      const newPass = { password: data.new_password };
      const response = await changesPassword(result.token, newPass);
      if (response) {
        go("/home");
      }
    }
  }
  useEffect(() => {
    user ? pushData(user) : "";
  }, [user]);

  const containers = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  return (
    <>
      <h1 className="title is-1" style={{ textAlign: "center" }}>
        Cambiar contraseña
      </h1>
      <main
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <form
          onSubmit={handleSubmit}
          className="box"
          style={{ width: "600px", padding: "20ox" }}
        >
          <h1 className="title is-4">Verificar Datos</h1>
          <section style={containers}>
            <EmailField name="email" placeholder="Email" error={emailError} />
            <Passwordfield
              name="password"
              placeholder="Contraseña"
              error={actualPass}
            />
          </section>
          <br />
          <h1 className="title is-4">Cambiar contraseña</h1>
          <section style={containers}>
            <Passwordfield
              name="new-pass-top"
              placeholder="Nueva Contraseña"
              error={newPass}
            />
            <Passwordfield
              name="new-pass-bottom"
              placeholder="Repetir Constraseña"
              error={newPass2}
            />
          </section>
          {}
          <br />
          <button className="button is-link is-medium">Aceptar</button>
        </form>
      </main>
    </>
  );
};
export default EdithAuthorization;
