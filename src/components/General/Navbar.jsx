import React from 'react'

//Redux
import { useDispatch } from 'react-redux'
import { logout } from '../../store/auth/authSlice';

//Style's
import "../../css/Navbar.css";

//Icon's
import { ArrowRight } from 'react-bootstrap-icons';


export const Navbar = () => {
    
    const dispatch = useDispatch();


    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div className="navbarContainer">
            <h1 className="titulo text-primary">MySpace</h1>
            <button 
                type="primary" 
                className="btn btn-outline-primary descripcion"
                onClick={handleLogout}
            >
                Logout
                <ArrowRight style={{marginLeft:"5px"}}/>
            </button>
        </div>
    )
}
