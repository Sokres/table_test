import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
const token = localStorage.getItem('token');
const RecAuth: FC<{ children: ReactNode }> = ({ children }) => {
	if (token === null) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

export default RecAuth;
