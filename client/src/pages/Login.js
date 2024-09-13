import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner'; // Ensure Spinner is correctly implemented

function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post('api/v1/users/login', values);
            setLoading(false);
            message.success('Login successful');
            localStorage.setItem('user', JSON.stringify({ ...data.user, Password: '' }));
            navigate('/');
        } catch (error) {
            setLoading(false);
            message.error('Something went wrong. Please try again.');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className='login-container'>
            {loading && <Spinner />}
            <div className='login-card'>
                <h1 className='login-title'>Login</h1>
                <Form layout='vertical' onFinish={submitHandler}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                    >
                        <Input className='login-input' type='email' />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password className='login-input' />
                    </Form.Item>
                    <div className='login-actions'>
                        <Link className='login-register-link' to="/register">
                            Not a user? Click here to register
                        </Link>
                        <button className='login-submit-button' type='submit'>
                            Login
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;
