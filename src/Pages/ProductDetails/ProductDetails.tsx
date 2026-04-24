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
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { addItemsToCart } = useCart();
    const [isPopping, setIsPopping] = useState(false);

    const navigate = useNavigate();

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
                // setError(err.message);
                console.log(err)
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

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


        </div>
    );
};

export default ProductDetails;