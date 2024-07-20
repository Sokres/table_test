import axios from 'axios';
import { useState } from 'react';
import { DataInfo } from '../Interface/data';

const HOST = import.meta.env.VITE_APP_BASE_URL;
const headers = {
	'Content-Type': 'application/json',
};

const apiClient = axios.create({
	baseURL: HOST,
	headers: headers,
});

apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers['x-auth'] = token;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error('Ошибка:', error);
		return Promise.reject(error);
	}
);

export function useAuth() {
	const [loginError, setLoginError] = useState<boolean>(false);

	const fetchData = async () => {
		try {
			const response = await apiClient.get(
				'/ru/data/v3/testmethods/docs/userdocs/get'
			);
			setLoginError(false);
			return response.data;
		} catch (error) {
			setLoginError(true);
			throw error;
		}
	};

	const logIn = async (username: string, password: string) => {
		try {
			const response = await apiClient.post(
				'/ru/data/v3/testmethods/docs/login',
				{ username, password }
			);
			setLoginError(false);
			localStorage.setItem('token', response.data.data.token);
		} catch (error) {
			setLoginError(true);
			throw error;
		}
	};

	const createData = async (data: DataInfo) => {
		try {
			const response = await apiClient.post(
				'/ru/data/v3/testmethods/docs/userdocs/create',
				data
			);
			setLoginError(false);
			return response.data;
		} catch (error) {
			setLoginError(true);
			throw error;
		}
	};

	const updateData = async (id: string, data: DataInfo) => {
		try {
			const response = await apiClient.post(
				`/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
				data
			);
			setLoginError(false);
			return response.data;
		} catch (error) {
			setLoginError(true);
			throw error;
		}
	};

	const deleteData = async (id: string) => {
		try {
			const response = await apiClient.delete(
				`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`
			);
			setLoginError(false);
			return response.data;
		} catch (error) {
			setLoginError(true);
			throw error;
		}
	};

	return {
		token: localStorage.getItem('token') || '',
		loginError,
		fetchData,
		logIn,
		createData,
		updateData,
		deleteData,
	};
}
