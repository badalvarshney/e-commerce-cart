import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetails.module.css';
import Loader from '../../Component/Loader/Loader';
import { useCart } from '../../Store/CartContext';
// import { useCart } from '../store/CartContext.tsx';

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;
};

const ProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { addItemsToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPopping, setIsPopping] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (!response.ok) {
                    alert('Product not found');
                }
                const data: Product = await response.json();
                setProduct(data);
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (!product) return;
        const raw = localStorage.getItem("wishlist");
        const list = raw ? JSON.parse(raw) : [];
        setIsWishlisted(Array.isArray(list) && list.some((item: Product) => item.id === product.id));
    }, [product]);

    useEffect(() => {
        const handleWishlistChange = () => {
            if (!product) return;
            const raw = localStorage.getItem("wishlist");
            const list = raw ? JSON.parse(raw) : [];
            setIsWishlisted(Array.isArray(list) && list.some((item: Product) => item.id === product.id));
        };

        window.addEventListener("wishlistChange", handleWishlistChange);
        return () => window.removeEventListener("wishlistChange", handleWishlistChange);
    }, [product]);

    if (loading) {
        return <Loader />;
    }

    if (!product) {
        return <p className={styles.error}>Product not found</p>;
    }

    const handleClick = () => {
        setIsPopping(true);

        addItemsToCart(product);

        setTimeout(() => {
            setIsPopping(false);
        }, 400);
    };

    const handleWishlist = (productItem: Product) => {
        const raw = localStorage.getItem("wishlist");
        const list = raw ? JSON.parse(raw) : [];
        const alreadyAdded = Array.isArray(list) && list.some((item: Product) => item.id === productItem.id);

        if (alreadyAdded) {
            return;
        }

        const nextWishlist = [...(Array.isArray(list) ? list : []), productItem];
        localStorage.setItem("wishlist", JSON.stringify(nextWishlist));
        setIsWishlisted(true);
        window.dispatchEvent(new Event("wishlistChange"));
    }

    return (
        <div className={styles.container}>
            <button
                className={styles.backButton}
                onClick={() => navigate(-1)}
            >
                ← Back to Products
            </button>

            <div className={styles.header}>
                <h1 className={styles.title}>{product.title}</h1>
            </div>
            <img src={product.image} alt={product.title} className={styles.image} />
            <p className={styles.description}>{product.description}</p>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
            <button onClick={handleClick} className={`${styles.addToCart} ${isPopping ? styles.pop : ''}`}>
                Add to Cart
            </button>
            <button
                onClick={() => handleWishlist(product)}
                className={styles.addToWishlist}
                disabled={isWishlisted}
            >
                {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
            </button>
        </div>
    );
};

export default ProductDetails;




