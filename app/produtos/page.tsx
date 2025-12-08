"use client";

import useSWR from 'swr';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/app/models/interfaces';
import ProdutoCard from '@/components/ProdutoCard/ProdutoCard';
import { Spinner } from '@/components/ui/spinner';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProdutosPage() {
    const { data, error, isLoading } = useSWR<Product[]>(
        'https://deisishop.pythonanywhere.com/products/',
        fetcher
    );

    const [search, setSearch] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Product[]>([]);
    const [sort, setSort] = useState<string>('');
    
    const [cart, setCart] = useState<number[]>([]);
    const [isStudent, setIsStudent] = useState<boolean>(false);
    const [coupon, setCoupon] = useState<string>('');
    const [buyMessage, setBuyMessage] = useState<string>('');
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, isInitialized]);

    useEffect(() => {
        if (!data) return;

        let result = data.filter((product) => {
            return product.title.toLowerCase().includes(search.toLowerCase());
        });

        if (sort === 'price-asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-desc') {
            result.sort((a, b) => b.price - a.price);
        } else if (sort === 'name-asc') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sort === 'name-desc') {
            result.sort((a, b) => b.title.localeCompare(a.title));
        }

        setFilteredData(result);
    }, [search, data, sort]);

    const buyProduct = (product: Product) => {
        setCart((prevCart) => [...prevCart, product.id]);
    };

    const removeFromCart = (product: Product) => {
        setCart((prevCart) => {
            const index = prevCart.indexOf(product.id);
            if (index !== -1) {
                const newCart = [...prevCart];
                newCart.splice(index, 1);
                return newCart;
            }
            return prevCart;
        });
    };

    const handleBuy = async () => {
        try {
            const response = await fetch("https://deisishop.pythonanywhere.com/buy/", {
                method: "POST",
                body: JSON.stringify({
                    products: cart,
                    name: "",
                    student: isStudent,
                    coupon: coupon
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || response.statusText);
            }

            setCart([]);
            setBuyMessage(`Compra efetuada. Referência: ${result.reference}. Total pago: ${result.totalCost}€`);
            
        } catch (error: any) {
            console.error("Erro ao comprar:", error);
            setBuyMessage(`Erro: ${error.message}`);
        }
    };

    const productsInCart = data?.filter(product => cart.includes(product.id)) || [];
    
    const totalCost = cart.reduce((total, id) => {
        const product = data?.find(p => p.id === id);
        return total + Number(product?.price || 0);
    }, 0);

    if (error) return <div>Erro ao carregar</div>;
    if (isLoading) return <Spinner />;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Loja DEISI</h2>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-8 bg-gray-100 p-4 rounded-lg">
                <input
                    type="text"
                    placeholder="Pesquisar"
                    className="p-2 border border-gray-300 rounded-md w-full md:w-80 text-black"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select 
                    className="p-2 border border-gray-300 rounded-md text-black"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Automático</option>
                    <option value="price-asc">Menor preço</option>
                    <option value="price-desc">Maior preço</option>
                    <option value="name-asc">Nome A-Z</option>
                    <option value="name-desc">Nome Z-A</option>
                </select>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                
                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredData.map((product) => (
                            <Link key={product.id} href={`/produtos/${product.id}`} className="hover:no-underline">
                                <ProdutoCard 
                                    produto={product} 
                                    onInteract={buyProduct} 
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-1/3 bg-gray-50 p-4 rounded-xl border-2 border-gray-200 h-fit sticky top-4">
                    <h3 className="text-xl font-bold mb-4 flex justify-between items-center">
                        Carrinho
                        <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded-full">{cart.length}</span>
                    </h3>
                    
                    {cart.length === 0 ? (
                        <p className="text-gray-500 italic">arrinho vazio</p>
                    ) : (
                        <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 mb-4">
                            {cart.map((id, index) => {
                                const product = data?.find(p => p.id === id);
                                if (!product) return null;
                                return (
                                    <ProdutoCard 
                                        key={`${id}-${index}`} 
                                        produto={product} 
                                        isOnCart={true} 
                                        onInteract={removeFromCart} 
                                    />
                                );
                            })}
                        </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-300 space-y-4">
                        
                        <div className="flex items-center space-x-2">
                            <input 
                                type="checkbox" 
                                id="student" 
                                className="w-4 h-4"
                                checked={isStudent}
                                onChange={(e) => setIsStudent(e.target.checked)}
                            />
                            <label htmlFor="student" className="text-sm font-medium">
                                Sou estudante DEISI
                            </label>
                        </div>

                        <div>
                            <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                                Cupão de desconto
                            </label>
                            <input
                                type="text"
                                id="coupon"
                                placeholder="Insira o seu código"
                                className="w-full p-2 border border-gray-300 rounded text-sm text-black"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-between items-center text-xl font-bold pt-2">
                            <span>Total:</span>
                            <span>{totalCost.toFixed(2)} €</span>
                        </div>

                        <button 
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleBuy}
                            disabled={cart.length === 0}
                        >
                            Comprar Agora
                        </button>

                        {buyMessage && (
                            <div className={`mt-4 p-3 rounded text-sm text-center ${buyMessage.includes('Erro') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {buyMessage}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}