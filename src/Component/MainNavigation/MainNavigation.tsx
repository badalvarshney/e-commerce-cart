import { Link, NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { useCart } from '../../Store/CartContext';
import { useEffect, useState } from 'react';
// import { useCart } from '../store/CartContext.tsx';

function MainNavigation() {
    const { totalItems } = useCart();
    const [animate, setAnimate] = useState<boolean>(false);
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