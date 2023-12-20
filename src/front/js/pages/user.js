import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/cohete.png";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Bienvenido a la API de Usuarios</h1>

			<p>
				<img style={{width:"200px"}} src={rigoImageUrl} />
			</p>
			<p>Puedes crear usuarios y hacer login con ellos, se autentifican por Tokens, ya te digo yo que 3 cositas más y esto es un instagram.</p>
			<div className="alert alert-info">
				{store.message || "El servidor Backend esta inactivo, correr el pipenv run start."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
