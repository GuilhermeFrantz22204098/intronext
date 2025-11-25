import Image from 'next/image';

interface TecnologiaProps {
    titulo: string
    imagem: string
}

export default function TecnologiaCard(props: TecnologiaProps) {
    return (
        <>
            <li className="bg-white rounded p-3 flex flex-col items-center text-center w-40 h-40">
                <Image
                    src={`/tecnologias/${props.imagem}.svg`}
                    alt={props.imagem}
                    width={56}
                    height={56}
                    className="mb-2"
                />

                <h3 className="text-base font-semibold text-gray-800">
                    {props.titulo}
                </h3>
            </li>
        </>
    )
}