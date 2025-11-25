"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import tecnologias from '@/app/data/tecnologias.json';
import TecnologiaDetailsCard from "@/components/TecnologiaDetailsCard/TecnologiaDetailsCard";

export default function TecnologiaPage() {
    const params = useParams()
    const index = Number(params.tecnologia)

    return(
        <>
            <Link href="/tecnologias">Voltar</Link>
            <TecnologiaDetailsCard titulo={tecnologias[index].title} imagem={tecnologias[index].image} descricao={tecnologias[index].description} avaliacao={tecnologias[index].rating}/> 
        </>
    )
}