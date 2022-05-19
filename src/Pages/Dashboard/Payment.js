import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../Shared/Loading";
import CheckoutForm from "./CheckoutForm";

//strip payment system
// const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
const stripePromise = loadStripe(
  "pk_test_51L0mjQIIu8CcZoX9qJO9X3oWS27zXDk2WaocEe4sNr9U4Rb06VbYyuGrFW9OgMHCNqEw6H7UygwVYv8qk7168TLw009PMdUWfj"
);

const Payment = () => {
  const { id } = useParams();

  const url = `https://afternoon-cliffs-74877.herokuapp.com/booking/${id}`;

  // console.log(url);

  const { data: appointment, isLoading } = useQuery(["booking", id], () =>
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      {/* <h2>id is: ${id}</h2> */}
      <div class="card w-50 max-w-md bg-base-100 shadow-xl my-12">
        <div class="card-body">
          <p className="text-success font-bold">
            Hello, {appointment.patientName}
          </p>
          <h2 class="card-title">Please Pay for {appointment.treatment} </h2>
          <p>
            Your Appointment on{" "}
            <span className="text-orange-500">{appointment.date}</span> at{" "}
            {appointment.slot}
          </p>
          <p>Please pay: ${appointment.price}</p>
        </div>
      </div>
      <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
        <div class="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm appointment={appointment} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
