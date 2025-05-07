import React, { useState } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography, ToggleButton, ToggleButtonGroup, Alert } from '@mui/material';

const SocialButton = ({ onClick, icon: Icon, text, color }) => (
    <Button
        onClick={onClick}
        variant="contained"
        color={color}
        className="flex items-center gap-6 w-full py-2"
    >
        <Icon className="text-lg" /> {text}
    </Button>
);

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
    const [userRole, setUserRole] = useState('');
    const [error, setError] = useState('');

    const handleRoleChange = (_, newRole) => {
        setUserRole(newRole);
        setError('');
    };

    const handleGoogleLogin = async () => {
        if (!userRole) {
            setError('Please select your user role before signing in.');
            return;
        }

        try {
            const result = await signInWithPopup(auth, googleProvider);
            localStorage.setItem("authUser", JSON.stringify(result.user));
            localStorage.setItem("userRole", userRole);
            onLogin(true);
            const destination = userRole === 'tour-owner' ? '/owner-dashboard' : '/distributor-dashboard';
            navigate(destination);
        } catch (error) {
            console.error("Google login error:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <Card className="shadow-xl max-w-md w-full p-6">
                <CardContent>
                    <Typography variant="h4" className="font-bold text-center mb-2">
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" className="text-center text-gray-500">
                        Join 400+ tour owners to create enjoyable tourist experiences!
                    </Typography>

                    <hr className='mt-4 mb-4'/>

                    <Typography variant="body2" className="text-gray-600 text-center">
                        Select your role
                    </Typography>
                    <div className="flex justify-center mb-4">
                        <ToggleButtonGroup
                            value={userRole}
                            exclusive
                            onChange={handleRoleChange}
                            color="primary"
                        >
                            <ToggleButton value="tour-owner">Tour Owner</ToggleButton>
                            <ToggleButton value="tour-distributor">Tour Distributor</ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                    {error && <Alert severity="warning" className="mb-4">{error}</Alert>}

                    <div className="flex flex-col gap-4">
                        <SocialButton
                            onClick={handleGoogleLogin}
                            icon={FaGoogle}
                            text="Sign in with Google"
                            color="error"
                        />
                        <SocialButton
                            onClick={() => alert('Facebook login coming soon')}
                            icon={FaFacebook}
                            text="Sign in with Facebook"
                            color="primary"
                        />
                    </div>

                    <Typography variant="body2" className="text-center text-gray-500 mt-4">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign up
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;