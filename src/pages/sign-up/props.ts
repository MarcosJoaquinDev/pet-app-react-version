import React, {useState} from 'react';
const propertiesFields = [
  {
    name:'name',
    label:'Nombre',
    id:'sign-name',
    type:'text', 
  },
  {
    name:'lastname',
    label:'Apellido',
    id:'sign-lastname',
    type:'text', 
  },
  {
    name:'username',
    label:'Nombre de usuario',
    id:'sign-user',
    type:'text', 
  },
  {
    name:'email',
    label:'Email',
    id:'sign-email',
    type:'text', 
  }];
  type errorInput = {
    its:boolean;
    message:string;
  }
  const useErrorInputCheck = ()=>{
    const [error,setError] = useState<errorInput>(null);
    const inputIncompleted = ()=> setError({its:true,message:'Campo incompleto'})
    const emailExist = ()=> setError({its:true,message:'este email ya esta registrado'})
    return {
      error,
      inputIncompleted,
      emailExist
    }
  }
  

  export {propertiesFields,useErrorInputCheck}