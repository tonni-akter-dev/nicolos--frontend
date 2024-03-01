'use client'

const numRows: number = 5;
const numCols: number = 10;

import Image from "next/image";

import profile from "../../../../public/assets/profile.png";
import { FiCamera } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDriverContext } from "@/hooks/driverContext";
import  useImageUpload  from "@/hooks/fileUpload";


const AddDrivers = () => {

  const { imageFileInputRef, selectedImage, handleImageClick, handleImageFileChange } = useImageUpload();
  const driverContext = useDriverContext();

  const [driverDataList, setDriverDataList] = useState<any>([]);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  useEffect(() => {
    if (driverContext && driverContext.data) {
      const driverData = driverContext.data.filter((data: { role: string | string[]; }) => data.role.includes("Driver"));
      setDriverDataList(driverData);
    }
  }, [driverContext]);

  const handleDriverSelect = (selectedValue: string) => {
    const selectedDriverData = driverDataList.find((data: { fullName: string; }) => data.fullName === selectedValue);
    setSelectedDriver(selectedDriverData);
  };


  return (
    <>
       <div className="w-full">
      <div className="container mx-auto my-[50px]  round-[16px] p-[50px]  shadow-[0 0 20px rgba(89, 102, 122, .05)] ">
        <input
          type="file"
          ref={imageFileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageFileChange}
        />
        <div className="m-auto mb-[20px]" style={{ position: 'relative', width: '150px', height: '150px' }}>
          <Image
            src={selectedImage || profile}
            alt="Selected"
            layout="fill"
            objectFit="cover"
            onClick={handleImageClick}
            style={{ borderRadius: "50%" }}
          />
          {
            !selectedImage && <div onClick={handleImageClick} className="absolute right-[22px] bottom-[28px] ">
              <FiCamera />
            </div>
          }
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 add_driver">
            <div className="mb-3">
              <label htmlFor="">Select Driver </label>
              <select onChange={(e) => handleDriverSelect(e.target.value)} id="countries" className="border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                <option selected>Choose</option>
                {driverDataList.map((data: any) => (
                  <option key={data._id} value={data.fullName}>
                    {data.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-span-6 add_driver">
            <div className="mb-3">
              <label htmlFor="" className="">
                Address
              </label>
              <input
                type="text"
                className="w-full border "
                id=""
                placeholder="Enter your last name"
                value={selectedDriver ? selectedDriver.address : ""}
              />
            </div>
          </div>
          <div className="col-span-6 add_driver">
            <div className="mb-3">
              <label htmlFor="" className="">
                Email
              </label>
              <input
                type="email"
                className="w-full border "
                id=""
                placeholder="Enter your email"
                value={selectedDriver ? selectedDriver.email : ""}
              />
            </div>
          </div>
          <div className="col-span-6 add_driver">
            <div className="mb-3">
              <label htmlFor="" className="">
                Company
              </label>
              <input
                type="text"
                className="w-full border "
                id=""
                placeholder="Enter company name"
              />
            </div>
          </div>
          <div className="col-span-6 add_driver">
            <div className="mb-3">
              <label htmlFor="" className="">
                Date of Birth
              </label>
              <input
                type="text"
                className="w-full border "
                id=""
                placeholder="Enter your date of birth"
                value={selectedDriver ? selectedDriver.dob : ""}
              />
            </div>
          </div>
          <div className="col-span-6 add_driver">
            <div className="mb-3">
              <label htmlFor="" className="">
                Phone Number
              </label>
              <input
                type="number"
                className="w-full border "
                id=""
                placeholder="Enter your phone number"
                value={selectedDriver ? selectedDriver.phoneNumber : ""}
              />
            </div>
          </div>
          <div className="col-span-6 add_driver">
            <div className="mb-3">
              <label htmlFor="" className="">
                Driving License
              </label>
              {/* <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".pdf"
                id="fileInput"
              />
              <input
                type="text"
                className="cursor-pointer form-control ps-5"
                id="customFileInput"
                name="customFileInput"
                placeholder="Select a PDF file"
                onClick={() => fileInputRef?.current?.click()}
                value={selectedFile ? selectedFile.name : ''}
                readOnly
              /> */}

            </div>
          </div>
          <div className="col-span-6 add_driver">
            <div className="mb-3">
              <label htmlFor="" className="">
                License Expiration Date
              </label>
              <input
                type="date"
                className="w-full border "
                id=""
                placeholder="Enter your license expiration date"
              />
            </div>
          </div>
          <div className="w-full col-span-12 add_driver">
            <textarea className="w-full  border rounded-[5px] border-[#dee2e6]" name="" placeholder="About...." id="" cols={numCols} rows={numRows} value={selectedDriver ? selectedDriver.about : ""}></textarea>
          </div>
        </div>

        <div className="text-center mt-[15px]">
          <button className="common_button">Add New Driver</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default AddDrivers