import {
	Button,
	Container,
	CssBaseline,
	TextField,
	Typography,
} from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../../Data/Loader';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { logIn } = useAuth();
	const token = localStorage.getItem('token');

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await logIn(username, password);
			navigate('/');
		} catch (error) {
			console.error('Ошибка входа:', error);
		}
	};

	useEffect(() => {
		if (token !== null) {
			navigate('/'); // Перенаправление на главную страницу, если токен уже существует
		}
	}, [token, navigate]);

	return (
		<Container
			component="main"
			maxWidth="xs"
			sx={{ display: 'flex', justifyContent: 'center', mt: '150px' }}
		>
			<CssBaseline />
			<div>
				<Typography component="h1" variant="h5">
					Вход в Таблицу
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="login"
						label="Логин"
						name="login"
						autoComplete="login"
						autoFocus
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Пароль"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>

					<Button type="submit" fullWidth variant="contained" color="primary">
						Войти
					</Button>
				</form>
			</div>
		</Container>
	);
};

export default Login;
