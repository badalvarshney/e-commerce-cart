import styles from './Cart.module.css';
import CartDetails from '../../Component/CartDetails/CartDetails';
import { useCart } from '../../Store/CartContext';
type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
};
const Cart = () => {
    const { cart, totalItems, totalPrice } = useCart();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Cart</h1>

            <div className={styles.summary}>
                <p>
                    Total Items <span>{totalItems}</span>
                </p>
                <p>
                    Total Price = <span>${totalPrice.toFixed(2)}</span>
                </p>
            </div>

            {cart.length === 0 ? (
                <p className={styles.empty}>Cart is empty</p>
            ) : (
                <div className={styles.cartList}>
                    {cart.map((item: CartItem) => (
                        <>
                            <CartDetails cart={item} />
                        </>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;