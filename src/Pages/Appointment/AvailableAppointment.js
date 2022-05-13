import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import BookingModal from "./BookingModal";
import ServiceBK from "./ServiceBK";

const AvailableAppointment = ({ date }) => {
  const [services, setServices] = useState([]);
  const [treatment, setTreatment] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/service")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className="my-12">
      <h4 className="text-xl text-primary text-center my-12">
        Available Appointment on: {format(date, "PP")}
      </h4>
      <div className="grid grid-cols-1 md:grid grid-cols-2 lg:grid grid-cols-3 gap-5">
        {services.map((service) => (
          <ServiceBK
            key={service._id}
            service={service}
            setTreatment={setTreatment}
          ></ServiceBK>
        ))}
      </div>
      {treatment && (
        <BookingModal
          date={date}
          treatment={treatment}
          setTreatment={setTreatment}
        ></BookingModal>
      )}
    </div>
  );
};

export default AvailableAppointment;
