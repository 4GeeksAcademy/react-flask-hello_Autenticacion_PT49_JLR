import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context);

    // Estado local para almacenar el correo electrónico y la contraseña
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

 
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://fuzzy-space-barnacle-rjw954q656phxgx5-3001.app.github.dev/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                mode: "cors", // Asegúrate de que esté configurado para 'cors'
            });

            if (response.ok) {
                const data = await response.json();
                // Aquí puedes manejar la respuesta según sea necesario
                console.log("Inicio de sesión exitoso", data);
                
                // Puedes realizar acciones adicionales aquí si es necesario
            } else {
                // Manejar errores en la respuesta
                console.error("Error al iniciar sesión");
            }
        } catch (error) {
            console.error("Error de red al intentar iniciar sesión", error);
        }
    };

    return (
        <div>
            <div className="container">
                <h1>Login</h1>
            </div>
            <div className="container border">
                <form onSubmit={handleLogin}>
                    <label>
                        <div className="row mt-3 ">
                            <p className="ms-2">Email de usuario:</p>
                            <div className="input-group mb-3 col-12">
                                <input type="email" className="form-control" placeholder="Email" aria-describedby="basic-addon1" onChange={handleEmailChange} />
                            </div>
                        </div>
                        <p className="ms-2">Contraseña usuario:</p>
                        <div className="input-group mb-3 col-12">
                            <input type="password" className="form-control" placeholder="Password" aria-describedby="basic-addon1" onChange={handlePasswordChange} />
                        </div>
                    </label>
                    <div className="input-group mb-3 col-12">
                        <button type="submit" className="btn btn-secondary">Entrar</button>
                    </div>
                    <Link to="/">
                        <button className="btn btn-light mb-4">Volver al home</button>
                    </Link>
                </form>
            </div>
        </div>
    );
};