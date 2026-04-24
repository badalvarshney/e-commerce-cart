import React from 'react';
import styles from './CartDetails.module.css';
import { useCart } from '../../Store/CartContext';

interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartDetailsProps {
    cart: CartItem;

}

const CartDetails: React.FC<CartDetailsProps> = ({ cart }) => {
    const { removeItemsFromCart, updateQuantity } = useCart();

    return (
        <>
            <div key={cart.id} className={styles.card}>
                <img src={cart.image} alt={cart.title} className={styles.image} />

                <div className={styles.details}>
                    <h3>{cart.title}</h3>
                    <p>${cart.price}</p>
                    <p>Qty {cart.quantity}</p>
                </div>
                <div>
                    <div className={styles.qtyContainer}>
                        <button
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(cart.id, "dec")}
                        >
                            -
                        </button>

                        <span className={styles.qty}>{cart.quantity}</span>

                        <button
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(cart.id, "inc")}
                        >
                            +
                        </button>
                    </div>
                    <button
                        className={styles.deleteBtn}
                        onClick={() => removeItemsFromCart(cart.id)}
                    >
                        x
                    </button>
                </div>
            </div >
        </>
    );
};

export default CartDetails;