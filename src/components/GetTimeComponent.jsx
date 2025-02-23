'use client'
import {useState,useEffect} from 'react'
import {Button} from '@/components/ui/button'
import {Plus,Minus} from 'lucide-react/icons'

const ButtonData = [
    {
        id:1,
        title:"15 sec",
        value:15,
    },
    {
        id:2,
        title:"30 sec",
        value:30,
    },
    {
        id:3,
        title:"45 sec",
        value:45,
    },
    {
        id:4,
        title:"1 min",
        value:60,
    }
]

const GetTimeComponent = (props) => {
    const [timeLeft, setTimeLeft] = useState(props.exerciseTime);
    const isRunning = props.running;

    // const incrementCounter = () => {
    //     setTimeLeft((prev) => prev + 1800);
    // }

    // const decrementCounter = () => {
    //     if(timeLeft>0){
    //         setTimeLeft((prev) => prev - 1800);
    //     }
    // }

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
        <div className='flex flex-col items-center bg-neutral-800 text-white rounded-3xl w-full'>
        <div className='flex flex-col my-4 items-center'>
            <h1 className='text-3xl font-bold mb-2'>Timer</h1>
            <h1 className='text-3xl font-bold bg-white rounded-full p-2 px-4 text-black'>{formatTime(timeLeft)}</h1>
        </div>
        {/* <div className='flex gap-2 items-center justify-center mt-2'>
            <Button size="icon" variant="secondary" onClick={incrementCounter} name="increment"><Plus/></Button>
            <Button  variant="secondary" onClick={startTimer}>Start</Button>
            <Button size="icon" variant="secondary" onClick={decrementCounter} name="decrement"><Minus/></Button>
        </div> */}
        {/* <div className='flex gap-2 items-center p-4'>below code is inside this block</div> */}
            {/* <h1 className='font-bold'>Rest Time</h1> */}
            {/* {ButtonData.map((data)=>(
                <Button key={data.id} value={data.value} className="border border-2 border-white rounded-full hover:bg-neutral-700" onClick={()=>{}}>{data.title}</Button>
            ))} */}
        </div>
    )
}

export default GetTimeComponent;