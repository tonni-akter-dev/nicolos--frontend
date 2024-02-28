"use client";

import { useEffect, useState } from "react";
import "./stats.scss";
import { useDriverContext } from "@/hooks/driverContext";
import { useTruckContext } from "@/hooks/truckContext";

const Stats = () => {

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDate.toLocaleString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });


  const driverContext = useDriverContext();
  const truckContext = useTruckContext();

  const [driverDataList, setDriverDataList] = useState<any>()
  const [truckDataList, setTruckDataList] = useState<any>()



  useEffect(() => {
    if (driverContext && driverContext.data) {
      const driverData = driverContext.data.filter((data:any) => data.role.includes("Driver"));
      // console.log("driverData", driverData);
      setDriverDataList(driverData)
    }
  }, [driverContext]);

  useEffect(() => {
    setTruckDataList(truckContext?.data?.length)
    // console.log(truckDataList)
  }, [truckContext]);
  
  const totalDriver = driverDataList?.length;

// all get request





  
  return (

    <div className="container ">
      <div className="my-[20px]">
        <h1>Todays Statistics</h1>
        <p>{formattedDate}</p>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="w-full col-span-12 lg:col-span-3 ">
          <div className="col-xxl-3 col-md-6 mb5">
            <div className="bg-[#7155E1] rounded-[5px] pt2 pb-5 text-center">
              <h6 className="text-white mb-0 pt-[15px] text-[20px] fw-bold ">Total Truck</h6>
            </div>
            <div className="status_Card rounded-[5px]  text-center">
              <h1 className="mb1">{truckDataList}</h1>
            </div>
          </div>
        </div>

        <div className="w-full col-span-12 lg:col-span-3 ">
          <div className="col-xxl-3 col-md-6 mb5">
            <div className="bg-[#0EA4E7] rounded-[5px] pt2 pb-5 text-center">
              <h6 className="text-white mb-0 pt-[15px] text-[20px] fw-bold ">Total drivers
              </h6>
            </div>
            <div className="status_Card rounded-[5px]  text-center">  
              <h1 className="mb1">{totalDriver}</h1>
            </div>
          </div>
        </div>
        <div className="w-full col-span-12 lg:col-span-3 ">

          <div className="col-xxl-3 col-md-6 mb5">
            <div className="bg-[#11B780] rounded-[5px] pt2 pb-5 text-center">
              <h6 className="text-white mb-0 pt-[15px] text-[20px] fw-bold ">Total drivers in practice
              </h6>
            </div>
            <div className="status_Card rounded-[5px]  text-center">
              <h1 className="mb1">25</h1>
            </div>
          </div>
        </div>
        <div className="w-full col-span-12 lg:col-span-3 ">

          <div className="mb-5 col-xxl-3 col-md-6">
            <div className="bg-[#6B747C] rounded-[5px] pb-5 text-center">
              <h6 className="text-white mb-0 pt-[15px] text-[20px] fw-bold ">Total requests
              </h6>
            </div>
            <div className="status_Card rounded-[5px]  text-center">
              <h1 className="mb1">10</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
