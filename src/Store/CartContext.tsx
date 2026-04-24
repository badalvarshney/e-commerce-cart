import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addItemsToCart: (item: CartItem) => void;
    updateQuantity: (id: number, type: "inc" | "dec") => void;
    removeItemsFromCart: (id: number) => void;
    totalItems: number;
    totalPrice: number;
};
type Props = {
    children: ReactNode;
};

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
};

export const CartProvider = ({ children }: Props) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);



    const addItemsToCart = (item: CartItem) => {
        setCart((prev: CartItem[]) => {
            const existingItem = prev.find((i) => i.id === item.id);

            if (existingItem) {
                return prev.map((i) =>
                    i.id === item.id
                        ? { ...i, quantity: (i.quantity || 1) + 1 }
                        : i
                );
            }

            return [...prev, { ...item, quantity: 1 }];
        });
    };



    const updateQuantity = (id: number, type: "inc" | "dec") => {
        setCart((prev: CartItem[]) =>
            prev
                .map((item) => {
                    if (item.id === id) {
                        if (type === "inc") {
                            return { ...item, quantity: item.quantity + 1 };
                        } else {
                            return item.quantity > 1
                                ? { ...item, quantity: item.quantity - 1 }
                                : null; // quantity 1 pe remove
                        }
                    }
                    return item;
                })
                .filter((item) => item !== null)
        );
    };

    const removeItemsFromCart = (id: number) => {
        setCart((prev: CartItem[]) => prev.filter((item: CartItem) => item.id !== id));
    };

    let totalItems = 0;
    for (const item of cart) {
        totalItems += item.quantity || 0;
    }
    let totalPrice = 0;
    for (const item of cart) {
        totalPrice = totalPrice + item.price * item.quantity;
    }

    return (
        <>
            <CartContext.Provider value={{
                cart,
                addItemsToCart,
                updateQuantity,
                removeItemsFromCart,
                totalItems,
                totalPrice,
            }}>
                {children}
            </CartContext.Provider>
        </>
    )
}