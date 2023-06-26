import React, { useState } from 'react';
import './LoginPage.css';

interface User {
  username: string;
  password: string;
}

function LoginPage() {
  const [user, setUser] = useState<User>({ username: '', password: '' });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`Logging in with username: ${user.username} and password: ${user.password}`);
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
