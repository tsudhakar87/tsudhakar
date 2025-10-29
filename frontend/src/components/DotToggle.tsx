import React, { useState } from "react";

interface DotToggleProps {
  showDots: boolean;
  setShowDots: React.Dispatch<React.SetStateAction<boolean>>;
}

const DotToggle: React.FC<DotToggleProps> = ({ showDots, setShowDots }) => {
  const handleToggle = () => {
    setShowDots(!showDots);
  };

  return (
    <button className="button" onClick={handleToggle}>
      <div className="dot filled"></div>
      {showDots ? "On" : "Off"}
    </button>
  );
};

export default DotToggle;
