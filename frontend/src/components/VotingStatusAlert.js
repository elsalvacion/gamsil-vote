import React from "react";
import { FaTimes } from "react-icons/fa";

const VotingStatusAlert = ({ status, handleClose }) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-white/95 z-50">
      <div className="p-2 flex justify-between items-center mb-5">
        <div></div>
        <button className="p-2 border-2 rounded bg-white" onClick={handleClose}>
          <FaTimes size={28} />
        </button>
      </div>
      <div className="flex justify-center items-center flex-col p-2">
        <h2 className="font-semibold text-xl mb-5">
          Voting is {status ? "open" : "close"}
        </h2>
        <p>
          Voting is currently {status ? "open" : "close"} by admin. You will
          recieve an email notification from admin when the voting is opened.
        </p>
        <p>For now you can familiarize yourself with the contestants.</p>
      </div>
    </div>
  );
};

export default VotingStatusAlert;
