import React, { createContext, useContext, useState, useEffect, ReactNode  } from 'react';

interface CartContextValue {
    addToCart: (productId: string, quantity: number) => void;
    cartCount: number;
    cartItems: { productId: string; quantity: number }[];
  }

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => { // Không cần truyền any vào đây
    const [cartItems, setCartItems] = useState<{ productId: string; quantity: number }[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
    }, []);
    
    const addToCart = (productId: string, quantity: number) => {
        const updatedCart = [...cartItems, { productId, quantity }];
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    
        // Đặt hẹn giờ để xóa dữ liệu sau 1 giờ
        setTimeout(() => {
          setCartItems([]);
          localStorage.removeItem('cart');
        }, 36000000); 
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const contextValue: CartContextValue = {
        addToCart,
        cartCount,
        cartItems,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};
