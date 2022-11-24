import React ,{useState,useEffect}from 'react';

type propsFields = {
  id:string,
  name:string,
  label:string,
  type:string,
  placeholder?:string,
  error?:{
    its:boolean,
    message:string;
  }
}
const TextField:React.FC = (props:propsFields)=>{
  const errorDefault = {
    its:false,
    message:''
  }
  const [fieldError, setFieldError] = useState(props.error || errorDefault);
  
  useEffect(()=>{
    if(props.error){
      setFieldError(props.error);
    }
  },[props.error])
  
  return(<>
    <div style={{padding:'10px'}}>
      <label className='label' htmlFor={props.id}> {props.label} </label>
      <input 
        className={fieldError.its ? 'input is-danger':'input'}
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder} />
         {fieldError.its? <p className="help is-danger">{props.error?.message}</p> : '' }
    </div>
  </>)
}

export {TextField};