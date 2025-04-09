import React from "react";

const ContactDetails = () => {
  return (
    <div className="p-3 mb-8">
      <div className="flex justify-between items-center mb-1 text-sm">
        <p className="font-medium ">Phone Number</p>
        <p className="text-gray-500 font-medium">+919033469023</p>
      </div>
      <div className="flex justify-between items-center text-sm">
        <p className="font-medium ">Referral Link</p>
        <p className="text-link-600 cursor-pointer">https://join.dhan.co/?invite=GMMZL3</p>
      </div>
    </div>
  );
};

export default ContactDetails;
