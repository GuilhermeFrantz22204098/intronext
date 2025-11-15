import React from 'react'
import tecnologias from '@/app/data/tecnologias.json';
import Image from 'next/image';

export default function Page() {
    return (
        <div className="p-6">
            <h2 className="text-center">
                Tecnologias Exploradas
            </h2>
            
            <ul className="grid grid-cols-2 gap-4">
                {tecnologias.map((tecnologia, i) => (
                    <li
                        key={i}
                        className="bg-white rounded p-3 flex flex-col items-center text-center"
                    >
                        <Image
                            src={`/tecnologias/${tecnologia.image}.svg`}
                            alt={tecnologia.image}
                            width={56}
                            height={56}
                            className="mb-2"
                        />
                        
                        <h3 className="text-base font-semibold text-gray-800">
                            {tecnologia.title}
                        </h3>
                        
                        <p className="text-gray-800 text-xs mt-1"> 
                            {tecnologia.description}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}