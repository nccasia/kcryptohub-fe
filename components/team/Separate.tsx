import React from "react";

const Separate = () => {
  return (
    <div className="border-x border-[#cae0e7] relative">
      <div className="w-1/2 h-8 absolute border-0 md:border-x-2 border-[#cae0e7] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 before:absolute before:w-0 md:before:w-[2px] before:h-full before:bg-[#cae0e7] before:left-1/2 before:-translate-x-1/2"></div>
      <div className="w-full h-8 -my-[14px] relative before:absolute before:h-1 before:w-full before:bg-[#0f507a] before:top-1/2 before:-translate-y-1/2"></div>
    </div>
  );
};

export default Separate;
