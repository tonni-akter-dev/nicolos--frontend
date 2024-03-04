'use client'
const numRows: number = 5;
const numCols: number = 10;
import Image from "next/image";
import profile from "../../../../../public/assets/profile.png";
import { FiCamera } from "react-icons/fi";
import useImageUpload from "@/hooks/fileUpload";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import instance from "@/hooks/instance";
import RequireAuth from "@/hooks/RequireAuth";

const EditDriverProfile = () => {


    const { imageFileInputRef, selectedImage, handleImageClick, handleImageFileChange, selectedFiles } = useImageUpload();
    const { imageFileInputRef2, handleImageClick2, handleImageFileChange2, selectedFiles2 } = useSecondImageUpload();
    console.log(selectedFiles)

    const [userData, setUserData] = useState<any>({
        fullName: "",
        email: "",
        address: "",
        phoneNumber: "",
        dob: "",
        about: "",
        drivingLicenseExpirationDate: ""
    });

    // State for profile image and driving license
    const [image, setImage] = useState(null);
    const [drivingLicense, setDrivingLicense] = useState(null);


    const router = useParams();

    const id = router.slug;


    const getUserById = async (userId: any) => {
        try {
            const response = await instance.get(`/api/user/getUserById/${userId}`);
            setUserData(response.data.data);
        } catch (error) {
            console.error('Error fetching user by ID:', error);
        }
    };

    useEffect(() => {
        getUserById(id);
    }, [id]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setUserData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData: any = new FormData();
        formData.append("image", image || selectedFiles ? selectedFiles[0] : null);

        formData.append("drivingLicense", drivingLicense || selectedFiles2 ? selectedFiles2[0] : null);
        formData.append("fullName", userData.fullName);
        formData.append("email", userData.email);
        formData.append("address", userData.address);
        formData.append("phoneNumber", userData.phoneNumber);
        formData.append("dob", userData.dob);
        formData.append("about", userData.about);
        formData.append("drivingLicenseExpirationDate", userData.drivingLicenseExpirationDate);

        try {
            const response = await instance.put(`/api/user/updateUserProfile/${id}`, formData);
            console.log(response.data);
        } catch (error) {
            // console.error("Registration failed:", error.message);
        }
    };
    return (
        <>
            <div className="w-full">

                <form onSubmit={handleSubmit} className="container mx-auto my-[50px]  round-[16px] p-[50px]  shadow-[0 0 20px rgba(89, 102, 122, .05)] ">

                    <input
                        type="file"
                        ref={imageFileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageFileChange}
                        name="image"
                        id="image"
                    />

                    <div className="m-auto mb-[20px]" style={{ position: 'relative', width: '150px', height: '150px' }}>

                        <Image
                            src={
                                userData?.image
                                    ? `http://localhost:4000/api/uploads/public/images/${userData?.image}`
                                    : selectedImage ? selectedImage : profile
                            }
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
                    <div className="grid grid-cols-2 gap-4">
                        <div className="add_driver">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full border "
                                    id="fullName"
                                    placeholder="Enter your first name"
                                    value={userData?.fullName}
                                    onChange={handleInputChange}
                                    name="fullName"

                                />
                            </div>
                        </div>
                        <div className="add_driver">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="border border-[] w-full "

                                    placeholder="Enter your address"
                                    value={userData?.address}
                                    name="address"
                                    id="address"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="add_driver">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full border "
                                    placeholder="Enter your email"
                                    value={userData?.email}
                                    id="email"
                                    name="email"
                                    onChange={handleInputChange}

                                />
                            </div>
                        </div>
                        <div className="add_driver">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="border border-[] w-full "
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={handleInputChange}


                                />
                            </div>
                        </div>

                        <div className="add_driver">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    Phone Number
                                </label>
                                <input
                                    type="number"
                                    className="border border-[] w-full "
                                    id="phoneNumber"
                                    placeholder="Enter your phone number"
                                    value={userData?.phoneNumber}
                                    name="phoneNumber"
                                    onChange={handleInputChange}

                                />
                            </div>
                        </div>
                        <div className="add_driver">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    className="border border-[] w-full "
                                    id="dob"
                                    placeholder="Enter your phone number"
                                    name="dob"
                                    value={userData?.dob}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="add_driver">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    License Expiration Date
                                </label>
                                <input
                                    type="text"
                                    className="border border-[] w-full "
                                    id="drivingLicenseExpirationDate"
                                    placeholder="Enter your city"
                                    value={userData?.drivingLicenseExpirationDate ? userData.drivingLicenseExpirationDate : '10/20/5'}
                                    name="drivingLicenseExpirationDate"
                                />
                            </div>
                        </div>
                        <div className=" add_driver">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    Driving License
                                </label>
                                <input
                                    type="file"
                                    ref={imageFileInputRef2}
                                    style={{ display: 'none' }}
                                    onChange={handleImageFileChange2}
                                    name="drivingLicense"
                                    id="drivingLicense"
                                />

                                <input
                                    type="text"
                                    className="cursor-pointer form-control ps-5"
                                    id="drivingLicense"
                                    name="drivingLicense"
                                    placeholder="Select a PDF file"
                                    onClick={handleImageClick2}
                                    value={selectedFiles2 ? selectedFiles2[0]?.name : ''}
                                />
                            </div>
                        </div>


                    </div>

                    <div className="w-[100%] add_driver mt-3">
                        <label htmlFor="" className="">
                            About
                        </label>
                        <textarea
                            value={userData?.about}
                            onChange={handleInputChange}

                            className="w-full  border rounded-[5px] border-[#dee2e6]" placeholder="About...." id="" cols={numCols} rows={numRows} name="about"></textarea>
                    </div>

                    <div className="text-center mt-[15px]">
                        <button type="submit" className="common_button">Edit Profile</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RequireAuth(EditDriverProfile)


const useSecondImageUpload = () => {
    const imageFileInputRef2 = useRef<HTMLInputElement>(null); // Specify the type as HTMLInputElement
    const [selectedImage2, setSelectedImage2] = useState<any>(null); // Assuming selectedImage2 is a string
    const [selectedFiles2, setSelectedFiles2] = useState<any>(null); // Assuming selectedFiles2 is a FileList

    const handleImageClick2 = () => {
        imageFileInputRef2.current?.click();
    };

    const handleImageFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => { // Use React.ChangeEvent<HTMLInputElement> for the event type
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFiles2(files);
            const selectedFile = files[0];
            const imageUrl: string = URL.createObjectURL(selectedFile); // Specify the type as string
            setSelectedImage2(imageUrl);
        }
    };

    return {
        imageFileInputRef2,
        selectedImage2,
        handleImageClick2,
        handleImageFileChange2,
        selectedFiles2
    };
};
