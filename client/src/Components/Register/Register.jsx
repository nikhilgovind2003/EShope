import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setServerError('');
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerUser = async () => {
    try {
      await axios.post('https://eshope-8z1d.onrender.com/api/users/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      alert('Registration successful! Please login to continue.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      setServerError(error.response?.data?.message || 'Registration failed. Try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      registerUser();
    }
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-left">
          <h2 className="brand-title">🛍️ ShopEase</h2>
          <p className="welcome-text">Join us and start shopping smarter!</p>
          <form className="register-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="register-input"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="register-input"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="register-input"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="register-input"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}

            {serverError && <div className="error-text server-error">{serverError}</div>}

            <button type="submit" className="register-button">
              Register
            </button>
            <p className="register-footer">
              Already have an account? <Link to="/login" className="register-link">Login here</Link>
            </p>
          </form>
        </div>

        <div className="register-right">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
            alt="Register"
            className="register-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
