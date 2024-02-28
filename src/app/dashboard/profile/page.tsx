import Image from "next/image";
import profilepic from "../../../../public/assets/profile.png";

const profile = () => {
  return (
    <div className="w-full">
    
  <div className="container mx-auto my-[50px]  round-[16px] p-[50px]  shadow-[0 0 20px rgba(89, 102, 122, .05)] ">
    <Image className="mx-auto" src={profilepic} alt="profile" />
    <div className="grid grid-cols-2 gap-4">
      <div className="add_driver">
        <div className="mb-3">
          <label htmlFor="" className="">
            First Name
          </label>
          <input
            type="email"
            className="border border-[] w-full "
            id=""
            placeholder="Enter your first name"
          />
        </div>
      </div>
      <div className="add_driver">
        <div className="mb-3">
          <label htmlFor="" className="">
            Last Name
          </label>
          <input
            type="text"
            className="border border-[] w-full "
            id=""
            placeholder="Enter your last name"
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
            className="border border-[] w-full "
            id=""
            placeholder="Enter your email"
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
            id=""
            placeholder="Enter your password"
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
            id=""
            placeholder="Enter your address"
          />
        </div>
      </div>
      <div className="add_driver">
        <div className="mb-3">
          <label htmlFor="" className="">
            City
          </label>
          <input
            type="text"
            className="border border-[] w-full "
            id=""
            placeholder="Enter your city"
          />
        </div>
      </div>
    </div>
  
  <div className="text-center mt-[15px]">
  <button className="common_button">Add New Driver</button>
  </div>
  </div>
</div>
  )
};

export default profile;
