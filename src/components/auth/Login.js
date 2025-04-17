import React from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';

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
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <Card className="shadow-xl max-w-md w-full p-6">
                <CardContent>
                    <Typography variant="h4" className="font-bold text-center mb-2">
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" className="text-center text-gray-500 mb-4">
                        Join 400+ tour owners to create enjoyable tourist experiences!
                    </Typography>

                    <div className="flex flex-col gap-4 mt-4 mb-4">
                        <Button 
                            onClick={GoogleLogin} 
                            variant="contained" 
                            color="error" 
                            className="flex items-center gap-6 w-full py-2"
                        >
                            <FaGoogle className='text-lg' /> Sign in with Google
                        </Button>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className="flex items-center gap-6 w-full py-2"
                        >
                            <FaFacebook className='text-lg' /> Sign in with Facebook
                        </Button>
                    </div>

                    <Typography variant="body2" className="text-center text-gray-500 mt-4">
                        Don't have an account?{' '}
                        <Link to='/signup' className='text-blue-600 hover:underline'>Sign up</Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;
