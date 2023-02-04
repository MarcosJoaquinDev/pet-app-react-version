import { atom, selector } from 'recoil';

export const userDataToken = atom({
  key: 'userDataToken', // unique ID (with respect to other atoms/selectors)
  default: {
    token:'',
    changes:{}
  } // default value (aka initial value)
});
type DataUser = {
  name:string,
  last_name:string,
  user_name:string,
  email:string
}
const URL_API_DATA_USER = 'https://app-pet.onrender.com/me';
const URL_API_DATA_PETS = 'https://app-pet.onrender.com/me/pets';
export const getUserData = selector({
  key: 'getUserData', // unique ID (with respect to other atoms/selectors)
  get:  async ({get}) => {
    const data = get(userDataToken);
    const resp = await fetch(URL_API_DATA_USER, {
			method: 'GET',
			headers: { Authorization: `bearer ${data.token}` },
		});
		const user: DataUser = await resp.json();
		return user;
  }
})
type petProps = {
  id:number,
  name:string,
  location:string,
  description:string,
  url_picture:string,
  type?:string,
  race?:string,
  lat?:string,
  lng?:string,
}

export const getPetsData = selector({
  key: 'getPetsData', // unique ID (with respect to other atoms/selectors)
  get:  async ({get}) => {
    const data = get(userDataToken);
    console.log(data.token,'selector token');
    
    if(data.token){
      const resp = await fetch(URL_API_DATA_PETS, {
        method: 'GET',
        headers: { Authorization: `bearer ${data.token}` },
      });
      const pets: petProps[] = await resp.json();
      return pets;
    }else{
      return []
    }
  }
})