import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import style from './home.css';
import logo from '../pet-logo.png';
const HomeLayout:React.FC = ()=>{
  const go = useNavigate();
  return(
  <>
  <header className={'box ' + style.header}>
    <aside>
      <img src={logo} alt="" className={style.logo} />
    </aside>
    <aside>
      <button 
        onClick={()=>go('/sign-up')}
        className={style.btnLeft +' button is-success'}>
        Registrarme
      </button>
      <button 
        onClick={()=>go('/sign-in')} 
        className='button is-outlined'>
        Ingresar
      </button>
    </aside>
  </header>
  <Outlet/>
  </>
)}
export default HomeLayout;