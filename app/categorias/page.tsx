import Link from 'next/link';

export default async function CategoriasPage() {
    const res = await fetch('https://deisishop.pythonanywhere.com/categories/');
    const data = await res.json();

    const categories: string[] = data.map((item: any) => {
        if (typeof item === 'string') return item;
        return item.name || item.category || item.slug || item.id || "Unknown";
    });

    return (
        <>
            <h2>Categorias</h2>
            <ul className="pl-5">
                {categories.map((category) => (
                    <li key={category} className="mb-2">
                        <Link href={`/categorias/${category}`} className="font-bold hover:underline">
                            {category}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}