'use client'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import GetTimeComponent from '@/components/GetTimeComponent';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';


const CardInfo = [
    {
        id: 1,
        title: "Biceps",
        day: "Monday",
        exercises: [
            {
                id: 101,
                title: "Biceps Curls",
                content: "This is the first card",
                exerciseTime: 10,
                checked: true,
            },
            {
                id: 102,
                title: "Hammer Curls",
                content: "This is the second card",
                exerciseTime: 10,
                checked: false,
            },
            {
                id: 103,
                title: "Tricep Dips",
                content: "This is the third card",
                exerciseTime: 10,
                checked: false,
            }
        ],
        exerciseTime: 60,
    },
    {
        id: 2,
        title: "Abs",
        day: "Tuesday",
        exercises: [
            {
                id: 201,
                title: "Crunches",
                content: "This is the first card",
                exerciseTime: 10,
                checked: false,
            },
            {
                id: 202,
                title: "Plank",
                content: "This is the second card",
                exerciseTime: 10,
                checked: false,
            }
        ],
        exerciseTime: 60,
    }
]

const Routine = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [isHidden,setIsHidden] = useState({
        1:false,
        2:false,
    });

    const startTimer = () => {
        setIsRunning(true);
    }
    const stopTimer = () => {
        setIsRunning(false);
    }

    const handleHidden = (id) =>{
        setIsHidden((prevVal)=>({
            ...prevVal,
            [id]:!prevVal[id],
        }));
    };

    return (
        <div className='flex flex-col items-center w-full'>
            <h1 className='text-3xl font-bold text-white mb-5'>Routine
                <svg height={10} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1418 125"><path d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68ZM925.4 23.77c37.64 1.4 153.99 10.85 196.64 14.94 45.95 5.51 91.89 11.03 137.76 17.19 24.25 4.77 74.13 11.21 101.72 18.14-11.87-1.15-23.77-1.97-35.65-3.06-133.46-15.9-266.8-33.02-400.47-47.21Z" fill="#4EFF02"></path></svg>
            </h1>
            {isRunning ? <div>{CardInfo.map((val) => (<GetTimeComponent running={isRunning} exerciseTime={val.exerciseTime} key={val.id} />))}</div> : ""}
            <div className='grid  bg-neutral-900 w-full text-white lg:w-3/5 rounded-3xl'>
                {CardInfo.map((card) => (
                    <Card className="rounded-none shadow-none" key={card.id}>
                        <CardHeader className="flex flex-row justify-between items-center">
                            <div>
                                <CardTitle className="text-xl font-bold">{card.title}</CardTitle>
                                <CardDescription>{card.day}</CardDescription>
                            </div>
                                <Button key={card.id} size="icon" variant="ghost" onClick={()=>handleHidden(card.id)}>{isHidden[card.id]?<ChevronRight/>:<ChevronDown/>}</Button>
                        </CardHeader>
                        <CardContent key={card.exercises.id}>
                        {isHidden[card.id]?""
                                    :<div key={card.exercises.id} className='flex flex-col'>
                                    <div>
                                    {card.exercises.map((data) => (
                                        <div key={data.id} className='flex items-center gap-2'>
                                            <div className='w-4'>
                                                <Input key={data.id} checked={data.checked} onChange={(e) => setIsChecked(e.target.checked)} type="checkbox" className={data.checked ? "accent-black h-6" : "hidden"} />
                                            </div>
                                            <div key={data.id}>{data.title}</div>
                                        </div>
                                    ))}
                                    </div>
                            </div>}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Routine;