import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => {
    const { token } = useSelector(store => store.auth);

    if(token === null) return <Navigate to="/auth/login"/>
    else return children

}
