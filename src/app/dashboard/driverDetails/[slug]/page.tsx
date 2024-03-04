'use client'

// import "./DriverDetails.scss";
import profile from "../../../../../public/assets/detailsprofile.jpg";
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import Link from "next/link";
import { useEffect, useState } from "react";
import instance from "@/hooks/instance";
import { useParams } from "next/navigation";


const DriverDetails = () => {
  const [user, setUser] = useState<any>([]);

  const router = useParams();

  const id = router.slug

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instance.get(`/api/user/getUserById/${id}`);
        setUser(response?.data?.data)

      } catch (error: any) {
        console.error('Error fetching users:', error.message);
      }
    };
    fetchUsers();
  }, [id]);


  return (
    <div className="p-[50px]">
      <div className="driver_details_wrapper">
        <div className="bg-[#7155E1] h-[100px] rounded-[8px] relative z-30 flex items-center justify-end mt-[50px]">
          <div>
            <button className=" p-[8px] text-white rounded-[8px] border border-[white]  m-[15px]">Already Assigned </button>
            <Link href={`/dashboard/editDriverProfile/${user._id}`}>
              <button className=" p-[8px] text-white rounded-[8px] border border-[white]  m-[15px]">Edit Profile </button>
            </Link>
          </div>
        </div>

        <div className="bg-[#fff] absolute me-[50px] z-40 w-[79%]">
          <div className="flex pb-5 border ">
            <Image width={180} height={100} className="w-[180px] mt-[-60px] rounded-[14px] ms-[35px]"
              src={
                user && user?.image
                  ? `http://localhost:4000/api/uploads/public/images/${user?.image}`
                  : profile
              }
              alt="" />
            <div className="px-5 py-5 fw-bold">
              <p className=" text-[24px] font-bold ">{user.fullName}</p>
              <div className="flex gap-5">
                <p className=" flex items-center gap-2  mt-2  text-[16px]"><IoLocationOutline />

                  <span>{user.address}</span>
                </p>
                <p className=" flex items-center  gap-2 mt-2  text-[16px]">
                  <MdOutlineEmail />
                  <span>{user.email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-[180px]">
          <div className="col-span-4 w-full p-[2rem] shadow-card ">
            <h1>Information</h1>
            <div className="table-responsive text-nowrap">
              <table className="table w-full align-middle qd-table mb0">
                <tbody>
                  <tr className="w-full border-b border-dashed ">
                    <td>
                      <span className="text-[#9499A1]">Full Name</span>
                    </td>
                    <td>
                      <strong className="text-heading">{user.fullName}</strong>
                    </td>
                  </tr>
                  <tr className="w-full border-b border-dashed " >
                    <td>
                      <span className="text-[#9499A1]">Mobile</span>
                    </td>
                    <td>
                      <div className="flex items-center justify-start">
                        <strong className="text-heading me3">{user.phoneNumber}</strong>
                      </div>
                    </td>
                  </tr>
                  <tr className="w-full border-b border-dashed ">
                    <td>
                      <span className="text-[#9499A1]">Email</span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center justify-content-start">
                        <strong className="me3"><a href="#" className="text-decoration-none text-heading hover-primary">{user.email}</a></strong>
                      </div>
                    </td>
                  </tr>
                  <tr className="w-full border-b border-dashed ">
                    <td>
                      <span className="text-[#9499A1]">Location</span>
                    </td>
                    <td>
                      <strong className="text-heading">{user.address}</strong>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className="text-[#9499A1]">Company</span>
                    </td>
                    <td>
                      <strong className="text-heading">N/A</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-span-8 w-full p-[2rem] shadow-card ">
            <div className="">
              <h1>About</h1>
              {user.about ? user.about : <h1 className="flex justify-center items-center mt-[100px] ">Not Found any details</h1>}

            </div>

          </div>
        </div>

        <div className="assigned-to mt-[20px] shadow-card p-[2rem]">
          <h2>Assigned to </h2>
          <div className="table-responsive text-nowrap">
            <table className="table w-full mb-0 align-middle qd-table">
              <tbody>
                <tr className="w-full border-b border-dashed ">
                  <td>
                    <span className="text-[#9499A1]">Company</span>
                  </td>
                  <td>
                    <strong className="text-heading">N/A</strong>
                  </td>
                </tr>
                <tr className="w-full border-b border-dashed " >
                  <td>
                    <span className="text-[#9499A1]">License Plate</span>
                  </td>
                  <td>
                    <div className="flex items-center justify-start">
                      <strong className="text-heading me3">N/A</strong>
                    </div>
                  </td>
                </tr>

                <tr className="w-full border-b border-dashed ">
                  <td>
                    <span className="text-[#9499A1]">Location</span>
                  </td>
                  <td>
                    <strong className="text-heading">N/A</strong>
                  </td>
                </tr>
                <tr className="w-full border-b border-dashed ">
                  <td>
                    <span className="text-[#9499A1]">VIN Number</span>
                  </td>
                  <td>
                    <strong><a href="#" className="">N/A</a></strong>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;
