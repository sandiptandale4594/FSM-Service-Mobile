import React, {useContext} from 'react';
import UserContext from '../contexts/UserContext';
import ACTION from '../contexts/action';
import en from './en';
import hn from './hindi'
export function getLabel(labName){
    const {store, dispatch} = useContext(UserContext);
    if(store.language==='hn'){
        return hn[labName];
    }else{
        return en[labName];
    }

}


export const getCurrentLanguage= ()=>{
    const {store, dispatch} = useContext(UserContext);
    if(store.language==='hn'){
        return hn['language'];
    }else{
        return en['language'];
    }
}
 export const switchLanguage=()=>{
    const {store, dispatch} = useContext(UserContext);
    if(store.language==='en'){
        dispatch({
            type: ACTION.LANGUAGE_CHANGE, 
            payload:{
                language:'hn'
            }
        })
    }else{
        dispatch({
            type: ACTION.LANGUAGE_CHANGE, 
            payload:{
                language:'en'
            }
        })
    }
}

