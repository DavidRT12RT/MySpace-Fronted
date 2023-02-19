import React from 'react'

export const FormLogin = () => {
    return (
        <div className="formLogin">
            <h1 className="titulo">Hey,hello 👋</h1>
            <p className="descripcion">Enter your information and start checking your files.</p>

            <h1 className="titulo-descripcion">Email</h1>
            <input className="form form-control descripcion"></input>
            <h1 className="titulo-descripcion">Password</h1>
            <input className="form form-control descripcion" type="password"></input>
            <div className="rememberMeCheckBox">
                <input type="checkbox" checked={true} className="form-check-input"/>
                <h1 className="titulo-descripcion">Remember me</h1>
            </div>

            <button type="primary" className="btn btn-primary descripcion">Login</button>
        </div>
    )
}
