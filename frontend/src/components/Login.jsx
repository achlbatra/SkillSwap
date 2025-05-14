import React, { useState } from 'react';
import axios from 'axios';
import styles from './Auth.module.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', upassword: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/skillswap/api/user/login", formData);
      localStorage.setItem("token", res.data.token); // store token
      alert("Login successful!");
      // navigate to dashboard or wherever
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.heading}>Login</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="upassword"
          placeholder="Password"
          required
          className={styles.input}
          value={formData.upassword}
          onChange={handleChange}
        />
        <button type="submit" className={styles.authButton}>Login</button>
      </form>
    </div>
  );
};

export default Login;
