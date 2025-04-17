import React from "react";

const ContactDetails = () => {
  return (
    <div className="p-0 mb-8">
      <div className="flex justify-between items-center mb-1 text-sm">
        <p className="font-medium ">Phone Number</p>
        <a
          href="tel:+919033469023"
          className="text-gray-500 font-medium hover:underline"
        >
          +919033469023
        </a>
      </div>
      <div className="flex justify-between items-center text-sm">
        <p className="font-medium ">Referral Link</p>

        <a
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link-600 cursor-pointer"
        >
          https://join.dhan.co/?invite
        </a>
      </div>
    </div>
  );
};

export default ContactDetails;
