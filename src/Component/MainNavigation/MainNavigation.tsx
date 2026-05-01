import { Link, NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { useCart } from '../../Store/CartContext';
import { useEffect, useState } from 'react';
// import { useCart } from '../store/CartContext.tsx';

function MainNavigation() {
    const { totalItems } = useCart();
    const [wishlistCount, setWishlistCount] = useState<number>(0);
    const [animate, setAnimate] = useState<boolean>(false);

    useEffect(() => {
        const loadWishlist = () => {
            const raw = localStorage.getItem('wishlist');
            const items = raw ? JSON.parse(raw) : [];
            setWishlistCount(Array.isArray(items) ? items.length : 0);
        };

        loadWishlist();

        const handleWishlistChange = () => {
            loadWishlist();
        };

        window.addEventListener('wishlistChange', handleWishlistChange);
        return () => window.removeEventListener('wishlistChange', handleWishlistChange);
    }, []);

    useEffect(() => {
        if (totalItems === 0) return;
        setAnimate(true);
        const timer = setTimeout(() => {
            setAnimate(false);
        }, 400);

        return () => clearTimeout(timer);
    }, [totalItems]);
    return (
        <header className={classes.header}>
            <nav className={classes.nav}>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                            end
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/products/1"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Product Details
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/wishlist"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ''}
                        </NavLink>
                    </li>
                </ul>
                <Link to="/cart">
                    <button className={`${classes.cartBtn} ${animate ? classes.bump : ""}`}
                    >Cart {totalItems} </button>
                </Link>
            </nav>
        </header>
    );
}

export default MainNavigation;