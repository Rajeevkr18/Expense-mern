import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import './Header.css'; // Import custom CSS for the header

function Header() {
    const [loginUser, setLoginUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setLoginUser(user);
        }
    }, []);

    const logouthandler = () => {
        localStorage.removeItem('user');
        message.success('Logout Successfully');
        navigate('/login');
    };

    return (
        <nav className="header-navbar">
            <Link className="header-brand" to="/">Expense Management</Link>
            <div className="header-right">
                {loginUser && (
                    <span className="header-user">
                        Welcome, {loginUser.name}
                    </span>
                )}
                <button className="header-logout-btn" onClick={logouthandler}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Header;
