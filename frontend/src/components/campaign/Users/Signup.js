import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate= useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        
        
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post('https://crowdfunding-tjhr.onrender.com/api/signup', { name, email, password });
            localStorage.setItem('token', res.data.token);
            alert('Signup successful');
            navigate("/login", { replace: true });

        
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className='flex flex-col '>
            <div className='border text-center mx-96 w-1/3 h-auto bg-slate-200 my-44 rounded-lg absolute'>
                <h1 className='font-bold my-2 text-xl'>Register</h1>
                <form onSubmit={handleSignup} className='flex flex-col my-8'>
                    <input
                        className='h-10 focus:outline-none focus:ring-0 px-3 my-4'
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        className='h-10 focus:outline-none focus:ring-0 px-3'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className='my-4 h-10 focus:outline-none focus:ring-0 px-3'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        className='h-10 focus:outline-none focus:ring-0 px-3'
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        className='border w-20 h-10 bg-blue-500 rounded-lg hover:bg-blue-600 mx-48 my-1'
                        type="submit"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
