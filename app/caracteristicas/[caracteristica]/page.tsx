"use client"

import Caracteristica from "@/components/Caracteristica/Caracteristica"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function CaracteristicaPage() {
    const params = useParams()
    const index = Number(params.caracteristica)
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

    return(
        <>
            <Link href="/caracteristicas">Voltar</Link>
            <h2>CARACTERISTICA</h2>
            <div className="flex justify-center items-center">
                <Caracteristica texto={caracteristicas[index]}/>
            </div>
        </>
    )
}