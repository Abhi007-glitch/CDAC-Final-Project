import React, { useRef } from "react";

const ScrollContainer = ({ children }) => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} style={{ overflowY: "auto" }}>
      {children}
    </div>
  );
};

export default ScrollContainer;
