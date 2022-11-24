import React from 'react';
import { TextField } from 'components/field';
import {useRecoilState} from 'recoil'
import style from './form.css';

type FieldsProperties = {
  name:string,
  label:string,
  type:string,
  id:string,
  placeholder?:string,
  error?:{
    its:boolean,
    message:string;
  }
}
type FormProperties = {
  fields:FieldsProperties[],
  button:{
    class:string,
    label:string,
  }
  handle:any,
}
const Form:React.FC = (props:FormProperties)=>{
  const handlerSubmit = (e)=>{
    e.preventDefault();
    const target = e.target;
    let data = {}; 
    props.fields.map(i =>{ 
      data =  {
        ...data,
      [i.name] : target[i.name].value
     } 
    });
    props.handle(data);
  }
  return(
    <>
    <form onSubmit={handlerSubmit} className={style.form + ' box'}>
      {props.fields.map( f => {
         return (<TextField 
          name={f.name} 
          id={f.id} 
          label={f.label}
          type={f.type} 
          error={f.error}
          key={f.id}
          placeholder={f.placeholder}
          />)
      })}
      <button className={props.button.class}>{props.button.label}</button>
    </form>
    </>
  )
}

export {Form}