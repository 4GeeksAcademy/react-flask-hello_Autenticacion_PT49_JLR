import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Signup = () => {
    const { store, actions } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showFirstModal, setShowFirstModal] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);

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
            
            if (response.ok){
                console.log("Usuario creado correctamente")
                setShowFirstModal(true)
                setEmail("")
                setPassword("")
                
            } else if (response.status === 500) {
                console.log("El usuario ya existe")
                setShowSecondModal(true)
                setEmail("")
                setPassword("")

                
            }

		} catch (error) {
			console.error("Error de red al intentar registrar usuario", error);
		}
	};

    return (
        <>
        <div>
            <div className="container">
            <h1>Signup</h1>
            </div>
            <div className="container border">
            <form onSubmit={handleSignup}>
                <label>
                <div className="row mt-3 ">
                <p className="ms-2">Email de <b>nuevo</b> usuario:</p>
                    <div className="input-group mb-3 col-12">
                        <input type="email" className="form-control" placeholder="Email" value={email} onChange={handleEmailChange} aria-describedby="basic-addon1"/>
                    </div>
                </div>
                <p className="ms-2">Contraseña de <b>nuevo</b> usuario:</p>
                <div className="input-group mb-3 col-12">
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={handlePasswordChange} aria-describedby="basic-addon1"/>
                </div>
                </label>
                <div className="input-group mb-3 col-12">
                <button type="submit" className="btn btn-secondary">Registrarse</button>
                </div>
                <Link to="/">
				<button className="btn btn-light mb-4">Volver al home</button>
			</Link>
            </form>
            </div>
        </div>
        
        <div className={`modal ${showFirstModal ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: showFirstModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Usuario Creado correctamente!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>Ahora ve a iniciar sesión</p>
                        </div>
                        <div className="modal-footer">
                            <Link to="/login">
				                <button className="btn btn-secondary me-2">Login</button>
			                </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal ${showSecondModal ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: showSecondModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">El usuario ya existe, intentalo con otro Email</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};