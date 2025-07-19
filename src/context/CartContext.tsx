import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Script {
  id: number;
  title: string;
  description: string;
  price: string;
  rating: number;
  downloads: number;
  category: string;
  image: string;
}

interface CartItem extends Script {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (script: Script) => void;
  removeFromCart: (scriptId: number) => void;
  updateQuantity: (scriptId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (script: Script) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === script.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === script.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentItems, { ...script, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (scriptId: number) => {
    setCartItems(currentItems => 
      currentItems.filter(item => item.id !== scriptId)
    );
  };

  const updateQuantity = (scriptId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(scriptId);
      return;
    }
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === scriptId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace('₽', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};