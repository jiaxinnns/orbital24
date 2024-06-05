import React from "react";
import { useNavigate } from "react-router-dom";

const ViewProfileButton = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/profile");
  };
  return (
    <button
      className="w-2/5 
      rounded-full  
      bg-white
      text-black
      hover:border-orange-100
      "
      onClick={handleSubmit}
    >
      <p className="font-serif p-1 text-sm">View Profile</p>
    </button>
  );
};

export default ViewProfileButton;
