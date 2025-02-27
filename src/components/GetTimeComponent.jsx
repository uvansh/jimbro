'use client'

import {useState,useEffect} from 'react'

const GetTimeComponent = (props) => {
    const [timeLeft, setTimeLeft] = useState(props.initialTimer);
    const isRunning = props.running;

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    return (
        <div className='flex flex-col my-4 items-center'>
            <h1 className='text-md font-bold bg-white border-black border-2 rounded-full p-2 px-4 text-black'>{formatTime(timeLeft)}</h1>
        </div>
    )
}

export default GetTimeComponent;