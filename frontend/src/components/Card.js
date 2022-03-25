import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-white rounded shadow-md p-4 w-10/12 md:w-1/2 h-fit">
      {children}
    </div>
  );
};

export default Card;
