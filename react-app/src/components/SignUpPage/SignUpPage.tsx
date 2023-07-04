// SignUp.tsx
import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css'

const SignUp: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
  
    if (response.ok) {
      navigate('/login');
    } else {
      const error = await response.json();
      console.error('Sign up error:', error);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  }

  return (
    <div className='sign-up-page'>
      <div className='card'>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
