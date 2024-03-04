"use client"
import React from 'react';
import Image from 'next/image';
import profile from "../../../../public/assets/selectImage.png";
import instance from '@/hooks/instance';
import useImageUpload from '@/hooks/fileUpload';
import toast from 'react-hot-toast';

const AddNewCars = () => {

  const { imageFileInputRef, selectedImage, handleImageClick, handleImageFileChange } = useImageUpload();

  const handleFormSubmit = async (e: any) => {

    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const image = imageFileInputRef?.current?.files?.[0];
    const company = form.company.value;
    const brand = form.brand.value;
    const model = form.model.value;
    const licensePlate = form.licensePlate.value;
    const vinNumber = form.vinNumber.value;
    const year = form.year.value;

    const formData: any = new FormData();

    formData.append('image', image);
    formData.append('company', company);
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('licensePlate', licensePlate);
    formData.append('vinNumber', vinNumber);
    formData.append('year', year);

    try {
      const response = await instance.post('/api/truck/addNewTrucks', formData);

      console.log(response.data);

      toast.success('Truck added successfully')

    } catch (error: any) {
      // console.error('Error submitting form:', error.message);
      toast.error('Error', error?.message)
    }
  };

  return (

    <>
      <div className='container m-auto'>
        <div className="shadow-card p-[30px]  w-[100%] lg:w-[60%] m-auto">
          <h1 className='text-center mb-[20px]'>Add a new Truck</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-12 gap-5 add_driver">
              <div className='relative col-span-12'>
                <label htmlFor="">Select Truck Photo</label>
                <div className='border h-[150px] rounded-[5px] cursor-pointer' >
                  <div className='absolute right-[35%] top-[45%] text-center my-auto ' >
                    <div className='underline text-[#7155E1] cursor-pointer '
                      onClick={handleImageClick}>
                      <p className='text-[14px]'>Brows photo</p></div>
                    <p>Supports: *.png, *.jpg and *.jpeg</p>
                  </div>
                  <div className="m-auto mb-[20px] left-[2%] top-[32%]" style={{ position: 'absolute', width: '100px', height: '100px' }}>
                    <Image
                      src={selectedImage || profile}

                      alt="Selected"
                      layout="fill"
                      objectFit="cover"
                      onClick={handleImageClick}
                      style={{ borderRadius: "5px" }}
                    />
                  </div>
                  <input
                    type="file"
                    ref={imageFileInputRef}
                    onChange={handleImageFileChange}
                    name='image'
                    id='image'
                    style={{ display: 'none' }}
                    accept="image/jpg, image/png"

                  />
                </div>

              </div>
              <div className='col-span-6'>
                <label htmlFor="">Company</label>
                <input
                  required
                  type="text"
                  className=''
                  placeholder='Enter company name'
                  name='company'
                  id='company'
                />
              </div>
              <div className='col-span-6'>
                <label htmlFor="">Brand</label>
                <input
                  required
                  type="text"
                  className=''
                  placeholder='Enter brand name'
                  name='brand'
                  id='brand'
                />
              </div>
              <div className='col-span-6'>
                <label htmlFor="">Model</label>
                <input
                  required
                  type="text"
                  className=''
                  placeholder='Enter car model'
                  name='model'
                  id='model'
                />
              </div>

              <div className='col-span-6'>
                <label htmlFor="">License Plate </label>
                <input
                  required
                  type="text"
                  className=''
                  placeholder='Enter license plate number'
                  name='licensePlate'
                  id='licensePlate'
                />
              </div>
              <div className='col-span-6'>
                <label htmlFor="">Year </label>
                <input
                  required
                  type="number"
                  className=''
                  placeholder='Enter year'
                  name='year'
                  id='year'
                />
              </div>
              <div className='col-span-6'>
                <label htmlFor="">VIN Number </label>
                <input
                  required
                  type="number"
                  className=''
                  placeholder='Enter VIN Number'
                  name='vinNumber'
                  id='vinNumber'
                />
              </div>
            </div>
            <div className="text-center mt-[15px]">
              <button type='submit' className="common_button">Add a new Truck</button>
            </div>
          </form>
        </div>
      </div>
    </>

  )
}

export default AddNewCars