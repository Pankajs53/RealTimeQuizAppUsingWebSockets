import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const navigate = useNavigate();

    const [signupData, setSignUpData] = useState({
        username: "",
        password: "",
        email: "",
        confirmPassword: "",
    });

    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setSignUpData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const bothSamePassword = () => {
        return signupData.password === signupData.confirmPassword;
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        if (!bothSamePassword()) {
            console.log("Password does not match");
            return;
        }
        // Add sign up function
        console.log("SignUp with data", signupData);
        navigate("/offline-quiz");
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80'>
                <label htmlFor='username' className='block text-gray-700 text-sm font-bold mb-2'>Create Username</label>
                <input
                    name='username'
                    type='text'
                    placeholder="Username"
                    value={signupData.username}
                    onChange={handleChangeForm}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2 mt-4'>Email Address</label>
                <input
                    name='email'
                    type='email'
                    placeholder="Email Address"
                    value={signupData.email}
                    onChange={handleChangeForm}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2 mt-4'>Password</label>
                <input
                    name='password'
                    type='password'
                    placeholder="Password"
                    value={signupData.password}
                    onChange={handleChangeForm}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <label htmlFor='confirmPassword' className='block text-gray-700 text-sm font-bold mb-2 mt-4'>Confirm Password</label>
                <input
                    name='confirmPassword'
                    type='password'
                    placeholder="Confirm Password"
                    value={signupData.confirmPassword}
                    onChange={handleChangeForm}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                    onClick={handleSignUp}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default SignUp;
