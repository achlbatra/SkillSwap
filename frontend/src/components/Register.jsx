import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import axios from 'axios'


const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '',
    role: '', skillsNeeded: '', skillsOffered: ''
  });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      skillsNeeded: formData.skillsNeeded
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill !== ''),
  
      skillsOffered: formData.skillsOffered
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill !== '')
    };
    try {
      const res = await axios.post("http://localhost:8000/skillswap/api/user/register", updatedFormData);
      localStorage.setItem("token", res.data.token); // store token
      alert("Registeration successful!");
      navigate("/login")
    } catch (err) {
      alert(err.response?.data?.message || "Registeration failed");
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.heading}>Register</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="name" placeholder="Name" required className={styles.input} onChange={handleChange} />
        <input name="email" placeholder="Email" type="email" required className={styles.input} onChange={handleChange} />
        <input name="phone" placeholder="Phone" required className={styles.input} onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" required className={styles.input} onChange={handleChange} />
        <select name="role" required className={styles.input} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="mentor">Mentor</option>
          <option value="learner">Learner</option>
          <option value="both">Both</option>
        </select>
        <input name="skillsNeeded" placeholder="Skills Needed (comma separated)" className={styles.input} onChange={handleChange} />
        <input name="skillsOffered" placeholder="Skills Offered (comma separated)" className={styles.input} onChange={handleChange} />
        <button type="submit" className={styles.authButton}>Register</button>
      </form>
    </div>
  );
};

export default Register;
