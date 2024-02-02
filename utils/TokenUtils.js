import * as SecureStore from 'expo-secure-store';

export async function getToken(){
   const token= await SecureStore.getItemAsync('APP_TOKEN');
   //console.log(token);
   if(token){
    return token;
   }else{
       return false;
   }
}

export async function setToken(token){
    removeToken()
    await SecureStore.setItemAsync('APP_TOKEN',token);
}
export async function removeToken(){
    await SecureStore.deleteItemAsync('APP_TOKEN');
}