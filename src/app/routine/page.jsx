import {Card,CardHeader,CardTitle,CardContent} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const CardInfo = [
    {
        id:1,
        title:"First Card",
        content:"This is the first card"

    },
    {
        id:2,
        title:"Second Card",
        content:"This is the second card"
    }
]

const Routine = () =>{
    return(
        <div className="text-gray-100">
                <h1>Routine</h1>
            <div className='grid lg:grid-cols-2 gap-4'>
                {CardInfo.map((card)=>(
                <Card key={card.id}>
                    <CardHeader>
                        <CardTitle>{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-4'>
                            <Input type="checkbox" className="w-4 h-4 text-blue-600"/>
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