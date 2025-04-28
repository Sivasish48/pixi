// components/PinkLoader.tsx
"use client"; // Add this if using Next.js App Router

import React, { useEffect, useRef } from "react";

const PinkLoader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous lines if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Generate 20 lines
    const count = 20;
    for (let i = 0; i < count; i++) {
      const line = document.createElement("div");
      const angle = i * (360 / count);

      line.className =
        "absolute left-1/2 top-1/2 w-[5px] h-[100px] bg-pink-50 rounded-full origin-top-center";
      line.style.transform = `rotate(${angle}deg)`;

      // Add animation classes
      if (i % 2 === 0) {
        line.classList.add("animate-move");
      } else {
        line.classList.add("animate-move-delayed");
      }

      container.appendChild(line);
    }
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400">
      <div
        ref={containerRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-rotate"
      ></div>
    </div>
  );
};

export default PinkLoader;
