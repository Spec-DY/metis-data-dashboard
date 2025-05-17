import React, { useEffect, useState } from "react";

export default function BacktoTop() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 350) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <a
        id="scroll-up"
        className={`
          fixed
          no-underline
          right-12 
          ${showScroll ? "bottom-12" : "-bottom-[50%]"} 
          z-10 
          w-8 
          h-8 
          rounded 
          bg-[rgba(29,29,31,0.7)] 
          backdrop-blur-lg 
          backdrop-saturate-[180%] 
          flex 
          items-center 
          justify-center 
          overflow-hidden 
          transition-all 
          duration-400 
          hover:-translate-y-1
          xl:right-12
          max-xl:right-4
        `}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          scrollUp();
        }}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill="rgba(255,255,255,1)"
            d="M11.9997 10.8284L7.04996 15.7782L5.63574 14.364L11.9997 8L18.3637 14.364L16.9495 15.7782L11.9997 10.8284Z"
          ></path>
        </svg>
      </a>
    </div>
  );
}
