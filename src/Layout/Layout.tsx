import { AppBar, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<AppBar position="relative">
				<Toolbar>
					<Typography variant="h6" color="inherit" noWrap>
						Приложение Таблицы
					</Typography>
				</Toolbar>
			</AppBar>
			<Outlet />
		</>
	);
};

export default Layout;
