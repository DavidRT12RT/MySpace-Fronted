import { message } from "antd";
import { fetchConToken, fetchSinToken } from "../../helpers/fetch";
import { checkingCredentials, login, logout, stopCheckingCredentials } from "./authSlice";

export const loginToServer = ({email,password,rememberMe}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        //Peticion para login 
        const resp = await fetchSinToken(`/auth/login`,{email,password},"POST");
        const body = await resp.json();

        if(resp.status !== 200){
            dispatch(stopCheckingCredentials());
            return message.error(body.msg);
        }

        //Login con exito!
        dispatch(login({...body,rememberMe}));

    }
}

export const registerToServer = (values) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        //Peticion de registro
        const resp = await fetchSinToken("/users/",values,"POST");
        const body = await resp.json();

        if(resp.status !== 201){
            dispatch(stopCheckingCredentials());
            return message.error(body.msg);
        }

        //Registro con exito!
        dispatch(login({...body,rememberMe:values.rememberMe}));
    }
}

export const startChecking = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        //Peticion de revalidacion
        const resp = await fetchConToken("/auth/renew",undefined,"POST");
        const body = await resp.json();

        //Not token in localstorage or token is not valid
        if(resp.status !== 200) return dispatch(logout());
        dispatch(login({...body,rememberMe:true}));           
    }
}