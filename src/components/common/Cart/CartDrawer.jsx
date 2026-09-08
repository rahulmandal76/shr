import React, { useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import classes from './Cart.module.css';

const CartDrawer = ({ isOpen, toggleDrawer }) => {
    const { cart, removeFromCart } = useCart();
    const navigate = useNavigate();

    // Prevent background scrolling when cart is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const totalAmount = cart.reduce((acc, event) => acc + (event.price || 0), 0);

    const handleProceed = () => {
        toggleDrawer();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/register');
    };

    return (
        <>
            <div
                className={`${classes.cartOverlay} ${isOpen ? classes.cartOverlayOpen : ''}`}
                onClick={toggleDrawer}
            ></div>

            <div className={`${classes.cartDrawer} ${isOpen ? classes.cartDrawerOpen : ''}`}>
                <div className={classes.cartHeader}>
                    <h2>Your Cart ({cart.length})</h2>
                    <button className={classes.closeBtn} onClick={toggleDrawer}>&times;</button>
                </div>

                <div className={classes.cartItems}>
                    {cart.length === 0 ? (
                        <div className={classes.emptyCart}>
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        cart.map((event) => (
                            <div key={event.id} className={classes.cartItem}>
                                <div className={classes.itemInfo}>
                                    <h4>{event.name}</h4>
                                    {event.type === 'team_fixed' && (
                                        <span className={classes.teamInfo}>
                                            Fixed team fee (Min {event.minMembers} - Max {event.maxMembers} members)
                                        </span>
                                    )}
                                    {event.type === 'individual' && (
                                        <span className={classes.teamInfo}>
                                            Individual Entry
                                        </span>
                                    )}
                                </div>

                                <div className={classes.itemActions}>
                                    <span className={classes.itemPrice}>
                                        {event.price === 0 ? 'Free' : `₹${event.price}`}
                                    </span>
                                    <button
                                        className={classes.removeBtn}
                                        onClick={() => removeFromCart(event.id)}
                                        title="Remove from Cart"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className={classes.cartFooter}>
                        <div className={classes.billRow}>
                            <span>Subtotal</span>
                            <span>₹{totalAmount}</span>
                        </div>
                        <div className={classes.billRow}>
                            <span>Total Events</span>
                            <span>{cart.length}</span>
                        </div>

                        <button className={classes.proceedBtn} onClick={handleProceed}>
                            Proceed to Registration &rarr;
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
