import React from 'react'

import { BrowserRouter,Routes,Route } from "react-router-dom";

//Routes
import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/*" element={
                    <AuthRouter/>
                }></Route>
            </Routes>
        </BrowserRouter>
    )
}
