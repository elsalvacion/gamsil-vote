import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-white rounded shadow-sm p-4 w-10/12 md:w-1/2">
      {children}
    </div>
  );
};

export default Card;
