/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import car from "../../../../public/assets/car.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import instance from "@/hooks/instance";
import NoDataFound from "@/components/NoDataFound/NoDataFound";

const carList = () => {

    const [selectedValue, setSelectedValue] = useState("")

    const handleSelectChange = (event: any) => {
        setSelectedValue(event.target.value);
    };
    // console.log(selectedValue);

    const [data, setData] = useState([])

    async function fetchData() {
        try {
            const response = await instance.get('/api/truck/getAllTrucks');
            // console.log(response.data.data);
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <>
            <div className="searchResults">
                <div className="container mx-[50px] w-full">
                    <div className="grid grid-cols-12 gap-4 lg:grid-cols-4">
                        {data.length == 0 ? <NoDataFound /> : data.map((details: any) => (
                            <CarDetails key={details._id} details={details} handleSelectChange={handleSelectChange} selectedValue={selectedValue} />
                        ))}

                    </div>


                </div>

            </div>
        </>
    );
};

export default carList;



function CarDetails({ details, handleSelectChange }: any) {
    return (

        <>
            <div className="card border border-[red] rounded-[10px]">

                <div className='flex items-center justify-end gap-2 card_header'>
                    <select name="status" onChange={handleSelectChange} >
                        <option selected={details.status == "Available"}>Available</option>
                    </select>
                </div>
                <Link href={`/dashboard/truckDetails/${details?._id}`}>
                    <Image height={400} width={500} className="my-[40px]" src={
                        details && details?.image
                            ? `https://nicolos-backend.onrender.com/api/uploads/${details?.image}`
                            : car
                    } alt="car" />
                </Link>


                <div className="card_body">
                    <p>{details?.brand}</p>
                    <div className='flex items-center justify-between car_title'>
                        <h5 className="">Model: {details?.model} </h5>
                        <p>VIN Number: <span>{details.vinNumber}</span></p>
                    </div>
                    {
                        details.status === "Available" ?
                            <Link href={`/dashboard/authorizationRequest/${details._id}`}><button>Authorized Now</button></Link>
                            :
                            <div className="flex justify-between items-center mt-[14px]">
                                <p className="text-black">Company: {details?.company}</p>
                                <Link href="/dashboard/driverDetails"><p className="text-black">Driver name: Nicolos</p></Link>
                            </div>
                    }
                </div>
            </div >
        </>
    )
}