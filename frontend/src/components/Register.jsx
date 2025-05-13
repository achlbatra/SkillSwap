import React, { useState } from 'react';
import styles from './Auth.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '',
    role: '', skillsNeeded: '', skillsOffered: ''
  });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    // Add your fetch/axios POST to backend here
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
