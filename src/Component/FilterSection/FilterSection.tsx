
import { useState, useEffect } from "react";
import styles from "./FilterSection.module.css";

type SortType = "asc" | "desc" | "";

type FilterSectionProps = {
    categories: string[];
    selectedCategory: string;
    sortOrder: SortType;
    setSelectedCategory: (value: string) => void;
    setSortOrder: (value: SortType) => void;
};

const FilterSection: React.FC<FilterSectionProps> = ({
    categories,
    setSelectedCategory,
    setSortOrder,
    selectedCategory,
    sortOrder,
}) => {
    const [tempCategory, setTempCategory] = useState<string>(selectedCategory);
    const [tempSort, setTempSort] = useState<SortType>(sortOrder);

    useEffect(() => {
        setTempCategory(selectedCategory);
        setTempSort(sortOrder);
    }, [selectedCategory, sortOrder]);

    const handleApply = () => {
        setSelectedCategory(tempCategory);
        setSortOrder(tempSort);
    };

    return (
        <div className={styles.container}>
            <div className={styles.row}>

                {/* Category Dropdown */}
                <select
                    className={styles.dropdown}
                    value={tempCategory}
                    onChange={(e) => setTempCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                {/* Sort Dropdown */}
                <select
                    className={styles.dropdown}
                    value={tempSort}
                    onChange={(e) => setTempSort(e.target.value as SortType)}
                >
                    <option value="">Sort By</option>
                    <option value="asc">Price: Low → High</option>
                    <option value="desc">Price: High → Low</option>
                </select>

                {/* Buttons */}
                <button className={styles.applyBtn} onClick={handleApply}>
                    Apply
                </button>

                <button
                    className={styles.clearBtn}
                    onClick={() => {
                        setTempCategory("");
                        setTempSort("");
                        setSelectedCategory("");
                        setSortOrder("");
                    }}
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default FilterSection;