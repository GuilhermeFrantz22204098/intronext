import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/app/models/interfaces';

export default async function ProdutosPage() {
    const res = await fetch('https://deisishop.pythonanywhere.com/products/');
    const products: Product[] = await res.json();

    return (
        <>
            <h2>Produtos</h2>
            <div className="grid grid-cols-2 gap-4">
                {products.map((product) => (
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