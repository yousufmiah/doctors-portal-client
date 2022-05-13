import React from "react";
import PrimaryButton from "../Shared/PrimaryButton";
import appointment from "../../assets/images/appointment.png";

const Contact = () => {
  return (
    <section
      style={{
        background: `url(${appointment})`,
      }}
      className="text-center"
    >
      <div>
        <div>
          <h3 className="text-xl text-primary font-bold py-3">Contact Us</h3>
          <h2 className="text-3xl text-white py-4">Stay connected with Us</h2>
        </div>
        <div>
          <form>
            <input
              type="text"
              placeholder="Email Address"
              className="input input-bordered w-full max-w-md my-4"
            />
            <br />
            <input
              type="text"
              placeholder="Subject"
              className="input input-bordered w-full max-w-md my-4"
            />
            <br />
            <textarea
              className="textarea textarea-bordered w-full max-w-md my-4"
              placeholder="Your Message"
            ></textarea>
            <br />
            <button type="submit" className="btn btn-primary px-10 my-5">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
