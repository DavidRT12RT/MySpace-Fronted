import moment from "moment";

import { message } from "antd";
import { fetchConToken, fetchSinToken } from "../../helpers/fetch";
import { checkingCredentials, login, logout, stopCheckingCredentials } from "./authSlice";

export const loginToServer = (email,password) => {
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
        dispatch(login(body));

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
        dispatch(login(body));
    }
}

export const startChecking = () => {
    return async(dispatch) => {

        dispatch(checkingCredentials());
        //Peticion de revalidacion
        const resp = await fetchConToken("/auth/renew");
        const body = await resp.json();

        //Token no valido!
        if(resp.status !== 200) return dispatch(logout());

        //Seteando nuevo token
        localStorage.setItem("token",body.token);
        localStorage.setItem("token-init-date",moment());

        dispatch(login(body));
    }
}