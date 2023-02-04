import {atom,selector} from 'recoil';

export const userDataAuth = atom({
  key: 'userAuth',
  default: { 
    name:'',
    lastname:'',
    username:'',
    email:'',
    password:''
  },
});
const URL_API_EMAIL = 'https://app-pet.onrender.com/auth-email';
const URL_API_AUTH = 'https://app-pet.onrender.com/auth';
const URL_API_TOKEN = 'https://app-pet.onrender.com/auth/token';

export const checkInitPushNewUser = selector({
  key: 'getUserSignUp', // unique ID (with respect to other atoms/selectors)
  get:  async ({get}) => {
    const user = get(userDataAuth);
    if(user.name && user.password==''){ 
      const response = await fetch(URL_API_EMAIL,{
        method: 'POST',
        body: JSON.stringify({ email:user.email }),
        headers: {
          'content-type': 'application/json',
        }
      })
      const emailExist:boolean = await response.json(); 
      return emailExist;
    }else{
      return null;
    }
  }
});
export const createNewUser = selector({
  key: 'createNewUser', // unique ID (with respect to other atoms/selectors)
  get: async ({get}) => {
    const user = get(userDataAuth);
    if(user.password){
      const newUser = {
        name: user.name,
        last_name: user.lastname,
        user_name: user.username,
        email: user.email,
        password: user.password,
      }
      const response = await fetch(URL_API_AUTH, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'content-type': 'application/json',
        },
      });
      const result = await fetch(URL_API_TOKEN,{
        method: 'POST',
        body: JSON.stringify({ email:user.email,password:user.password }),
        headers: {
          'content-type': 'application/json',
        }
      })
      const resJson = await result.json();   
      return resJson;
    }
    return null;
  }
})