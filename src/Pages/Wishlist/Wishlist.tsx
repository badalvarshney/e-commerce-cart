import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Store/CartContext";
import styles from "./Wishlist.module.css";

type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
};

const Wishlist = () => {
    const { addItemsToCart } = useCart();
    const [wishlist, setWishlist] = useState<Product[]>(() => {
        const raw = localStorage.getItem("wishlist");
        const items = raw ? (JSON.parse(raw) as Product[]) : [];
        return Array.isArray(items) ? items : [];
    });
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => {
            const rawData = localStorage.getItem("wishlist");
            const updatedItems = rawData ? (JSON.parse(rawData) as Product[]) : [];
            setWishlist(Array.isArray(updatedItems) ? updatedItems : []);
        };

        window.addEventListener("wishlistChange", handleStorageChange);
        return () => window.removeEventListener("wishlistChange", handleStorageChange);
    }, []);

    const updateWishlist = (items: Product[]) => {
        localStorage.setItem("wishlist", JSON.stringify(items));
        setWishlist(items);
        window.dispatchEvent(new Event("wishlistChange"));
    };

    const removeFromWishlist = (id: number) => {
        const nextList = wishlist.filter((item) => item.id !== id);
        updateWishlist(nextList);
    };

    const moveToCart = (item: Product) => {
        addItemsToCart({ ...item, quantity: 1 });
        removeFromWishlist(item.id);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>My Wishlist</h1>
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    ← Back
                </button>
            </div>

            {wishlist.length === 0 ? (
                <p className={styles.empty}>Your wishlist is empty.</p>
            ) : (
                <div className={styles.grid}>
                    {wishlist.map((item) => (
                        <div className={styles.card} key={item.id}>
                            <img src={item.image} alt={item.title} className={styles.image} />
                            <div className={styles.details}>
                                <h3>{item.title}</h3>
                                <p className={styles.price}>${item.price.toFixed(2)}</p>
                            </div>
                            <div className={styles.actions}>
                                <button className={styles.actionBtn} onClick={() => moveToCart(item)}>
                                    Move to Cart
                                </button>
                                <button className={styles.deleteBtn} onClick={() => removeFromWishlist(item.id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
