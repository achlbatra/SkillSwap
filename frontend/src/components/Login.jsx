import React, { useState } from 'react';
import styles from './Auth.module.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', upassword: '' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    // Add your fetch/axios call to backend here
  };

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className={styles.input}
          onChange={handleChange}
        />
        <input
          type="password"
          name="upassword"
          placeholder="Password"
          required
          className={styles.input}
          onChange={handleChange}
        />
        <button type="submit" className={styles.authButton}>Login</button>
      </form>
    </div>
  );
};

export default Login;
