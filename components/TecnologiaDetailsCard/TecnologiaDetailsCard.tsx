import Image from 'next/image';

interface TecnologiaDetailsCardProps {
    titulo: string
    imagem: string
    descricao: string
    avaliacao: number
}

export default function TecnologiaDetailsCard(props: TecnologiaDetailsCardProps) {
    return (
        <>
            <Image
                src={`/tecnologias/${props.imagem}.svg`}
                alt={props.imagem}
                width={56}
                height={56}
                className="mb-2"
            />

            <h3 className="text-base font-semibold text-white">
                {props.titulo}
            </h3>

            <p className="text-white text-s mt-1">
                {props.descricao}
            </p>

            <p className="text-white text-s mt-1">
                {props.avaliacao}
            </p>
        </>
    )
}