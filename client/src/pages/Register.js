import React, { useState, useEffect } from 'react';
import { Form, Input, message, Button, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const submitHandler = async (values) => {
        try {
            setLoading(true);
            await axios.post('api/v1/users/register', values);
            message.success('Registration Successful');
            navigate("/login");
        } catch (error) {
            message.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // Prevent already logged-in users from accessing the registration page
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className='register-container'>
            <div className='register-card'>
                {loading && <div className="loading-indicator"><Spin size="large" /></div>}
                <h1 className='register-title'>Register</h1>
                <Form layout='vertical' onFinish={submitHandler}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input className='register-input' />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                    >
                        <Input className='register-input' type='email' />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input className='register-input' type='password' />
                    </Form.Item>
                    <div className='register-actions'>
                        <Link className='register-login-link' to="/login">Already Registered? Click Here to login</Link>
                        <Button className='register-submit-button' type="primary" htmlType="submit" loading={loading}>
                            Register
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Register;
