import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout/Layout.tsx';
import RecAuth from './Lib/RecAuth.tsx';
import Login from './pages/Login/Login.tsx';
import Error404 from './pages/Error404/Error404.tsx';
import React from 'react';
import Table from './pages/Table/Table.tsx';
const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RecAuth>
				<Layout />
			</RecAuth>
		),
		children: [
			{
				path: '/',
				element: <Table />,
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '*',
		element: <Error404 />,
	},
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
