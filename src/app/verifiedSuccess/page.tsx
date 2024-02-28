'use client'

import AuthTitle from '@/components/authTitle/authTitle'
import PrimaryBtn from '@/components/primaryBtn/PrimaryBtn'
import Link from 'next/link'
import React from 'react'
import { IoMdCheckmark } from 'react-icons/io'
import '../../app/globals.scss'

const verifiedSuccess = () => {
    return (
        <div className='m-auto mt-[200px]'>

            <div className=" pb-20 lg:pb-p_188 pt-[100px] lg:pt-p_228 max-w-authWidth mx-auto text-center">
                <div className="icon h-16 w-16 mx-auto mb-5 lg:mb-10">
                    <IoMdCheckmark className="text-3xl" />
                </div>

                <AuthTitle>Successfully Verified</AuthTitle>
                <p className="mt-3 mb-5 lg:mb-10 text-sm lg:text-base font-normal text-[#78716C]">
                    You have been verified to our platform successfully. Opening doors to
                    manage your property like never before.
                </p>
                <Link href="/dashboard">
                    <PrimaryBtn>Continue </PrimaryBtn>
                </Link>
            </div>
        </div>
    )
}

export default verifiedSuccess