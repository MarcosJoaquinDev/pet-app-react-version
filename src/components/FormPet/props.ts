
const list = [ 
  {
    id:'reportName',
    name:'name',
    label:'Nombre',
    type:'text',
    placeholder:'Ej: Bobby',
    error:{
      its:false,
      message:'',
    }
  },
  {
    id:'reportType',
    name:'type',
    label:'Tipo',
    type:'text',
    placeholder:'Ej: Perro, gato',
    error:{
      its:false,
      message:'',
    }
  },
  {
    id:'reportRace',
    name:'race',
    label:'Raza',
    type:'text',
    placeholder:'Ej: Labrador',
    error:{
      its:false,
      message:'',
    }
  },
  {
    id:'reportLocation',
    name:'location',
    label:'Bario, lugar de referencia',
    type:'text',
    placeholder:'Ej: Villa devoto',
    error:{
      its:false,
      message:'',
    }
  },
  {
    id:'description',
    text:'',
    error:{
      its:false,
      message:'',
    },
    setError:()=>{},
  }
]


export {list};