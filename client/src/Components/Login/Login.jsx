import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors({});
    setServerError('');
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email address';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await axios.post('https://eshope-8z1d.onrender.com/api/users/login', formData);
      // You can store token in localStorage or Context if required
      console.log(response.data.token)
      login(response.data.token)
      alert("User logged succesfully!")
      navigate('/'); // Navigate to home or dashboard
    } catch (error) {
      alert(error.message)
      console.error('Login error:', error.response?.data?.message || error.message);
      setServerError(error.response?.data?.message || 'Login failed. Try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-left">
          <h2 className="brand-title">🛍️ ShopEase</h2>
          <p className="welcome-text">Welcome back! Please login to continue shopping.</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="login-input"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="login-input"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}

            {serverError && <div className="error-text server-error">{serverError}</div>}

            <button type="submit" className="login-button">Login</button>

            <p className="login-footer">
              Don't have an account? <Link to="/register" className="login-link">Register here</Link>
            </p>
          </form>
        </div>

        <div className="login-right">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
            alt="E-commerce"
            className="login-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
