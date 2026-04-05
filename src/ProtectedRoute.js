import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Ye bouncer hai, bina login andar nai aane dega
export default function ProtectedRoute({ children, reqRole }) 
{
    const cUsr = useSelector(s => s.usr.currUsr);

    // Agar user logged in nai hai, seedha login page pe phenko
    if (!cUsr) {
        return <Navigate to="/login" replace />;
    }

    // Agar kisi specific role (like admin) ki route hai aur user admin nai hai
    if (reqRole && cUsr.role !== reqRole) {
        alert("You do not have permission to view this page.");
        return <Navigate to="/" replace />;
    }

    // Agar sab theek hai to component render kardo
    return children;
}