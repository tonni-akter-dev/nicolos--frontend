"use client"
import { useEffect, useState } from 'react'
// import './RequestedList.scss'
import { FaFilePdf } from "react-icons/fa6";
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";
import instance from '@/hooks/instance';



const customStyles = {
    content: {
        width: "600px",
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const RequestedList = () => {
    
    const [requestsLists, setRequestsLists] = useState<any>([]);
    const [error, setError] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }


    const [selectedValue, setSelectedValue] = useState<any>("")
    const [practiceHour, setPracticeHour] = useState<any>("");


    useEffect(() => {
        if (selectedValue === 'In practice') {
            setIsOpen(true);
        }
    }, [selectedValue]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await instance.get('/api/authorization/allRequest');
            setRequestsLists(response.data.data);
        } catch (error: any) {
            setError(error?.response?.data?.error_message || 'An error occurred');
        }
    };

    const handleSelectChange = async (event: any, requestId: string) => {
        const newAuthorizationState = event.target.value;

        console.log(newAuthorizationState); 

        setSelectedValue(newAuthorizationState);

        try {
            if (newAuthorizationState === 'In practice') {
                setIsOpen(true);
            } else {
                const response = await instance.put(`/api/authorization/updateAuthorization/${requestId}`, {
                    newAuthorizationState,
                });

                if (response.data.success) {
                    setRequestsLists((prevRequests: any ) =>
                        prevRequests.map((request: any) =>
                            request._id === requestId
                                ? { ...request, authorizationState: [newAuthorizationState] }
                                : request
                        )
                    );
                }
            }
        } catch (error) {
            console.error('Error updating authorization status:', error);
        }
    };
    const handleSave = async (requestId: string) => {
        try {
            const response = await instance.put(`/api/authorization/updateAuthorization/${requestId}`, {
                newAuthorizationState: 'In practice',
                practiceHour,
            });

            if (response.data.success) {
                setRequestsLists((prevRequests: any) =>
                    prevRequests.map((request: any) =>
                        request._id === requestId
                            ? { ...request, authorizationState: ['In practice'], practiceHour }
                            : request
                    )
                );
                // Close the modal after saving
                setIsOpen(false);
            }
        } catch (error) {
            console.error('Error updating authorization status:', error);
        }
    };

    // console.log(requestsLists)
    return (
        <div>
            <div className="w-full driver_list_wrapper">
                <div className="container mx-auto">
                    <h2 className="py-5 text-xl" >Requested List</h2>
                    <div className="shadow-card">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 rtl:text-right ">
                                <thead className="text-xs text-gray-700 uppercase border-b ">
                                    <tr>
                                        <th scope="col" className="px-6 py-[15px]">
                                            Truck
                                        </th>
                                        <th scope="col" className="px-6 py-[15px]">
                                            Company
                                        </th>
                                        <th scope="col" className="px-6 py-[15px]">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-[15px]">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-[15px]">
                                            Phone Number
                                        </th>
                                        {/* <th>License</th> */}
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        requestsLists.map((requests: any) => (
                                            <>
                                                <tr className="border-b border-dashed bg-grey-400">
                                                    <td
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                    >
                                                        <div className="flex items-center gap-[8px]">
                                                            <p>{requests?.trucks?.model}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">{requests?.trucks?.company}</td>
                                                    <td className="px-6 py-4">{requests?.user?.fullName}</td>
                                                    <td className="px-6 py-4">{requests?.user?.email}</td>
                                                    <td className="px-6 py-4">{requests?.user?.phoneNumber}</td>
                                                    {/* <td>
                                                        <div className="p-2 border rounded-lg w-fit ">
                                                            <button className="flex items-center gap-2 "> <FaFilePdf className="text-[14px] h-[10px]" />pdf</button>
                                                        </div>
                                                    </td> */}

                                                    <td className="w-[130px]">
                                                        <select
                                                            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                                            // onChange={handleSelectChange}
                                                            onChange={(e) => handleSelectChange(e, requests._id)}
                                                            value={requests.authorizationState[0]}
                                                        >
                                                            <option value="choose">Choose</option>
                                                            <option value="Requested">Requested</option>
                                                            <option value="Request approved">Request approved</option>
                                                            <option value="In practice">In practice</option>
                                                            <option value="Exam requested">Exam requested</option>
                                                            <option value="Authorized">Authorized</option>
                                                        </select>

                                                    </td>
                                                </tr>
                                                <Modal
                                                    isOpen={modalIsOpen}
                                                    onRequestClose={closeModal}
                                                    style={customStyles}
                                                    contentLabel="Example Modal">

                                                    <div className='text-right mb-[10px]'>
                                                        <button onClick={closeModal}><IoMdClose /></button>
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="" className='mb-[8px] fw-[900]'>Hours Of Practice</label>
                                                        {/* <input className='rounded-[8px] bg-[#F8FAFC] mt-[10px]' type="number" placeholder='Hours of Practice' /> */}
                                                        <input
                                                            className='rounded-[8px] bg-[#F8FAFC] mt-[10px]'
                                                            type="number"
                                                            placeholder='Hours of Practice'
                                                            value={practiceHour}
                                                            onChange={(e) => setPracticeHour(e.target.value)}
                                                        />
                                                        <div className="text-center">
                                                            {/* <button className='common_button'>Save</button> */}
                                                            <button className='common_button' onClick={() => handleSave(requests._id)}>Save</button>
                                                        </div>
                                                    </div>
                                                </Modal>

                                            </>

                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RequestedList