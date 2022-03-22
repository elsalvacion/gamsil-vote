import React from "react";

const Errors = ({ errors }) => {
  return (
    <ul className="my-2 px-2">
      {errors.map((error) => (
        <li key={error.msg} className="text-red-500">
          * {error.msg}
        </li>
      ))}
    </ul>
  );
};

export default Errors;
