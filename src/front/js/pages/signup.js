import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Signup = () => {
	const { store, actions } = useContext(Context);

	return (
        <h1>Signup</h1>
	);
};
