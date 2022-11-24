import React from 'react';
import { useNavigate } from 'react-router';
import style from './profile.css';
import {useRecoilValue} from 'recoil';
import {getUserData} from 'hooks/DataUserAtom';

const FieldProfile = (props:{label:string,value:string})=>{
  return(
  <div className={style['info-container__field']}>
    <span className={style['info__label']}>{props.label}</span> 
    <span className={style['info__value']}>{props.value}</span>
  </div> 
  )
}
type DataUser = {
  name:string,
  last_name:string,
  user_name:string,
  email:string
}
const ProfilePage:React.FC = ()=>{
  const user:DataUser = useRecoilValue<DataUser>(getUserData); 
  const go = useNavigate();
  const handleEdithProfile = ()=> go('/profile/edit');
  const handleEdithPassword = ()=> go('/profile/auth')
  return (<>
    <h1 className='title is-1' style={{textAlign:'center'}}>Mis datos</h1>
    <section className={style.main}>
      <aside className={'box ' + style['info-container']}>
         <FieldProfile label='Nombre: ' value={user.name}/>
         <FieldProfile label='Apellido: ' value={user.last_name}/>
         <FieldProfile label='Usuario: ' value={user.user_name}/>
         <FieldProfile label='Email: ' value={user.email}/>
         <div className={style['btn-container']}>
            <button onClick={handleEdithProfile} className={'button is-link ' + style['button-left']}>Cambiar info</button>
            <button onClick={handleEdithPassword} className={'button is-warning ' + style['button-right']}>Cambiar contraseña</button>
         </div>
      </aside>
    </section>
  
  </>)
}

export default ProfilePage;