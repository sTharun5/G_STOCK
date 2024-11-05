import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './sing.css';
import logo from '/Users/tharun/Desktop/error/er/src/logo.png';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate(); // Initialize the hook

    const handleGoogleLogin = () => {
        // Simulate a Google login and redirect to the dashboard
        navigate('/dashboard');
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <div className="login-header">
                    <img src={logo} alt="College Logo" className="college-logo" />
                    <h1>G-Stock</h1>
                    <p className="login-tagline">Efficient Grocery Stock Management</p>
                </div>
                <div className="login-box">
                    <h2 className="login-title">Login Account</h2>
                    <form className="login-form">
                        <button type="button" className="google-button" onClick={handleGoogleLogin}>
                            <FaGoogle />
                            LOGIN WITH BITSATHY
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
