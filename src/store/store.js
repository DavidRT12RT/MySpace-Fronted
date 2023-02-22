//Configuracion del store
import { configureStore } from '@reduxjs/toolkit'

//Slice's
import { authSlice } from './auth/authSlice'

export const store = configureStore({
    //configureStore hace el llamado al combineReducers que hace el combinado de todos los reducer's
    reducer: {
        auth:authSlice.reducer
    },
})