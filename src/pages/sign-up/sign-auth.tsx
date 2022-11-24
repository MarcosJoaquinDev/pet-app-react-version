import React, { useState, useEffect } from "react";
import { TextField } from "components/field";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDataAuth, createNewUser } from "hooks/SignUpAtom";
import { UserSignInAtom } from "hooks/SignInAtom";
import { userDataToken } from "hooks/DataUserAtom";
import { useNavigate } from "react-router-dom";
import style from "./sign-up.css";

const SignUpAuthPage: React.FC = () => {
  const errorDefault = { its: false, message: "" };
  const errorEmpty = { its: true, message: "Campo incompleto" };
  const [errorTop, setErrorTop] = useState(errorDefault);
  const [errorBottom, setErrorBottom] = useState(errorDefault);
  const [user, setUser] = useRecoilState(userDataAuth);
  const [token, seToken] = useRecoilState(userDataToken);
  const response = useRecoilValue(createNewUser);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    const passUp = target["password-top"].value;
    const passDown = target["password-bottom"].value;
    const topEmpty = passUp == "";
    const bottomEmpty = passDown == "";
    const fieldCompleted = !topEmpty && !bottomEmpty;

    topEmpty ? setErrorTop(errorEmpty) : "";
    bottomEmpty ? setErrorBottom(errorEmpty) : "";
    fieldCompleted && passUp === passDown ? setPassword(passUp) : "";
    fieldCompleted && passUp != passDown
      ? setErrorBottom({ its: true, message: "No coinciden las contraseñas" })
      : "";
  };
  useEffect(() => {
    const newUser = { ...user, password: password };
    setUser(newUser);
  }, [password]);
  useEffect(() => {
    if (response) {
      seToken({ token: response.token, changes: "" });
      navigate("/home");
    }
  }, [response]);
  return (
    <>
      <h1 className="title" style={{ textAlign: "center" }}>
        Ingresar una contraseña
      </h1>
      <main className={style.container}>
        <form onSubmit={handleSubmit} className={style.form + " box"}>
          <TextField
            name="password-top"
            label="Contraseña"
            id="password"
            type="password"
            error={errorTop}
          />
          <TextField
            name="password-bottom"
            label="Repetir Contraseña"
            id="passwordd"
            type="password"
            error={errorBottom}
          />
          <button className="button is-success">Seguir</button>
        </form>
      </main>
    </>
  );
};
export default SignUpAuthPage;
