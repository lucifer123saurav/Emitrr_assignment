import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom"

export const Logout = () => {

    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("who");
        navigate("/login");
    }, [])
    return (
    <div>Loading...</div>
  )
}
