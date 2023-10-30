import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CartContextValue {
  addToCart: (productId: string, quantityIsSet: number) => void;
  updateCartItemQuantity: (productId: string, newQuantity: number) => void;
  cartCount: number;
  cartItems: { productId: string; quantityIsSet: number }[];
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<
    { productId: string; quantityIsSet: number }[]
  >([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (productId: string, quantityIsSet: number) => {
    const updatedCart = [...cartItems, { productId, quantityIsSet }];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Đặt hẹn giờ để xóa dữ liệu sau 1 giờ
    setTimeout(() => {
      setCartItems([]);
      localStorage.removeItem("cart");
    }, 36000000);
  };

  const updateCartItemQuantity = (productId: string, newQuantity: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.productId === productId) {
        return { ...item, quantityIsSet: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantityIsSet,
    0
  );

  const contextValue: CartContextValue = {
    addToCart,
    updateCartItemQuantity,
    cartCount,
    cartItems,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
