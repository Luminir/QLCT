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
import SignUp from '@/app/(auth)/dang-ki/page'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'
import PlaidLink from './PlaidLink'

// // check if the user input correctly and fully or not
// const formSchema = z.object({
//     // if z IS email then true
//     email: z.string().email(),
//   })
// --> move this to /lib/utils, check it there

const AuthForm = ({type}: {type: string}) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter(); // use the current route

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
    const onSubmit = async (data: z.infer<typeof formSubmitSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true) // while submiting, set isloading
        try{
            // becuz this is a asynchronise behaviour so I use try-catch
            // Sign up with Appwrite & create plaid token
            if (type === 'sign-up'){
                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    address1: data.address1!,
                    city: data.city!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    dateOfBirth: data.dateOfBirth!,
                    ssn: data.ssn!,
                    email: data.email,
                    password: data.password,
                }
                const newUser = await signUp(userData);
                setUser(newUser);
            }
            if (type === 'sign-in'){
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                });
                // if we get a response TRUE back: means there is a user existed in DB, then process to the homepage of that person
                if(response){
                    router.push('/')
                }
            }
        }catch(err){
            console.log(err)
        } finally{
            // turn off the loading after finished the asynchronise task
            // After done submiting or whatever
            setIsLoading(false);
        }
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
                {user? 'Kết nối với tài khoản' : (type === 'sign-in'? 'Đăng Nhập': 'Đăng kí')}
                <p className="text-16 font-normal text-gray-500 mt-2">
                    {user? 'Kết nối với tài khoản của bạn để bắt đầu' : "Vui lòng nhập thông tin của bạn"}
                </p>
            </h1>
        </div>
        </header>
        {/* Check if we have access to the USER, to load out their info */}
        {user ? (
            <div className='gap-4 flex flex-col'>
                <PlaidLink user={user} variant='primary'/>
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
                        <CustomInput control={form.control} name="address1" label="Địa Chỉ" placeholder='Nhập địa chỉ của bạn' type='text'/>
                        <CustomInput control={form.control} name="city" label="Tỉnh/Thành Phố" placeholder='Ví dụ: Hà Nội' type='text'/>
                        <CustomInput control={form.control} name='state' label="State" placeholder='Example: NY' type='text'/>
                        <CustomInput control={form.control} name="postalCode" label="Mã bưu chính" placeholder='Ví dụ: 11101' type='number'/>
                        <CustomInput control={form.control} name="dateOfBirth" label="Ngày-tháng-năm sinh" placeholder='năm-tháng-ngày' type='text'/>
                        {/* <CustomInput control={form.control} name="cin" label="Căn cước công dân" placeholder='Ví dụ: 012345678901' type='text'/> */}
                        <CustomInput control={form.control} name='ssn' label="SSN" placeholder='Example: 1234' type='number'/>
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
                    <Link href={type === 'sign-in' ? '/dang-ki' : '/dang-nhap'} className='form-link'>{type === 'sign-in' ? 'Đăng kí' : 'Đăng nhập'}</Link>
                </footer>
            </>
        )}
    </section>
  )
}

export default AuthForm