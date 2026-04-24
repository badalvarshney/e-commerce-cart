import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./ProductsList.module.css";

type Product = {
    id: number;
    title: string;
    price: number;
    image?: string;
};

interface ProductsListProps {
    product: Product;
}

const ProductsList: React.FC<ProductsListProps> = ({ product }) => {
    return (
        <>
            <Link to={`/products/${product.id}`}>
                <div key={product.id} className={styles.card}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className={styles.image}
                    />
                    <h3 className={styles.title}>{product.title}</h3>
                    <p className={styles.price}>${product.price.toFixed(2)}</p>
                </div>
            </Link>
        </>
    );
};

export default ProductsList;