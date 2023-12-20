import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Signup = () => {
    const { store, actions } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

	const handleSignup = async (e) => {
		e.preventDefault();
	
		try {
			const response = await fetch("https://fuzzy-space-barnacle-rjw954q656phxgx5-3001.app.github.dev/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
					is_active: true,
				}),
				mode: "cors",
			});
	

		} catch (error) {
			console.error("Error de red al intentar registrar usuario", error);
		}
	};

    return (
        <div>
            <div className="container">
            <h1>Signup</h1>
            </div>
            <div className="container border">
            <form onSubmit={handleSignup}>
                <label>
                <div className="row mt-3 ">
                <p className="ms-2">Email de nuevo usuario:</p>
                    <div className="input-group mb-3 col-12">
                        <input type="email" className="form-control" placeholder="Email" value={email} onChange={handleEmailChange} aria-describedby="basic-addon1"/>
                    </div>
                </div>
                <p className="ms-2">Contraseña de nuevo usuario:</p>
                <div className="input-group mb-3 col-12">
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={handlePasswordChange} aria-describedby="basic-addon1"/>
                </div>
                </label>
                <div className="input-group mb-3 col-12">
                <button type="submit" class="btn btn-secondary">Registrarse</button>
                </div>
                <Link to="/">
				<button className="btn btn-light mb-4">Volver al home</button>
			</Link>
            </form>
            </div>
        </div>
    );
};