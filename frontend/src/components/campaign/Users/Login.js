import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://crowdfunding-tjhr.onrender.com/api/login', { email, password });
            localStorage.setItem('authToken', res.data.token);
            alert('Login successful');
            navigate("/campaign", { replace: true });
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className='flex flex-col '>
        <div className='border text-center mx-96 w-1/3 h-auto bg-slate-200 my-44 rounded-lg absolute'>
    <h1 className='font-bold my-2 text-xl'>Login</h1>
        <form onSubmit={handleLogin} className='flex flex-col my-8 '>
            <input className='h-10 focus:outline-none focus:ring-0 px-3'  type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className='my-4 h-10 focus:outline-none focus:ring-0 px-3' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button className='border w-20 h-10 bg-blue-500 rounded-lg hover:bg-blue-600 mx-48' type="submit">Log In</button>
            <div className='flex relative left-80'>
            <p className=''>new user?</p>
            <Link to="/signup" className=' text-blue-600 hover:text-blue-700'>register</Link>
            </div>
        </form>
        
        </div>
        </div>
    );
};

export default Login;
