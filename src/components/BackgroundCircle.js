import React from "react";

const BackgroundCircle = ({ radious, strokeWidth }) => {
  return (
    <circle
      r={radious}
      fill="yellow"
      stroke="black"
      strokeWidth={strokeWidth}
    />
  );
};

export default BackgroundCircle;
