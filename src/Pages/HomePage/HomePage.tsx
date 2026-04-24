import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import ProductsList from "../../Component/ProductsList/ProductsList";
import Loader from "../../Component/Loader/Loader";
import FilterSection from "../../Component/FilterSection/FilterSection";
import { useSearchParams } from "react-router-dom";
// import ProductsList from '../components/ProductsList.tsx';

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};

const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>(
        searchParams.get("category") || ""
    );
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">(
        (searchParams.get("sort") as "asc" | "desc") || ""
    );




    useEffect(() => {
        const params: { category?: string; sort?: string } = {};

        if (selectedCategory) params.category = selectedCategory;
        if (sortOrder) params.sort = sortOrder;

        setSearchParams(params);
    }, [selectedCategory, sortOrder, setSearchParams]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    "https://fakestoreapi.com/products/categories",
                );
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.log("Categories are not fetched!", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                let url = "https://fakestoreapi.com/products";
                if (selectedCategory) {
                    url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
                }
                const response = await fetch(url);
                if (response.ok) {
                    const data: Product[] = await response.json();
                    if (sortOrder === "asc") {
                        data.sort((a, b) => a.price - b.price);
                    } else if (sortOrder === "desc") {
                        data.sort((a, b) => b.price - a.price);
                    }
                    setProducts(data);
                }
            } catch (error) {
                console.log("Products are not fetched!", error);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, [selectedCategory, sortOrder]);

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Products Page</h2>
            <FilterSection
                categories={categories}
                setSelectedCategory={setSelectedCategory}
                setSortOrder={setSortOrder}
                selectedCategory={selectedCategory}
                sortOrder={sortOrder}
            />
            {loading && <Loader />}
            <div className={styles.grid}>
                {products?.map((product) => (
                    <>
                        <ProductsList product={product} />
                    </>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
