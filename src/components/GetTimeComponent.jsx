'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Pause, Play, RotateCcw } from 'lucide-react';

const GetTimeComponent = ({ initialTimer }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(initialTimer);

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const handleStartStop = () => {
        setIsRunning((prev) => !prev); // Toggle running state
    };
    const handleRestart = () => {
        setTimeLeft(initialTimer);
        setIsRunning(false);
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    return (
        <div className='flex flex-row gap-4 my-4 items-center'>
            <div className='flex text-md font-bold bg-white border-black border-2 rounded-full p-1 px-2 text-black'>
            <h1>{formatTime(timeLeft)}</h1>
            </div>
            {isRunning ? <Button size="icon" variant="default" onClick={handleStartStop}><Pause/></Button>:timeLeft===0?
            <Button size="icon" onClick={handleRestart}><RotateCcw/></Button>:<Button size="icon" onClick={handleStartStop}><Play/></Button>}
        </div>
    )
}

export default GetTimeComponent;