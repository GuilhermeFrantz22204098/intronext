"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/app/models/interfaces';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ProdutoDetalheProps {
    produto: Product;
}

export default function ProdutoDetalhe({ produto }: ProdutoDetalheProps) {
    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setInCart(cart.includes(produto.id));
    }, [produto.id]);

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const newCart = [...cart, produto.id];
        localStorage.setItem('cart', JSON.stringify(newCart));
        setInCart(true);
    };

    const removeFromCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const newCart = cart.filter((itemId: number) => itemId !== produto.id);
        localStorage.setItem('cart', JSON.stringify(newCart));
        setInCart(false);
    };

    const imageHost = "https://deisishop.pythonanywhere.com";
    const imageUrl = produto.image.startsWith('http') 
        ? produto.image 
        : `${imageHost}${produto.image}`;

    return (
        <Card className="max-w-2xl mx-auto my-8 shadow-lg">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl mb-2">{produto.title}</CardTitle>
                        <CardDescription className="capitalize text-lg">
                            {produto.category}
                        </CardDescription>
                    </div>
                    <div className="text-right">
                        <span className="text-sm text-gray-500 block">Avaliação</span>
                        <span className="font-bold">⭐ {produto.rating.rate}</span> 
                        <span className="text-xs text-gray-400"> ({produto.rating.count} reviews)</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-8 items-center">
                <div className="relative w-64 h-64 flex-shrink-0 bg-white p-4 rounded-lg">
                    <Image 
                        src={imageUrl} 
                        alt={produto.title} 
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 300px"
                    />
                </div>
                <div className="flex-1 space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                        {produto.description}
                    </p>
                    <div className="text-3xl font-bold text-blue-600">
                        {Number(produto.price).toFixed(2)} €
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4 bg-gray-50 p-6 rounded-b-lg">
                <Button 
                    variant={inCart ? "destructive" : "default"}
                    onClick={inCart ? removeFromCart : addToCart}
                    className="w-full md:w-auto"
                >
                    {inCart ? 'Remover do Carrinho' : 'Adicionar ao Carrinho'}
                </Button>
            </CardFooter>
        </Card>
    );
}