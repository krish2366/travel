import { Navigate,Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuthStore();

    if(isAuthenticated){
        return <Outlet/>;
    }
    return <Navigate to='/' />;
}

export default ProtectedRoutes
