'use client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {useState} from 'react';
import GetTimeComponent from '@/components/GetTimeComponent';

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

    return (
        <div className='flex flex-col items-center'>
            <h1>Routine</h1>
            <GetTimeComponent/>
            <div className='grid lg:grid-cols-2 bg-neutral-900 text-white rounded-3xl py-20 mt-5'>
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