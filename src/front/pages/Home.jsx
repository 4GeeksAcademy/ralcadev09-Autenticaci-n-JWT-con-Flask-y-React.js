import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const getPrivateInfo = async () => {
		const backendUrl = import.meta.env.VITE_BACKEND_URL
		const token = localStorage.getItem("token-jwt")
		const response = await fetch(backendUrl + "my_password", {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				'Authorization': 'Bearer ' + token
			}
		})
		const data = await response.json()
		console.log(data);

	}
	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	const login = function () {
		fetch(import.meta.env.VITE_BACKEND_URL + "login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ "email": "andrea@ccss.com", "password": "654321" })
		}
		)
			.then((response) => { return response.json() })
			.then((data) => {
				console.log(data.token);
				localStorage.setItem("token-jwt", data.token)
			})
			.catch((err) => { err })
	}

	useEffect(() => {
		loadMessage()
		login()
	}, [])

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Hello Rigo!!</h1>
			<p className="lead">
				<img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
			</p>
			<div className="alert alert-info">
				{store.message ? (
					<span>{store.message}</span>
				) : (
					<span className="text-danger">
						Loading message from the backend (make sure your python 🐍 backend is running)...
					</span>
				)}
				<button className="btn btn-success"
					onClick={() => {

					}}
				>Traer informacion privada</button>
			</div>
		</div>
	);
}; 