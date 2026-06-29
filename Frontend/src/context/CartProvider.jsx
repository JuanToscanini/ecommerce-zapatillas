import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import CartContext from './CartContext';

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(producto) {
    setCartItems(prev => {
      const existing = prev.find(item => item._id === producto._id);
      if (existing) {
        if (existing.quantity >= producto.stock) {
          toast.warning(`Stock máximo alcanzado (${producto.stock} unidades)`);
          return prev;
        }
        return prev.map(item =>
          item._id === producto._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...producto, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCartItems(prev => prev.filter(item => item._id !== productId));
  }

  function increaseQty(productId) {
    setCartItems(prev => {
      const item = prev.find(i => i._id === productId);
      if (item && item.quantity >= item.stock) {
        toast.warning(`Stock máximo alcanzado (${item.stock} unidades)`);
        return prev;
      }
      return prev.map(i =>
        i._id === productId ? { ...i, quantity: i.quantity + 1 } : i
      );
    });
  }

  function decreaseQty(productId) {
    setCartItems(prev =>
      prev
        .map(item =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.precio * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, cartQuantity, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
