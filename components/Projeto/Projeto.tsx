import Link from "next/link";

interface ProjetoProps {
    nome: string
    url: string
}

export default function Projeto(props: ProjetoProps) {
    return (
        <p>
            Veja o projeto {props.nome}
            <Link className="mx-2 px-2 bg-amber-800 text-green-500" href={props.url} target="_blank">aqui</Link>
        </p>
    )
}