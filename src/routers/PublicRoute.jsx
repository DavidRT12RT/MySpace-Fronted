import React from 'react'

//Redux
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({children}) => {
    //HOC que protege rutas publicas

    const { token } = useSelector(store => store.auth);

    if(token === null) return children;
    else return <Navigate to="/"/>

}
