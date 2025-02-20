'use client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { setTimeout } from 'timers';

const CardInfo = [
    {
        id: 1,
        title: "First Card",
        content: "This is the first card"

    },
    {
        id: 2,
        title: "Second Card",
        content: "This is the second card"
    }
]

const Routine = () => {
    let initialTime = 0;
    const [timeLeft, setTimeLeft] = useState(initialTime=10);
    const [isRunning,setIsRunning] = useState(false);
    const [cardInfo, setCardInfo] = useState({
        id: "",
        title: "",
        content: ""
    })

    useEffect(() =>{
    let timer;
    if (isRunning && timeLeft > 0){
        timer = setInterval(()=>{
            setTimeLeft((prev)=>prev-1);
        },1000);
    }
    console.log("Rerender")
    return () => clearInterval(timer);
    },[isRunning,timeLeft]);

    const startTimer = () =>{
        setIsRunning(true);
    }

    const formatTime = (time)=>{
        const minutes = Math.floor(time/60);
        const seconds = time%60;
        return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    };
    return (
        <div>
            <h1>Routine</h1>
            <div className='grid lg:grid-cols-2 bg-neutral-900 text-white rounded-3xl py-20'>
                <div>
                    <h1>Time: {formatTime(timeLeft)}</h1>
                    <div>
                        <h1>{timeLeft===0 && <p>Countdown Complete!</p>}</h1>
                    </div>
                    <button onClick={startTimer}>Start</button>
                </div>

                <div>
                    <h1>Add routine</h1>
                </div>
                {CardInfo.map((card) => (
                    <Card className="rounded-none shadow-none" key={card.id}>
                        <CardHeader>
                            <CardTitle>{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='flex flex-col gap-2'>
                                <div className='flex items-center gap-4'>
                                    <Input type="checkbox" className="w-4 h-4 text-blue-600" />
                                    <h1>This is a selectable card</h1>
                                </div>
                                <div className='ml-8'>
                                    <p>{card.content}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Routine;