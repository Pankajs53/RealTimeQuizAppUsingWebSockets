import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"

import { login } from '../services/operations/authAPI';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        // Add login function
        console.log("Login with data", formData);
        dispatch(login(formData.email,formData.password,navigate));
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80'>
                <label htmlFor='email' className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                    id='email'
                    name='email'
                    value={formData.email}
                    type='text'
                    placeholder='Enter your username'
                    onChange={handleFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <label htmlFor='password' className="block text-gray-700 text-sm font-bold mb-2 mt-4">Password</label>
                <input
                    name='password'
                    value={formData.password}
                    type='password'
                    placeholder='Enter your password'
                    onChange={handleFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <div className="mt-4">
                    <button
                        type='button'
                        // type='submit'
                        onClick={handleLogin}
                        className="bg-blue-500 hover:bg-blue-700 mr-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        LOGIN
                    </button>

                    <button
                        type='button'
                        onClick={() => navigate("/quiz-signup")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        SignUp
                    </button>
                </div>
            </form>
        </div>
    )
}



export default Login;
