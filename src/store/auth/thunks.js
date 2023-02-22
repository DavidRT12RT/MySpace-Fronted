import { fetchSinToken } from "../../helpers/fetch";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email,password) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        //Peticion 
        const resp = await fetchSinToken(`/auth/login`,{email,password},"POST");
        const body = await resp.json();

        if(resp.status !== 200) dispatch(logout({msg:body.msg}));

        //Login con exito!
        dispatch(login(body));

    }
}