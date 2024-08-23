'use client'
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '../../types'

interface ProductContextType {
    favorites: Product[];
    cart: Product[];
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (productId: number) => void;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const [cart, setCart] = useState<Product[]>([]);

    const addToFavorites = (product: Product) => {
        setFavorites((prev) => [...prev, product]);
    };

    const removeFromFavorites = (productId: number) => {
        setFavorites((prev) => prev.filter((item) => item.id !== productId));
    };

    const addToCart = (product: Product) => {
        setCart((prev) => [...prev, product]);
    };

    const removeFromCart = (productId: number) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    return (
        <ProductContext.Provider
            value={{
                favorites,
                cart,
                addToFavorites,
                removeFromFavorites,
                addToCart,
                removeFromCart,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export function useProductContext() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
}