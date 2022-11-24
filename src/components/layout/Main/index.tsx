import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import style from "./main.css";
import logo from "../pet-logo.png";
import menuLogo from "./menu.png";
import { userDataToken } from "hooks/DataUserAtom";
import { UserSignInAtom } from "hooks/SignInAtom";
import { useRecoilState } from "recoil";
const MainLayout: React.FC = () => {
  const go = useNavigate();
  const [data, setData] = useRecoilState(userDataToken);
  const [user, setUser] = useRecoilState(UserSignInAtom);
  const [showMenu, setShowMenu] = useState(false);

  const items = style["item-respon"] + " title is-6";
  const handleSignOut = () => {
    const confirm = window.confirm("¿Estas seguro que desea salir?");
    if (confirm) {
      setData({ token: "", changes: {} });
      setUser({ email: "", pass: "" });
      go("/");
    }
  };
  return (
    <>
      <header className={"box " + style.header}>
        <aside onClick={() => go("/home")} style={{ cursor: "pointer" }}>
          <img src={logo} alt="" className={style.logo} />
        </aside>
        <nav className={style["items-container"]}>
          <ul className={style.items}>
            <li className={style.item} onClick={() => go("/profile")}>
              profile
            </li>
            <li className={style.item} onClick={() => go("/my-pets")}>
              my pets
            </li>
            <li className={style.item} onClick={() => go("/report")}>
              reports
            </li>
            <li className={style.item} onClick={handleSignOut}>
              close
            </li>
          </ul>
        </nav>
        <div className={style["menu-bar"]}>
          <img
            src={menuLogo}
            alt="menu logo"
            onClick={() => setShowMenu(true)}
            width="60"
          />
        </div>
        {showMenu ? (
          <nav className={style["menu-nav"]}>
            <i
              className={style["icon-exit"] + " fa-solid fa-circle-xmark"}
              onClick={() => setShowMenu(false)}
            ></i>
            <ul className={style["menu-nav-items"]}>
              <li>
                <a className={items} onClick={() => go("/profile")}>
                  Mis Datos
                </a>
              </li>
              <li>
                <a className={items} onClick={() => go("/my-pets")}>
                  Mis mascotas reportadas
                </a>
              </li>
              <li>
                <a className={items} onClick={() => go("/report")}>
                  Reportar mascota
                </a>
              </li>
              <li>
                <a className={items} onClick={handleSignOut}>
                  Cerrar sesion
                </a>
              </li>
            </ul>
          </nav>
        ) : (
          ""
        )}
      </header>
      <Outlet />
    </>
  );
};
export default MainLayout;
