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
        <Card className="max-w-4xl mx-auto my-8 border border-gray-200 rounded-xl shadow-lg bg-white">
            <CardHeader className="p-6 md:p-8 ">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <CardTitle className="text-3xl font-extralight mb-1 text-gray-900">{produto.title}</CardTitle>
                        <CardDescription className="capitalize text-lg text-gray-500">
                            {produto.category}
                        </CardDescription>
                    </div>
                    <div className="text-right mt-4 sm:mt-0 p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-500 block">Avaliação</span>
                        <span className="font-bold text-lg text-yellow-600">{produto.rating.rate}</span> 
                        <span className="text-xs text-gray-400"> ({produto.rating.count} reviews)</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col md:flex-row gap-8 items-start p-6 md:p-8">
                <div className="relative w-full md:w-80 h-80 flex-shrink-0 bg-white border border-gray-100 p-6 rounded-lg shadow-sm">
                    <Image 
                        src={imageUrl} 
                        alt={produto.title} 
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 300px"
                    />
                </div>
                
                <div className="flex-1 space-y-6">
                    <div>
                        <h4 className="text-lg font-semibold mb-2 text-gray-700">Descrição</h4>
                        <p className="text-gray-600 leading-relaxed text-base">
                            {produto.description}
                        </p>
                    </div>
                    <div className="text-4xl font-bold">
                        {Number(produto.price).toFixed(2)} €
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex justify-end p-6 md:p-8 ">
                <Button 
                    variant={inCart ? "destructive" : "default"}
                    onClick={inCart ? removeFromCart : addToCart}
                    className={inCart ? "bg-red-500 hover:bg-red-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}
                >
                    {inCart ? 'Remover do Carrinho' : 'Adicionar ao Carrinho'}
                </Button>
            </CardFooter>
        </Card>
    );
}