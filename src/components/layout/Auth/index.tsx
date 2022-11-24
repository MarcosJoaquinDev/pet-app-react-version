import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import style from './auth.css';
import logo from '../pet-logo.png';

const AuthLayout:React.FC = ()=>{
  const go = useNavigate();
  return (
  <>
  <header className={'box ' + style.header}>
    <aside>
      <img src={logo} alt="" className={style.logo} />
    </aside>
    <aside>
      <button onClick={()=>{go('/')} }className='button is-outlined' >Salir</button>
    </aside>
  </header>
  <Outlet/>
  </>
)
}
export default AuthLayout;