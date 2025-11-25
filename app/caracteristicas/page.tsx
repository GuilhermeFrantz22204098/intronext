import React from 'react'
import Link from "next/link"
import Caracteristica from '@/components/Caracteristica/Caracteristica'

export default function caracteristicasPage() {
    const caracteristicas = [
        'JSX, sintaxe que mistura HTML e JS.',
        'Componentes, funções que retornam JSX.',
        'Componentes Reutilizáveis e Modulares.',
        'Roteamento Automático e APIs.',
        'Hooks: useState, useEffect e useSWR.',
        'Renderização Rápida e SEO Friendly.',
        'TypeScript Seguro e Escalável.',
        'Comunidade Ativa e Popularidade.'
    ]
    return (
        <>
            <h2>Caracteristicas do React e Next.js</h2>
            <ul>
                {caracteristicas.map((caracteristica, i) => {
                    return(
                        <Link key={i} href={`/caracteristicas/${i}`}>
                            <li>
                                <Caracteristica texto={caracteristica}/>
                            </li>
                        </Link>
                    ) 
                })}
            </ul>
        </>
       
    )
    
}
