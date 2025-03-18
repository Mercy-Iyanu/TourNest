import React from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();

    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result.user);
            localStorage.setItem("authUser", JSON.stringify(result.user));
            onLogin(true);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='shadow-xl p-10 bg-white rounded-lg max-w-md w-full text-gray-700'>
                <h2 className='text-3xl font-bold text-center'>Welcome Back</h2>
                <p className='text-center text-gray-500 mt-2'>Join 400+ tour owners to create enjoyable tourist experiences!</p>
                
                <div className='flex flex-col gap-4 mt-6'> 
                    <button onClick={GoogleLogin} 
                        className='text-white bg-red-600 p-3 w-full font-medium rounded-lg flex justify-center items-center gap-2 hover:bg-red-700 transition'
                    >
                        <FaGoogle className='text-xl'/> 
                        Sign in with Google
                    </button>
                    <button 
                        className='text-white bg-blue-700 p-3 w-full font-medium rounded-lg flex justify-center items-center gap-2 hover:bg-blue-800 transition'
                    >
                        <FaFacebook className='text-xl'/> 
                        Sign in with Facebook
                    </button>
                </div>
                
                <p className='text-center text-gray-500 mt-4'>Don't have an account? <Link to='/signup' className='text-blue-600 hover:underline'>Sign up</Link></p>
            </div>
        </div>
    );
}

export default Login;
