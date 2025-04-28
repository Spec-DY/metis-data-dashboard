import React from "react";

const Card = ({ children }) => {
  return (
    <div className="w-auto h-auto sm:min-h-screen rounded-3xl shadow-[5px_0px_20px_#e8e8e8,_-5px_0px_20px_#e8e8e8] sm:rounded-3xl sm:shadow-[5px_0px_20px_#e8e8e8,_-5px_0px_20px_#e8e8e8] max-sm:rounded-2xl max-sm:shadow-[5px_0px_12px_#e8e8e8,_-5px_0px_12px_#e8e8e8]">
      {children}
    </div>
  );
};

export default Card;
