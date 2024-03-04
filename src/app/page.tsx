
'use client'
import '../app/globals.scss'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthTitle from "@/components/authTitle/authTitle";
import eye from "../../public/assets/passwortd_eye.png";

import login from "../../public/assets/login.jpg";
import instance from '@/hooks/instance';

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

interface loginType {
    email: string,
    password: string
}

const Homepage = () => {

    const router = useRouter()

    const [passwordShow, setPasswordShow] = useState(false);

    const [formData, setFormData] = useState<loginType>({
        email: "",
        password: "",
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = async (e: any) => {
        console.log('login button cliecked')

        e.preventDefault();

        try {
            const response = await instance.post('/api/user/login', formData);
            console.log(response.data);

            localStorage.setItem('user', JSON.stringify(response.data))
            toast.success('Login Successfull!')
            router.push('/dashboard')
        } catch (error) {
            toast.error("Login failed: Invalid user or password");
        }
    };

    return (
        <>
            <div className="w-full mt-[100px] mx-auto">
                <div className="grid items-center w-full grid-cols-2 my-auto ">
                    <div className="">
                        <Image src={login} alt="login" />
                    </div>
                    <div className="auth_layout shadow-card pt-10 px-[30px] pb-5 lg:pb-28 lg:pt-p_153  mx-auto">
                        <AuthTitle className="text-center">Login</AuthTitle>
                        <form onSubmit={handleLogin} className=" mt-[24px] ">
                            <div className="mb-5">
                                <label htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={passwordShow ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Image
                                        onClick={() => setPasswordShow(!passwordShow)}
                                        className="absolute right-4 top-[25px] cursor-pointer"
                                        src={eye}
                                        alt=""
                                    />
                                </div>

                            </div>

                            <div className="flex items-center justify-between gap-1 mb-5 lg:gap-3 lg:mb-10">
                                <div className="flex items-center gap-4 mb-0">

                                    Dont have an account? <Link href="/signup" className='font-bold'>Signup</Link>
                                </div>

                                <Link
                                    href="/forgetPass"
                                    className="text-sm font-semibold text-primary"
                                >
                                    I forgot my password
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-8 py-3 text-base text-white transition ease-in-out bg-black border font-bbg-trold hover: rounded-3xl duration-600 hover:bg-transparent hover:text-black">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Homepage;
