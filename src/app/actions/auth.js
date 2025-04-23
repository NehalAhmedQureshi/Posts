'use server';

import { apiManager } from "../utils/apiManager";

export async function handleAuth(prevState, formData) {
  const mode = formData.get('mode');
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  const params = {email , password}

  console.log(mode, 'mode========')

  try {
    let data  = await apiManager({method:'post',path:`/api/auth/login`, body :{email:"nehal@gmail.com",password:'123123'}})
    console.log('signup' , data)

  } catch (error) {
    console.log('error on auth' , error)
  }
}
