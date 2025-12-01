"use client";

import { useState, useEffect } from 'react';

export default function Relogio() {
    const [hora, setHora] = useState<Date>(new Date());

    useEffect(() => {
        const timerID = setInterval(() => {
            setHora(new Date());
        }, 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    return (
        <p>{hora.toLocaleTimeString()}</p>
    );
}