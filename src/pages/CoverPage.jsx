import React from "react";
import { Link } from "react-router-dom";
import girl from "../assets/bro.png";

const CoverPage = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-[146px] px-4 sm:px-8 md:px-12 lg:px-[100px] py-10 lg:py-[58px] bg-white">

      {/* Illustration */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src={girl}
          alt="Illustration"
          className="w-full max-w-md sm:max-w-lg h-auto object-contain"
        />
      </div>

      {/* Text Content */}
      <div className="w-full lg:w-1/2 text-start flex flex-col gap-6 items-start">
        <h1 className="font-montserrat font-semibold text-[28px] sm:text-[32px] lg:text-[36px] leading-snug text-black m-0">
          Improve Productivity By Managing{" "}
          <span className="text-[#0585cd]">Your Goals</span>
        </h1>

        <p className="font-montserrat font-normal text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed tracking-wide text-black/80 m-0">
          The goal app functions like a to-do list, allowing users to add, manage, and track their personal or daily goals. It’s designed to help users stay focused, organized, and motivated. With a clean interface and simple features, it encourages productivity by making it easy to break down and achieve tasks.
        </p>

        <Link
          to="/allgoals"
          className="no-underline px-6 py-4 rounded-[10px] bg-[#0585cd] text-white font-montserrat font-semibold text-[18px] sm:text-[20px] cursor-pointer hover:bg-[#0560a0] transition"
        >
          Manage Goals
        </Link>
      </div>
    </div>
  );
};

export default CoverPage;
