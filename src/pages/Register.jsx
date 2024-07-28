// src/pages/Register.js
import { useState } from 'react';
import { useAuth } from '../AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import './register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, username);
      navigate('/bag'); 
    } catch (error) {
      console.error('Failed to register', error);
    }
  };

  return (
    <div className="registerPage">
    <div className="registerForm">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
      <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
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
        <button type="submit">Register</button>
      </form>
      <Link to="/login" className="loginLink">
        Already have an account? Log In
      </Link>
    </div>
  </div>
  );
}

export default Register;
