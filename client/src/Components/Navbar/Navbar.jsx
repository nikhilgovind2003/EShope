import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // CSS file we'll write below
import { X, Menu, User } from 'lucide-react';
import { AuthContext } from '../../Contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    alert("Logout Successfully!");
    navigate("/login"); // Then navigate
  };
  


  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          ShopEase
        </Link>

        {/* Hamburger Icon */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <p className="Menu">{!isOpen ? <Menu /> : < X />}</p>
        </div>

        {/* Nav Links */}
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li><Link to="/" >Home</Link></li>
          <li><Link to="/new-product" >New Product</Link></li>
          {
            token ?
              <>
                <li className="user-logo">
                <Link to="/profile" title="Profile">
                  <User className="user-icon" />
                </Link>
              </li>
                <li><Link onClick={handleLogout}>Logout</Link></li>
              </>


              :
              <>
                <li><Link to="/login" >Login</Link></li>
                <li><Link to="/register" >SignUp</Link></li>
              </>
          }
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
