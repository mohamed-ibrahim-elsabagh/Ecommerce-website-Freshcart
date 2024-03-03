import React, { useContext, useState } from 'react';
import style from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg';
import { CounterContext } from '../../Context/CounterContext';
import { UserContext } from '../../Context/UserContext';
import { useSelector } from 'react-redux';
import { CartContext } from '../../Context/CartContext';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

export default function NavigationBar() {
  const { userToken, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [expanded, setExpanded] = useState(false);

  function logOut() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
  }

  const { numOfCartItems } = useContext(CartContext);

  return (
    <Navbar bg="body-tertiary" expand="lg" className="p-3 position-fixed navBarZindex  bg-main-light ">
      <Navbar.Brand as={Link} to="/">
        <img src={logo} alt="fresh cart" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="m-auto">
          {userToken != null && (
            <>
              <Nav.Link as={Link} to="/" className="fw-bolder">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/wishlist" className="fw-bolder">
                Wishlist
              </Nav.Link>
              <Nav.Link as={Link} to="/products" className="fw-bolder">
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/categories" className="fw-bolder">
                Categories
              </Nav.Link>
              <Nav.Link as={Link} to="/brands" className="fw-bolder">
                Brands
              </Nav.Link>
              <Nav.Link as={Link} to="/cart" className="fw-bolder">
                <i className="fa-solid fa-cart-shopping fs-1 position-relative">
                  {numOfCartItems > 0 && (
                    <span className={`cart-count bg-main text-white rounded-1 ${style.cartIcon}`}>
                      {numOfCartItems}
                    </span>
                  )}
                </i>
              </Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
        <div className="d-flex align-items-center">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="me-2">
        <i className="fab fa-facebook cursor-pointer"></i>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="me-2">
        <i className="fab fa-twitter cursor-pointer"></i>
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="me-2">
        <i className="fab fa-instagram cursor-pointer"></i>
      </a>
      <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="me-2">
        <i className="fab fa-youtube cursor-pointer"></i>
      </a>
    </div>
          {userToken ? (
            <Nav.Link onClick={logOut} className="fw-bolder">
              LogOut
            </Nav.Link>
          ) : (
            <>
              <Nav.Link as={Link} to="/register" className="fw-bolder">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className="fw-bolder ">
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

