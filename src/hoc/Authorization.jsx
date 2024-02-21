import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//! Bug var!
export const withAuthProtectionRedirect = (WrappedComponent) => {

    const AuthProtectedComponent = (props) => {

        const navigate = useNavigate();
        
        useEffect(() => {
            if (localStorage.getItem('isAuthenticated') !== "true") {
                navigate('/signin');
            }
        }, [])

        return <WrappedComponent {...props} />
    }

    return AuthProtectedComponent;

}