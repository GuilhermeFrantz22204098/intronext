"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import useSWR from 'swr';
import { Product } from '@/app/models/interfaces';
import ProdutoDetalhe from '@/components/ProdutoDetalhe/ProdutoDetalhe';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';

const fetcher = (url: string) => fetch(url).then((res) => {
    if (!res.ok) throw new Error("Erro ao carregar");
    return res.json();
});

export default function ProdutoPage() {
    const { id } = useParams();
    const { data: product, error, isLoading } = useSWR<Product>(
        id ? `https://deisishop.pythonanywhere.com/products/${id}` : null,
        fetcher
    );

    if (error) return <div className="text-center mt-10 text-red-500">Erro ao carregar</div>;
    if (isLoading || !product) return <Spinner />;

    return (
        <div className="container mx-auto p-6">
            <div className="mb-6">
                <Link href="/produtos">
                    <Button variant="outline">
                        Voltar
                    </Button>
                </Link>
            </div>

            <ProdutoDetalhe produto={product} />
        </div>
    );
}