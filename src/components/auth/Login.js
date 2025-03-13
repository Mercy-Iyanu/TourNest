import React from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase';

const Login = () => {
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result.user);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='shadow-xl mt-32 p-10 text-gray-700 rounded-lg'>
        <h2 className='text-3xl font-medium'>Get Started</h2>
        <div className='py-4'>
            <h3 className='py-4'>Join 400+ tour owners to create enjoyable tourist experience!</h3>
        </div>
        <div className='flex flex-col gap-4'> 
            <button onClick={GoogleLogin} className='text-white bg-red-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2'>
                <FaGoogle className='text-2xl'/> Sign in with Google
            </button>
            <button className='text-white bg-blue-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2'>
                <FaFacebook className='text-2xl'/> Sign in with Facebook
            </button>
        </div>
    </div>
  )
}

export default Login;