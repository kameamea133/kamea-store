// src/Login.js
import { useState } from 'react';
import { useAuth } from '../AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/bag');
    } catch (error) {
      console.error('Failed to log in', error);
    }
  };

  return (
    <div className="loginPage">
    <div className="loginForm">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Log In</button>
        <Link to="/register" className="registerLink">
          Create an account
        </Link>
      </form>
    </div>
  </div>
  );
}

export default Login;
