import tecnologias from '@/app/data/tecnologias.json';
import TecnologiaCard from '@/components/TecnologiaCard/TecnologiaCard';
import Link from "next/link";

export default function tecnologiasPage() {
    return (
        <div className="p-6">
            <h2 className="text-center">
                Tecnologias Exploradas
            </h2>
            
            <ul className="grid grid-cols-2 gap-4">
                {tecnologias.map((tecnologia, i) => (
                    <Link key={i} href={`/tecnologias/${i}`}>
                        <TecnologiaCard titulo={tecnologia.title} imagem={tecnologia.image}/>
                    </Link>
                    
                
                ))}
            </ul>
        </div>
    )
}