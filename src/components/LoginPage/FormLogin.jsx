import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginToServer } from "../../store/auth/thunks";

//Custom hook's
import { useForm } from '../../hooks/useForm'

export const FormLogin = () => {
    //Redux
    const dispatch = useDispatch();//Dispatch function
    const { status } = useSelector(store => store.auth);


    const initialState = {
        email:"",
        password:"",
        rememberMe:true
    };

    const [ values, setValues,handleInputChange ] = useForm(initialState);

    const onSubmit = (e) => {

        e.preventDefault();
        dispatch(loginToServer(values.email,values.password));

    }


    return (
        <form className="formAuth" onSubmit={onSubmit}>
            <h1 className="titulo">Hey,hello 👋</h1>
            <p className="descripcion">Enter your information and start checking your files.</p>

            <h1 className="titulo-descripcion">Email</h1>
            <input 
                className="form form-control descripcion"
                type="email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
            />
            <h1 className="titulo-descripcion">Password</h1>
            <input 
                className="form form-control descripcion" 
                type="password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
            />
            <div className="rememberMeCheckBox">
                <input 
                    type="checkbox" 
                    name="rememberMe"
                    checked={values.rememberMe} 
                    onChange={(e) => handleInputChange({target:{name:e.target.name,value:e.target.checked}})}


                    className="form-check-input m-0"
                />
                <h1 className="descripcion">Remember me</h1>
            </div>
            <button 
                type="submit" 
                className="btn btn-primary descripcion"
                disabled={status === "checking"}
            >
                Login
            </button>

            <p className="descripcion text-center">Don't have an account? <Link to={`/auth/register`} style={{textDecoration:"none"}}><b className="color">Sign up for free</b></Link></p>
        </form>
    )
}
