"use client";
import driver1 from "../../../../public/assets/driver.jpg";
import Image from "next/image";

import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import instance from "@/hooks/instance";
import { useParams } from "next/navigation";

const Drivers = () => {

  const { id } = useParams();

  // const { userData, setUser } = useUser(); 
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instance.get('/api/user/getAllUser');
        const allUsers = response.data.data;

        const driverUsers = allUsers.filter((user: any) => user.role.includes('Driver'));
        setUsers(driverUsers);
        console.log(driverUsers)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  console.log("users", users);

  const downloadImage = (imageUrl: any) => {
    const link = document.createElement('a');
    link.target = 'blank';
    link.href = imageUrl;
    link.download = 'driver_image';
    link.click();
  };

  return (

    <>
      <div className="w-full driver_list_wrapper">
        <div className="container mx-auto">
          <h2 className="py-5 text-xl" >All driver list</h2>
          <div className="shadow-card">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 rtl:text-right ">
                <thead className="text-xs text-gray-700 uppercase bg-slate-200 ">
                  <tr>
                    <th scope="col" className="px-6 py-[15px]">
                      Profile
                    </th>
                    <th scope="col" className="px-6 py-[15px]"></th>
                    <th scope="col" className="px-6 py-[15px]">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-[15px]">
                      Phone Number
                    </th>
                    <th>License</th>
                    <th>Assigned To</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((user: any) => (
                      <tr key={user} className="border-b border-dashed bg-grey-400 dark:border-gray-700">
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <div className="flex items-center gap-[8px]">
                            <Image
                              className="w-[40px] h-[40px]  rounded-full "

                              src={
                                user?.image
                                  ? `http://localhost:4000/api/uploads/public/images/${user?.image}`
                                  : driver1
                              }
                              width={50}
                              height={50}
                              alt="driver1"
                            />
                            <Link href={`/dashboard/driverDetails/${user._id}`} >  <p className="fw-bold ">
                              {user?.fullName}</p></Link>
                          </div>
                        </td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4">{user?.email}</td>
                        <td className="px-6 py-4">{user?.phoneNumber}</td>
                        <td>
                          <div className="p-2 border rounded-lg w-fit ">
                            <button className="flex items-center gap-2" onClick={() => downloadImage(`http://localhost:4000/api/uploads/public/images/${user?.drivingLicense}`)}>
                              {/* <FaFilePdf className="text-[14px] h-[10px]" /> */}
                              <Image
                                className="w-[40px] h-[40px] rounded-full"
                                src={user?.drivingLicense ? `http://localhost:4000/api/uploads/public/images/${user?.drivingLicense}` : driver1}
                                width={50}
                                height={50}
                                alt="driver1"
                              />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 ">Ferrari (Model-10)</td>
                        <td className="">
                          <div className="flex items-center gap-2">
                            <Link href="/dashboard/editDriverProfile"><button>
                              <CiEdit className="text-[24px]" />
                            </button></Link>

                            <button>
                              <MdDelete className="text-[24px]" />
                            </button>
                          </div>
                        </td>
                      </tr>

                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Drivers;
