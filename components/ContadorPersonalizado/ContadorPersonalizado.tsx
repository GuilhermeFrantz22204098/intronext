"use client";

import { useState, useEffect } from 'react';

interface ContadorProps {
    title: string;
}

export default function ContadorPersonalizado({ title }: ContadorProps) {
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        const chave = `likes-${title}`;
        const valorSalvo = localStorage.getItem(chave);
        
        if (valorSalvo) {
            setLikes(parseInt(valorSalvo, 10));
        }
    }, [title]);

    const incrementarLike = () => {
        const novosLikes = likes + 1;
        setLikes(novosLikes);
        
        localStorage.setItem(`likes-${title}`, novosLikes.toString());
    };

    return (
        <button 
            onClick={incrementarLike}
            className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
        >
            Likes: {likes}
        </button>
    );
}