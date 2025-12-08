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
}

export default function ProdutoCard({ produto, isOnCart = false, onInteract }: ProdutoCardProps) {
    
    const imageHost = "https://deisishop.pythonanywhere.com";
    const imageUrl = produto.image.startsWith('http') 
        ? produto.image 
        : `${imageHost}${produto.image}`;

    const handleInteraction = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onInteract) {
            onInteract(produto);
        }
    }

    return (
        <Card className="flex flex-col justify-between h-full hover:shadow-lg transition-shadow">
            <CardHeader className="p-4">
                <CardTitle className="text-lg line-clamp-1" title={produto.title}>
                    {produto.title}
                </CardTitle>
                <CardDescription className="capitalize">
                    {produto.category}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center p-4 bg-white m-4 rounded-md">
                <div className="relative w-full h-48">
                    <Image
                        src={imageUrl}
                        alt={produto.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
                <span className="text-xl font-bold">
                    {Number(produto.price).toFixed(2)} €
                </span>
                
                <Button 
                    variant={isOnCart ? "destructive" : "default"}
                    onClick={handleInteraction}
                >
                    {isOnCart ? 'Remover' : 'Adicionar'}
                </Button>
            </CardFooter>
        </Card>
    )
}