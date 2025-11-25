interface CaracteristicaProps {
    texto: string
}

export default function Carateristica(props: CaracteristicaProps) {
    return (
        <>
            <p>
                {props.texto}
            </p>
        </>
    )
}