"use client";
import profile from "../../../public/assets/dashHeader.jpg";
import Image from "next/image";
import Link from "next/link";

const CarOwnerList = () => {
    return (
        <> <div className="w-full driver_list_wrapper">
            <div className="container mx-auto">
                <h2 className="py-5 text-xl">Truck Owner list</h2>
                <div className="shadow-card">
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 rtl:text-right ">
                            <thead className="text-xs text-gray-700 uppercase bg-slate-200 ">
                                <tr>
                                    <th scope="col" className="px-6 py-[15px]">
                                        Profile
                                    </th>
                                    <th scope="col" className="px-6 py-[15px]">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-[15px]">
                                        Phone Number
                                    </th>
                                    <th>Truck </th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-dashed bg-grey-400 dark:border-gray-700">
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <div className="flex items-center gap-[8px]">
                                            <Image
                                                className="w-[40px] h-[40px]  rounded-full "
                                                src={profile}
                                                alt="driver1"
                                            />
                                            <Link href="/dashboard/carList" >  <p className="fw-bold ">

                                                Nicolos</p></Link>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">nicolos@gmail.com</td>
                                    <td className="px-6 py-4">01856416846</td>
                                    <td>
                                        ferrary
                                    </td>
                                    <td className="">
                                        Available
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div></>
    )
}

export default CarOwnerList