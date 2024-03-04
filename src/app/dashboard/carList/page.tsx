/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import car from "../../../../public/assets/car.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import instance from "@/hooks/instance";
import RequireAuth from "@/hooks/RequireAuth";
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
                        {data.length == 0 ? <NoDataFound /> : data.map((details) => (
                            <CarDetails key={details} details={details} handleSelectChange={handleSelectChange} selectedValue={selectedValue} />
                        ))}

                    </div>


                </div>

            </div>
        </>
    );
};

export default RequireAuth(carList);



function CarDetails({ details, handleSelectChange }: any) {
    return (

        <>
            <div className="card border border-[red] rounded-[10px]">

                <div className='flex items-center justify-end gap-2 card_header'>
                    <select name="status" onChange={handleSelectChange} >
                        <option selected={details.status === "Available"} value="Available">{details.status}</option>
                        {/* <option selected={details.status === "Authorized"} value="Authorized">Authorized</option> */}
                    </select>
                </div>
                {/* <p>{details.status}</p> */}

                <Image height={200} width={200} src={
                    details && details?.image
                        ? `http://localhost:8000/api/uploads/${details?.image}`
                        : car
                } alt="car" />

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
                    {/* {
                        details.status === 'Authorized' &&
                       
                    } */}

                </div>
            </div>
        </>
    )
}