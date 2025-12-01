"use client"

import { useEffect, useState, useRef } from 'react';

export default function Contador() {

    const [countHistory, setHistory] = useState<number[]>([])
    const [count, setCount] = useState<number>(0)
    
    const isFirstRender = useRef(true)

    const getColor = () => {
        if (count >= 0 && count <= 3) return 'text-red-500';
        if (count >= 4 && count <= 7) return 'text-yellow-500';
        if (count >= 8 && count <= 10) return 'text-green-500';
        return 'text-black';
    }    

    function incrementCount() {
        if (count < 10) {
            setCount(count + 1)
            setHistory([...countHistory, count + 1])
        }
    }
    function decrementCount() {
        if (count > 0) {
            setCount(count - 1)
            setHistory([...countHistory, count - 1])
        }
    }
    function resetCount() {
        setCount(0)
        setHistory([...countHistory, 0])
    }

    useEffect(() => {
        const storedCount = localStorage.getItem('count')
        const storedHistory = localStorage.getItem('countHistory')

        if (storedCount && storedCount !== "undefined") {
            setCount(Number(storedCount))
        }

        if (storedHistory && storedHistory !== "undefined") {
            setHistory(JSON.parse(storedHistory))
        }
    }, [])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        localStorage.setItem('count', `${count}`)
        localStorage.setItem('countHistory', JSON.stringify(countHistory))
    }, [count, countHistory])
    
    return (
        <>
            <div className="p-4 flex flex-col items-center text-center">
                <p className={getColor()}>Count: {count}</p>
                <button onClick={incrementCount}>Incrementar</button>
                <button onClick={decrementCount}>Decrementar</button>
                <button onClick={resetCount}>Reset</button>
            </div>
            <h2>History</h2>
            <ul>
                {countHistory.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </>
    )
}