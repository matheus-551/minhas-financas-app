import React,{ createContext, useState } from 'react';

export const AuthContext = createContext();
export const AuthCosummer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

function AuthenticationProvider(props) {

    const [authenticatedUser, setAuthenticatedUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false); 

    const beginSession = (user) => {
        localStorage.setItem("logged_user", user);
        setAuthenticatedUser(user);
        setIsAuthenticated((prevState) => !prevState);
    }

    const endSession = () => {
        localStorage.removeItem("logged_user");
        setAuthenticatedUser({});
        setIsAuthenticated((prevState) => !prevState);
    }

    const context = {
        authenticatedUser,
        isAuthenticated,
        beginSession,
        endSession
    }

    return (
        <AuthProvider value={context}>
            {props.children}
        </AuthProvider>
    )
}