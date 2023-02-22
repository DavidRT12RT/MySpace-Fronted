import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status:"not-authenticated",//authenticated || checking
        id:null,
        email:null,
        name:null,
        displayName:null,
        photoURL:null,
        payloadMessage:null
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
            //Establecer token en localstorage para mantener secion
        },
        logout:(state,{payload}) => {
            state.status = "not-authenticated";
            state.id = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.payloadMessage = payload.msg;
        },
        checkingCredentials:(state) => {
            state.status = "checking";
        }
    }
});

//Actions creatos functions
export const { login,logout,checkingCredentials } = authSlice.actions;