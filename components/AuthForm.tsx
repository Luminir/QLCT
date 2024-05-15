'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ITEMS } from '@/constants'
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

// // check if the user input correctly and fully or not
// const formSchema = z.object({
//     // if z IS email then true
//     email: z.string().email(),
//   })
// --> move this to /lib/utils, check it there

const AuthForm = ({type}: {type: string}) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    // submit form dựa trên type, nếu type === 'đăng nhập' hay nếu type === 'đăng kí'
    const formSubmitSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSubmitSchema>>({
        resolver: zodResolver(formSubmitSchema),
        defaultValues: {
        email: "",
        password:'',
        },
    })
    
    // 2. Define a submit handler. KHI SUBMIT FORM SIGN_IN_UP THÌ SẼ CHẠY FUNCTION NÀY
    function onSubmit(values: z.infer<typeof formSubmitSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true) // while submiting, set isloading
        console.log(values)
        setIsLoading(false); // After done submiting
    }

  return (
    <section className="auth-form px-4 bg-white rounded-xl">
        <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className="flex cursor-pointer items-center gap-2">
            <Image src="/icons/logo.svg" 
            width={34} height={34}
            alt='Jobie logo'
            />
            <h1 className='text-26 font-ibm-serif font-bold text-black-1'>Jobie</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
            <h1 className='text-30 lg:text-40 font-semibold text-gray-600'>
                {/* if (we have an user):: Link Account
                    else if (type === 'sign-in'){'Sign in' : 'Sign-up' } */}
                    {/* {user? 'Link Account' : (type === 'sign-in'? 'Sign In': 'Sign Up')} */}
                {user? 'Link Account' : (type === 'sign-in'? 'Đăng Nhập': 'Đăng kí')}
                <p className="text-16 font-normal text-gray-500 mt-2">
                    {user? 'Link your account to get started' : "Vui lòng nhập thông tin của bạn"}
                </p>
            </h1>
        </div>
        </header>
        {/* Check if we have access to the USER, to load out their info */}
        {user ? (
            <div className='gap-4 flex flex-col'>
                {/* PLAID link - AKA, link to user's BANK */}
            </div>
        ):(
            // if no info can be loaded, user must mannualy sign-in
            // Using shadcn form
            <>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Sign-in OR Sign-up page */}
                    {/* Nếu type === sign-up thì render thêm -----> */}
                    {type === 'sign-up' && (
                        <> 
                        <div className='flex gap-3'>
                        <CustomInput control={form.control} name="firstName" label="Tên Gọi" placeholder='Nhập Tên gọi của bạn' type='text'/> 
                        <CustomInput control={form.control} name="lastName" label="Tên Họ" placeholder='Nhập Tên họ của bạn' type='text'/>
                        </div>
                        <CustomInput control={form.control} name="address" label="Địa Chỉ" placeholder='Nhập địa chỉ của bạn' type='text'/>
                        <CustomInput control={form.control} name="city" label="Tỉnh/Thành Phố" placeholder='Ví dụ: Hà Nội' type='text'/>
                        {/* <CustomInput control={form.control} name="postalCode" label="Mã bưu chính" placeholder='Ví dụ: 11101' type='number'/> */}
                        <CustomInput control={form.control} name="dob" label="Ngày-tháng-năm sinh" placeholder='ngày-tháng-năm' type='text'/>
                        <CustomInput control={form.control} name="CIN" label="Căn cước công dân" placeholder='Ví dụ: 012345678901' type='text'/>
                        </>
                    )}
                    {/* EMAIL */}
                    <CustomInput control={form.control} name="email" label="Email" placeholder="Ví dụ: abc@gmail.com" type="email"/>
                    {/* PASSWORD */}
                    <CustomInput control={form.control} name="password" label="Mật khẩu" placeholder="Nhập mật khẩu" type="password"/>
                    <div className='flex flex-col gap-3'>
                        <Button type="submit" className='form-btn' disabled={isLoading}>
                            {/* đang load thì disable button để mọi người không spam nút */}
                            {/* nếu load thì chạy func */}
                            {isLoading ? ( <><Loader2 className='animate-spin' size={20}/>&nbsp; Loading...</>) :
                                        type  === 'sign-in'? 'Đăng Nhập' : 'Đăng kí'}
                        </Button>
                    </div>
                </form>
                </Form>

                <footer className='flex justify-center gap-2'>
                    {/* Nếu ở sign-in PAGE thì hỏi "không có tài khoản, đăng kí?"" */}
                    {/* Nếu ở sign-up PAGE thì hỏi "Đã có tài khoản? đăng nhập? */}
                    <p className='text-14 font-normal text-gray-500'>
                        {type === 'sign-in'? "Không có tài khoản?" : "Đã có tài khoản?"}
                    </p>
                    <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>{type === 'sign-in' ? 'Đăng kí' : 'Đăng nhập'}</Link>
                </footer>
            </>
        )}
    </section>
  )
}

export default AuthForm