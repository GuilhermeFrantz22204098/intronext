import React from 'react'
import tecnologias from '@/app/data/tecnologias.json';

export default function page() {
    const listaTecnologias = JSON.parse(tecnologias)

    return (
        <>
            <h2>Tecnologias Exploradas</h2>
            <ul>
                {listaTecnologias.map((tecnologia, i) => {
                    return (
                        <>
                            <li key={i} class="">
                                <p></p>
                            </li>
                        </>
                    )
                })}
            </ul>
        </>
    )
}
