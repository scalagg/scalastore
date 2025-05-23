'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BasketItem {
  id: number;
  name: string;
  image: string;
  in_basket: {
    price: number;
    quantity: number;
  };
}

interface BasketData {
  ident: string;
  username: string;
  packages: BasketItem[];
  links: {
    checkout: string;
  };
}

interface Basket {
  data: BasketData;
}

interface BasketContextType {
  basket: Basket | null;
  updateBasket: (basketData: Basket) => void;
  addToBasket: (basketIdent: string, packageId: number, quantity: number) => Promise<any>;
  removeFromBasket: (basketIdent: string, packageId: number) => Promise<any>;
  updateQuantity: (basketIdent: string, packageId: number, quantity: number) => Promise<any>;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { children: ReactNode }) {
  const [basket, setBasket] = useState<Basket | null>(null);

  useEffect(() => {
    // Load basket from localStorage on mount
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
      setBasket(JSON.parse(savedBasket));
    }
  }, []);

  const updateBasket = (basketData: Basket) => {
    setBasket(basketData);
    localStorage.setItem('basket', JSON.stringify(basketData));
  };

  const addToBasket = async (basketIdent: string, packageId: number, quantity: number = 1) => {
    try {
      const response = await fetch('/api/addToBasket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          basketIdent,
          package_id: packageId,
          quantity,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add to basket');
      }

      const data = await response.json();
      updateBasket(data.basket);
      return data;
    } catch (error) {
      console.error('Error adding to basket:', error);
      throw error;
    }
  };

  const removeFromBasket = async (basketIdent: string, packageId: number) => {
    try {
      const response = await fetch('/api/removeFromBasket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          basketIdent,
          package_id: packageId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to remove from basket');
      }

      const data = await response.json();
      updateBasket(data.basket);
      return data;
    } catch (error) {
      console.error('Error removing from basket:', error);
      throw error;
    }
  };

  const updateQuantity = async (basketIdent: string, packageId: number, quantity: number) => {
    try {
      const response = await fetch('/api/updateQuantity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          basketIdent,
          package_id: packageId,
          quantity,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update quantity');
      }

      const data = await response.json();
      updateBasket(data.basket);
      return data;
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  };

  return (
    <BasketContext.Provider value={{
      basket,
      updateBasket,
      addToBasket,
      removeFromBasket,
      updateQuantity
    }}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);
  if (context === undefined) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
} 