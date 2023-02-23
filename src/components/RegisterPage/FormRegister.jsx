import { message } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSinToken } from '../../helpers/fetch';

//Custom hook's
import { useForm } from '../../hooks/useForm'
import { registerToServer } from '../../store/auth/thunks';

export const FormRegister = () => {
    //Redux

    const dispatch = useDispatch();

    const initialState = {
        email:"",
        password:"",
        name:"",
        rememberMe:true
    };

    const [ values, setValues,handleInputChange ] = useForm(initialState);

    const handleRegisterUser = async(e) => {

        e.preventDefault();
        dispatch(registerToServer(values));

    }

    return (
        <form className="formAuth" onSubmit={handleRegisterUser}>
            <h1 className="titulo">Start backing up your files ⛅</h1>
            <p className="descripcion">Complete register form and start protecting your files.</p>
            
            <h1 className="titulo-descripcion">Name</h1>
            <input 
                className="form form-control descripcion"
                type="name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
            />
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
            >
                Register
            </button>

            <p className="descripcion text-center">Alredy have an account? <Link to={`/auth/login`} style={{textDecoration:"none"}}><b className="color">Login</b></Link></p>
        </form>
    )
}

