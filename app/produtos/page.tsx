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
        <div className="container mx-auto">
            <h2 className="text-3xl font-light mb-8 text-center text-gray-900">Loja DEISI</h2>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Pesquisar por nome..."
                    className="p-2 border border-gray-300 rounded-md w-full md:w-80 text-gray-700 placeholder-gray-400 transition-colors"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select 
                    className="p-2 border border-gray-300 rounded-md text-gray-700 transition-colors"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Ordenação Padrão</option>
                    <option value="price-asc">Preço: Menor para Maior</option>
                    <option value="price-desc">Preço: Maior para Menor</option>
                    <option value="name-asc">Nome: A-Z</option>
                    <option value="name-desc">Nome: Z-A</option>
                </select>
            </div>

            <div className="flex flex-col gap-8">
                <div className="w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredData.map((product) => (
                            <Link 
                                key={product.id} 
                                href={`/produtos/${product.id}`} 
                                className="hover:no-underline"
                            >
                                <ProdutoCard 
                                    produto={product} 
                                    onInteract={buyProduct} 
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Added max-w-4xl and mx-auto here */}
                <div className="w-full max-w-4xl mx-auto bg-white p-5 rounded-xl border border-gray-200 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 pb-2 flex justify-between items-center text-gray-900">
                        Carrinho
                        <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-medium">{cart.length}</span>
                    </h3>

                    <div className="flex flex-wrap gap-3 mb-4">
                            {cart.map((id, index) => {
                                const product = data?.find(p => p.id === id);
                                if (!product) return null;
                                return (
                                    <div key={`${id}-${index}`} className="w-full sm:w-auto">
                                         <ProdutoCard 
                                            produto={product} 
                                            isOnCart={true} 
                                            onInteract={removeFromCart} 
                                            isSmall={true}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                    <div className="mt-4 pt-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <input 
                                    type="checkbox" 
                                    id="student"
                                    checked={isStudent}
                                    onChange={(e) => setIsStudent(e.target.checked)}
                                />
                                <label htmlFor="student" className="text-sm font-medium text-gray-700">
                                    Sou estudante DEISI
                                </label>
                            </div>

                            <div className="flex items-center gap-2">
                                <label htmlFor="coupon" className="text-xs font-medium text-gray-500 whitespace-nowrap">
                                    Cupão:
                                </label>
                                <input
                                    type="text"
                                    id="coupon"
                                    placeholder="DEISI123"
                                    className="flex-1 p-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 transition-colors"
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2">
                            <div className="text-2xl font-bold text-gray-900">
                                {totalCost.toFixed(2)} €
                            </div>

                            <button 
                                className="w-full md:w-auto px-8 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                onClick={handleBuy}
                                disabled={cart.length === 0}
                            >
                                Finalizar Compra
                            </button>
                        </div>

                        {buyMessage && (
                            <div className={`mt-4 p-3 rounded-lg text-sm text-center font-medium`}>
                                {buyMessage}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}