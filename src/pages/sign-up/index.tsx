import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userDataAuth, checkInitPushNewUser } from "hooks/SignUpAtom";
import { Form } from "components/Form";
import { useErrorInputCheck, propertiesFields } from "./props";
import style from "./sign-up.css";
import { useNavigate } from "react-router-dom";

type SignUpUser = {
  name: string;
  lastname: string;
  username: string;
  email: string;
};

const SignUpPage: React.FC = () => {
  const [fields, setFields] = useState<SignUpUser>(null);
  const [user, setUser] = useRecoilState(userDataAuth);
  const emailExist = useRecoilValue(checkInitPushNewUser);
  const [newUser, setNewUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    emailExist == false && user ? navigate("/sign-up/auth") : "";
    emailExist ? propsFields[3].setEmailError() : "";
  }, [user]);

  const propsFields = propertiesFields.map((i) => {
    const { error, inputIncompleted, emailExist } = useErrorInputCheck();
    return {
      ...i,
      error: error,
      setError: inputIncompleted,
      setEmailError: emailExist,
    };
  });
  const checkFields = (data: SignUpUser) => {
    let i = 0;
    let fieldsCompleted = true;

    for (const key in data) {
      if (data[key] == "") {
        propsFields[i].setError();
        fieldsCompleted = false;
      }
      i++;
    }
    fieldsCompleted ? setUser({ ...data, password: "" }) : "";
  };
  useEffect(() => {
    fields ? checkFields(fields) : "";
  }, [fields]);

  return (
    <>
      <h1 className="title is-1" style={{ textAlign: "center" }}>
        Ingresa tus datos
      </h1>
      <main className={style.container}>
        <Form
          fields={propsFields}
          button={{ class: "button is-link", label: "seguir" }}
          handle={setFields}
        />
      </main>
    </>
  );
};

export default SignUpPage;
