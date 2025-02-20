'use client'
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CornerDownRight, HandHeart, NotebookPen } from 'lucide-react';
import {GoogleGenerativeAI} from  "@google/generative-ai";
import { useState } from 'react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import HashLoader from "react-spinners/HashLoader";
import { ArrowUp } from 'lucide-react';

const AskAi = () => {
    const genAI = new GoogleGenerativeAI("AIzaSyBKua_NalWtCGpWgomT9V1QPHePubhTKKU");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const [question,setQuestion] = useState("");
    const [response,setResponse] = useState("");
    const [loading,setLoading] = useState("");

    async function getResponseFromAi(event) {
        event.preventDefault();
        setLoading(true);
        setResponse("");
        // console.log(resultFor);
        try{
            const resultFor = question;
            console.log(resultFor);
            const prompt = `
        You are a userfreindly health and fitness bot.\
        Your name is jimmy.\
        Whenever a user greets you then only introduce yourself and greet them back in one sentence only else only give back the response.\
        and you will have to give them effective resolution for the same.\
        User will ask you about their workout, fitness, meal preparation and routine \
        Make sure to use markdown for clear, easy to read with proper spacing, to render the response in a html webpage including\
        table formatting, emojies and relevant links.\
        Also make sure to verify all information before your response, respond in short and not biased manner.\
        User query is delimited within triple quotes.\
        """${resultFor}"""
        `;
            const result = await model.generateContent(prompt);
            const setText = result.response.text();
            setResponse(setText)
        }catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
        return 
    }

    return (
        <div className="text-white">
            <h1 className="text-3xl font-bold my-10 text-center flex items-center gap-1 flex-col">
                Ask AI<svg height={10} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1418 125"><path d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68ZM925.4 23.77c37.64 1.4 153.99 10.85 196.64 14.94 45.95 5.51 91.89 11.03 137.76 17.19 24.25 4.77 74.13 11.21 101.72 18.14-11.87-1.15-23.77-1.97-35.65-3.06-133.46-15.9-266.8-33.02-400.47-47.21Z" fill="#4EFF02"></path></svg>
            </h1>
            
            <Card className="lg:w-3/5 mx-auto h-full">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Jimmy AI</CardTitle><hr className="bg-black w-full border-black border-2"/>
                    <CardDescription>Our AI can answer any question you have with your health and fitness goals.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={getResponseFromAi}>
                        <label htmlFor="question"></label>
                        <div className='flex mt-2 items-center px-2 bg-neutral-800 text-neutral-100 rounded-full'>
                        <Input className="my-2 border-none text-neutral-200" type='text' name="question" value={question} onChange={(e)=>setQuestion(e.target.value)} placeholder='Ask AI anything' required />
                        <Button size="icon" className="rounded-full p-3 bg-white hover:bg-white/50 hover:text-black" type="submit"><ArrowUp color='black'/></Button>
                        </div>
                    </form>
                </CardContent>
                <CardContent>
                    <div className='text-xs text-neutral-400 font-bold mb-2'>Some general queries</div>
                    <div className='flex wraped flex-wrap gap-2 items-center '>
                        <Button type="link" className=' bg-green-500 p-4 opacity-80 text-white rounded-full border border-green-300 flex items-center pl-3 text-sm hover:bg-green-600'>
                            <NotebookPen className='mr-1 h-5' /> Prepare a meal plan for me
                        </Button>
                        <Button type="link" className='bg-red-500 p-4 opacity-80 text-white rounded-full border border-red-300 flex items-center pl-3 text-sm hover:bg-red-600'>
                            <HandHeart className='mr-1 h-5' /> Help me with my workout routine 
                        </Button>
                        <Button type="link" className='bg-blue-500 p-4 opacity-80 text-white rounded-full border border-blue-300 flex items-center pl-3 text-sm hover:bg-blue-600'>
                            <CornerDownRight className='mr-1 h-5' /> Effective calves exercise
                        </Button>
                    </div>
                </CardContent>
            </Card>
            {loading? (<Card className='mt-5 lg:w-3/5 mx-auto bg-neutral-800'>
                <div className='p-4 text-neutral-200 flex justify-center items-center'>
                    <HashLoader color="#4EFF02" loading={loading} size={30} />
                </div>
            </Card>) : response ? (
            <Card className='mt-5 lg:w-3/5 mx-auto bg-neutral-800'>
                <div className='p-4 text-neutral-200'>
                    <h1 className='text-xl font-bold'>Generated Response</h1><hr className='bg-black w-full border-neutral-400 border-2 my-2'/>
                    <Markdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]}>
                        {response}
                    </Markdown>
                </div>
            </Card>) : null}
        </div>
    )
}
export default AskAi;