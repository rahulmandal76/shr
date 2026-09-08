import React from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import classes from './Cart.module.css';

const FloatingCartButton = ({ toggleDrawer }) => {
    const { cart, isCartOpen } = useCart();
    const location = useLocation();

    // Hide cart button entirely on the register/checkout page
    if (location.pathname === '/register') return null;

    // Hide if empty or if the drawer is actively open
    if (cart.length === 0 || isCartOpen) return null;

    return (
        <button className={classes.floatingCartBtn} onClick={toggleDrawer}>
            <div className={classes.cartIconWrapper}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span className={classes.badgeCount}>{cart.length}</span>
            </div>
        </button>
    );
};

export default FloatingCartButton;
