import React from 'react'
import { Input } from "@/components/ui/input"
import { Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage, } from './ui/form'
import { Control, FieldPath } from 'react-hook-form';
import { z } from "zod";
import { authFormSchema } from '@/lib/utils';

const formSubmitSchema = authFormSchema('sign-up')

interface CustomInput{
    control: Control<z.infer<typeof formSubmitSchema>>;
    name: FieldPath<z.infer<typeof formSubmitSchema>>;
    label: string;
    placeholder: string;
    type: string;
}
const CustomInput = ({control, name, label, placeholder, type}: CustomInput) => {
  return (
        <FormField
            control={control}
            name= {name}
            render={({ field }) => (
                <div className='form-items'>
                    <FormLabel className='form-label pb-3'>{label}</FormLabel>
                    <div className='w-full flex flex-col mt-1'>
                        <FormControl>
                            <Input placeholder={placeholder} type={type}
                                className='input-class' {...field}/>
                        </FormControl>
                        <FormMessage className='form-message mt-3'/>
                    </div>
                </div>
            )}
        />
  )
}

export default CustomInput