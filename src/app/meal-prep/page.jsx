"use client"
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input"
import { Card, CardContent } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardDescription } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function MealPreparation(data) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  function handleSubmit() {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="w-4/5 mx-auto flex flex-col items-center justify-center h-full">
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Meal Preparation</CardTitle> 
      <CardDescription>Prepare healthy and delicious meals for your fitness goals.</CardDescription>
      </CardHeader>
      <CardContent>
    <Form {...form}>
      <form onSubmit={handleSubmit(form.handleSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Protein Intake</FormLabel>
              <FormControl>
                <Input placeholder="Enter your protein intake." {...field} />
              </FormControl>
              <FormDescription>
                The measurement should be in grams.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </CardContent>
    </Card>
    </div>
  )
}
