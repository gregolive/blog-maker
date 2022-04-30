import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../helpers/Auth';
import logo from '../../img/logo.png';

const Header = () => {
  const { token, onLogout } = useAuth();
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => setMenu(!menu);
  const closeMenu = () => setMenu(false);
  const logout = () => {
    onLogout();
    closeMenu();
  };
  
  return (
    <nav className='Navbar'>
      {(token) ? (
        <NavLink to='/dashboard' className='NavbarTitle'>
          <img src={logo} alt='bitblog logo' />
          <span>bitblog</span>
        </NavLink>
      ) : (
        <NavLink to='/' className='NavbarTitle'>
          <img src={logo} alt='bitblog logo' />
          <span>bitblog</span>
        </NavLink>
      )}

      <button className='NavbarBurger' onClick={toggleMenu}>
        <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='24' height='24' viewBox='0 0 24 24'><path d='M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z' /></svg>
      </button>

      {(token) ? (
        <div className={(menu) ? 'NavbarMenu Open' : 'NavbarMenu Close'}>
          <NavLink to='/post/new' onClick={closeMenu} className='NavbarLink'>New Post</NavLink>
          <NavLink to='/' onClick={closeMenu} className='NavbarLink'>Account</NavLink>
          <button type='button' onClick={logout} className='NavbarLink'>Sign Out</button>
        </div>
      ) : (
        <div className={(menu) ? 'NavbarMenu Open' : 'NavbarMenu Close'}>
          <NavLink to='/register' onClick={closeMenu} className='NavbarLink'>Register</NavLink>
          <NavLink to='/login' onClick={closeMenu} className='NavbarLink'>Log in</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Header;
