import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status:"not-authenticated",//authenticated || checking
        id:null,
        email:null,
        name:null,
        displayName:null,
        photoURL:null,
        payloadMessage:null,
        token:null
    },
    reducers: {
        login:(state,{payload}) => {
            state.status = "authenticated";
            state.id = payload.user.id;
            state.email = payload.user.email;
            state.displayName = payload.user.displayName || payload.user.name;
            state.name = payload.user.name;
            state.photoURL = payload.user.photoURL || "";
            state.payloadMessage = "Inicio de secion con exito!";
            state.token  = payload.token;

            //Set token to localStorage if users marks this
            if(payload.rememberMe){
                localStorage.setItem("token",payload.token);
                localStorage.setItem("token-init",moment());
            }
        },
        logout:(state,{payload}) => {
            localStorage.clear();
            state.status = "not-authenticated";
            state.id = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.token = null;
            localStorage.removeItem("token");
        },
        checkingCredentials:(state) => {
            state.status = "checking";
        },
        stopCheckingCredentials:(state) => {
            state.status = "not-authenticated";
        }
    }
});

//Actions creatos functions
export const { login,logout,checkingCredentials,stopCheckingCredentials } = authSlice.actions;