import Image from 'next/image';
import { Product } from '@/app/models/interfaces';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProdutoCardProps {
    produto: Product;
    isOnCart?: boolean;
    onInteract?: (produto: Product) => void;
    isSmall?: boolean;
}

export default function ProdutoCard({ produto, isOnCart = false, onInteract, isSmall = false }: ProdutoCardProps) {
    
    const imageHost = "https://deisishop.pythonanywhere.com";
    const imageUrl = produto.image.startsWith('http') 
        ? produto.image 
        : `${imageHost}${produto.image}`;

    const handleInteraction = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onInteract) {
            onInteract(produto);
        }
    }

    if (isSmall) {
        return (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                            src={imageUrl}
                            alt={produto.title}
                            fill
                            className="object-contain rounded"
                            sizes="50px"
                        />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{produto.title}</p>
                        <p className="text-xs text-gray-500">{Number(produto.price).toFixed(2)} €</p>
                    </div>
                </div>
                <Button 
                    variant="ghost"
                    size="sm"
                    onClick={handleInteraction}
                    className="flex-shrink-0 text-red-500 hover:bg-red-50"
                >
                    Remover
                </Button>
            </div>
        )
    }

    return (
        <Card className="flex flex-col justify-between h-full border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="p-4 pb-0">
                <CardTitle className="text-lg line-clamp-2 font-semibold text-gray-900" title={produto.title}>
                    {produto.title}
                </CardTitle>
                <CardDescription className="capitalize text-sm text-gray-500">
                    {produto.category}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center p-4">
                <div className="relative w-full h-48">
                    <Image
                        src={imageUrl}
                        alt={produto.title}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 pt-0">
                <span className="text-xl font-bold text-gray-800">
                    {Number(produto.price).toFixed(2)} €
                </span>
                
                <Button 
                    variant={isOnCart ? "destructive" : "default"}
                    onClick={handleInteraction}
                    className={isOnCart ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"}
                >
                    {isOnCart ? 'Remover' : 'Adicionar'}
                </Button>
            </CardFooter>
        </Card>
    )
}