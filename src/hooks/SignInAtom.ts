import { atom, selector } from 'recoil';

export const UserSignInAtom = atom({
  key: 'userSignInAtom', // unique ID (with respect to other atoms/selectors)
  default: {
    email:'',
    pass:''
  }, // default value (aka initial value)
});
const URL_API_EMAIL = 'https://dwf-m7-postgre-prueba.herokuapp.com/auth-email';
const URL_API_TOKEN = 'https://dwf-m7-postgre-prueba.herokuapp.com/auth/token';

export const getUserSignInToken = selector({
  key: 'getUserSignIn', // unique ID (with respect to other atoms/selectors)
  get:  async ({get}) => {
    const user = get(UserSignInAtom);

    const response = await fetch(URL_API_EMAIL,{
      method: 'POST',
      body: JSON.stringify({ email:user.email }),
      headers: {
        'content-type': 'application/json',
      }
    })
    const emailExist:boolean = await response.json(); 
    
    if(emailExist){
      const response = await fetch(URL_API_TOKEN,{
        method: 'POST',
        body: JSON.stringify({ email:user.email,password:user.pass }),
        headers: {
          'content-type': 'application/json',
        }
      })
      const resJson = await response.json();   
      return resJson;
    }else{
    
      return emailExist;
    }
  }
});




