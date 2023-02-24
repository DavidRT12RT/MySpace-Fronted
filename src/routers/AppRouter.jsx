import React, { useEffect } from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";

//Routes
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { AuthRouter } from './AuthRouter';

//Pages
import { MySpacePage } from '../pages/MySpacePage';
import { useDispatch } from 'react-redux';

//Redux
import { startChecking } from '../store/auth/thunks';

export const AppRouter = () => {


    const dispatch = useDispatch();

    useEffect(() => {
         dispatch(startChecking());
    }, [dispatch]);
    
    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/auth/*" 
                    element={
                        <PublicRoute>
                            <AuthRouter/>
                        </PublicRoute>
                    }
                />
                <Route 
                    path="/" 
                    element={
                        <PrivateRoute>
                            <MySpacePage/>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}
