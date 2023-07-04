// LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { useAuth } from '../../contexts/AuthContext';

interface User {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [user, setUser] = useState<User>({ username: '', password: '' });
  const navigate = useNavigate();
  
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`Logging in with username: ${user.username} and password: ${user.password}`);

    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user.username, password: user.password })
    });

    if (response.ok) {
      const { token } = await response.json();
      login(token);
      navigate('/');
    } else {
      const error = await response.json();
      console.error('Login error:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="login-page">
      <h2 className="login-title">Bling Bazaar</h2>
      <form onSubmit={handleSubmit}>
        <label className='username'>
          Username:
          <input type="text" name="username" value={user.username} onChange={handleInputChange} />
        </label>
        <br />
        <label className='password'>
          Password:
          <input type="password" name="password" value={user.password} onChange={handleInputChange} />
        </label>
        <br />
        <input type="submit" value="Login" className='submitbutton' />
      </form>
    </div>
  );
}

export default LoginPage;
