import React from 'react'

// Redux
import { Provider } from "react-redux";
import { store } from "./store";

//Main router for app
import { AppRouter } from './routers/AppRouter'

//Global style's
import "./css/GlobalStyles.css";


export const MySpaceApp = () => {
    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    )
}
