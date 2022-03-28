import React from "react";

const Loading = ({ text }) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center flex-col bg-white/90 z-50">
      <h2 className="font-semibold text-xl mb-5">{text}</h2>
      <img
        src="/assets/loading-spinner.gif"
        className="w-32 h-32"
        alt="Gamsil Vote loading ..."
      />
    </div>
  );
};

export default Loading;
