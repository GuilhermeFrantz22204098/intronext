"use client";

import { useState, useEffect } from 'react';

export default function Relogio() {
    const [hora, setHora] = useState<Date | null>(null);

    useEffect(() => {
        setHora(new Date());
        
        const timerID = setInterval(() => {
            setHora(new Date());
        }, 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);
    if (!hora) return null;

    return (
        <p>{hora.toLocaleTimeString()}</p>
    );
}