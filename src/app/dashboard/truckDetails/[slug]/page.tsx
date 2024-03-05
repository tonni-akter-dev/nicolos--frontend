'use client'

import instance from '@/hooks/instance';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const TruckDetails = () => {
    const [trucks, setTrucks] = useState<any>()
    const router = useParams();
    const id = router.slug
    useEffect(() => {
        const fetchTrucks = async () => {
            try {
                const response = await instance.get(`/api/truck/getTruckById/${id}`);
                setTrucks(response?.data?.data)
            } catch (error: any) {
                console.error('Error fetching users:', error.message);
            }
        };
        fetchTrucks();
    }, [id]);

    return (
        <>
            <h1>Truck details </h1>
            <div className="card border border-[red] rounded-[10px]">
                <Link href={`/dashboard/truckDetails/${trucks?._id}`}>
                    <Image height={200} width={200} src={
                        trucks && trucks?.image
                            ? `https://nicolos-backend.onrender.com/api/uploads/${trucks?.image}`
                            : ""
                    } alt="car" />
                </Link>

                <div className="card_body">
                    <p>{trucks?.brand}</p>
                    <div className='flex items-center justify-between car_title'>
                        <h5 className="">Model: {trucks?.model} </h5>
                        <p>VIN Number: <span>{trucks.vinNumber}</span></p>
                    </div>
                    {
                        trucks.status === "Available" ?
                            <Link href={`/dashboard/authorizationRequest/${trucks._id}`}><button>Authorized Now</button></Link>
                            :
                            <div className="flex justify-between items-center mt-[14px]">
                                <p className="text-black">Company: {trucks?.company}</p>
                                <Link href="/dashboard/driverDetails"><p className="text-black">Driver name: Nicolos</p></Link>
                            </div>
                    }
                </div>
            </div>

        </>
    )
}

export default TruckDetails