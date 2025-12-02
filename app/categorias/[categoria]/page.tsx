import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/app/models/interfaces';

interface PageProps {
    params: Promise<{
        categoria: string;
    }>;
}

export default async function CategoriaProdutosPage({ params }: PageProps) {
    const resolvedParams = await params;
    const categoryName = decodeURIComponent(resolvedParams.categoria);

    const res = await fetch('https://deisishop.pythonanywhere.com/products/');
    const allProducts: Product[] = await res.json();
    const filteredProducts = allProducts.filter(p => p.category === categoryName);

    return (
        <>
            <h2>Categoria: {categoryName}</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
                {filteredProducts.map((product) => (
                    <Link key={product.id} href={`/produtos/${product.id}`} className="bg-white rounded p-3 flex flex-col items-center text-center text-black no-underline">
                        <Image 
                            src={product.image} 
                            alt={product.title} 
                            width={100} 
                            height={100}
                            className="mb-2 object-contain h-24"
                        />
                        <h3 className="font-bold text-sm mb-1">{product.title}</h3>
                        <p className="text-sm">{product.price.toFixed(2)} €</p>
                    </Link>
                ))}
            </div>
        </>
    );
}