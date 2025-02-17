import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [Token, setToken] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() =>{
        const storedUser = window.localStorage.getItem('LoggedUser');
        const storedToken = window.localStorage.getItem('access_token');
        if(storedUser && storedToken){
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            navigate('/');
            return;
        }
        navigate('/login');
        return;
    }, [])

    const login = (userData, token) =>{
        setUser(userData);
        setToken(token);
        window.localStorage.setItem('LoggedUser', JSON.stringify(userData));
        window.localStorage.setItem('access_token', token);
    }

    const logout = () =>{
        setUser(null);
        setToken(null);
        window.localStorage.removeItem('LoggedUser');
        window.localStorage.removeItem('access_token');
    }


    return(
        <AuthContext.Provider value={{user, Token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}