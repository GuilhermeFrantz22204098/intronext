"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Product } from '@/app/models/interfaces';

export default function ProdutoPage() {
    const params = useParams();
    const id = Number(params.produto); 
    const [product, setProduct] = useState<Product | null>(null);
    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        fetch('https://deisishop.pythonanywhere.com/products/')
            .then(res => res.json())
            .then((data: Product[]) => {
                const found = data.find(p => p.id === id);
                setProduct(found || null);
            });

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setInCart(cart.includes(id));
    }, [id]);

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const newCart = [...cart, id];
        localStorage.setItem('cart', JSON.stringify(newCart));
        setInCart(true);
    };

    const removeFromCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const newCart = cart.filter((itemId: number) => itemId !== id);
        localStorage.setItem('cart', JSON.stringify(newCart));
        setInCart(false);
    };

    if (!product) return <p>A carregar...</p>;

    return (
        <div className="flex flex-col items-center text-center">
            <h2 className="mb-4">{product.title}</h2>
            <Image 
                src={product.image} 
                alt={product.title} 
                width={200} 
                height={200}
                className="bg-white rounded p-2 mb-4"
            />
            <p className="mb-2">{product.description}</p>
            <p className="font-bold text-lg mb-4">Preço: {product.price.toFixed(2)} €</p>
            
            <button 
                onClick={inCart ? removeFromCart : addToCart}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {inCart ? 'Remover do Carrinho' : 'Adicionar ao Carrinho'}
            </button>
        </div>
    );
}