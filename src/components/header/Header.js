import { useState } from 'react';
import './Header.css';
import logo from '../../img/logo.png';

const Header = () => {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => setMenu(!menu);

  return (
    <nav className='navbar'>
      <a href='/' className='navbar-title'>
        <img src={logo} alt='bitblog logo' />
        <span>bitblog</span>
      </a>

      <button className='navbar-burger' onClick={toggleMenu}>
        <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='24' height='24' viewBox='0 0 24 24'><path d='M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z' /></svg>
      </button>

      <div className={(menu) ? 'navbar-menu open' : 'navbar-menu close'}>
        <a href='/' className='navbar-item navbar-link'>Create Blog</a>
        <a href='/' className='navbar-item navbar-link'>Your Blogs</a>
        <a href='/' className='navbar-item navbar-link'>Account</a>
      </div>
    </nav>
  );
};

export default Header;
