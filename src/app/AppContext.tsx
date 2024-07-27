import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage?: number;
    rating: number;
    stock: number;
    tags: string[];
    sku: string;
    weight: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: any[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    };
    images: string[];
    thumbnail: string;
}

interface AppContextType {
    cart: Product[];
    favorites: Product[];
    addToCart: (item: Product) => void;
    removeFromCart: (itemId: number) => void;
    addToFavorites: (item: Product) => void;
    removeFromFavorites: (itemId: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Product[]>([]);
    const [favorites, setFavorites] = useState<Product[]>([]);

    const addToCart = (item: Product) => {
        setCart(prevCart => [...prevCart, item]);
    };

    const removeFromCart = (itemId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    const addToFavorites = (item: Product) => {
        setFavorites(prevFavorites => [...prevFavorites, item]);
    };

    const removeFromFavorites = (itemId: number) => {
        setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== itemId));
    };

    return (
        <AppContext.Provider value={{ cart, favorites, addToCart, removeFromCart, addToFavorites, removeFromFavorites }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}