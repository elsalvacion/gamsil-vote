import React from "react";
import { FaHandPointer, FaTimes } from "react-icons/fa";
const VoteHelp = ({ open, close }) => {
  return (
    <div
      className={`z-40 shadow-lg transition duration-150 ease-linear  fixed top-0 right-0 bottom-0 bg-gray-50 w-9/12 md:w-1/2 lg:w-4/12 p-2 translate-x-full ${
        open ? "translate-x-0" : ""
      }`}
    >
      <div className="mb-5">
        <button onClick={close} className="py-2 px-4 border-2 border-gray-400">
          <FaTimes size={20} />
        </button>
      </div>
      <h2 className="font-semibold text-xl text-center mb-5">
        VOTING IS OPEN <br /> HERE IS HOW TO VOTE
      </h2>
      <video
        className="w-full h-80 mb-3 md:hidden md:mb-0"
        controls
        autoPlay
        loop
      >
        <source src="assets/how-to-vote-mobile.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video
        className="w-full h-96 md:mb-3 hidden md:block lg:hidden"
        controls
        autoPlay
        loop
      >
        <source src="assets/how-to-vote-tablet.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video
        className="w-full h-96 md:mb-0 lg:mb-3 hidden md:hidden lg:block"
        controls
        autoPlay
        loop
      >
        <source src="assets/how-to-vote-laptop.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="mx-2 flex items-center">
        <span>Having trouble voting? watch this video</span>
        <span className="flex ml-2">
          <FaHandPointer />
          <FaHandPointer />
          <FaHandPointer />
        </span>
      </p>
    </div>
  );
};

export default VoteHelp;
