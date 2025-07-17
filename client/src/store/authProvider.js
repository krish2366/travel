import { useEffect } from "react";
import { useAuthStore } from "./useAuthStore";
import axios from "axios";


export const AuthProvider = ({ children }) =>{
    const { login, logout, setUser } = useAuthStore();
    
    useEffect(() =>{
        const token = localStorage.getItem('accessToken');
        if(!token){
            logout();
            return;
        }

        axios.get("http://localhost:5000/users",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((res) =>{
            setUser(res.data.user);
            login(token);
        }).catch(() =>{
            logout();
            localStorage.removeItem('accessToken');
        })
    },[])

    return children;
}