import { motion } from "framer-motion";
import React, { useState } from "react";

export default function SubCategory({ currentSubcategory, onChange }) {
  const healthTabs = [
    { id: "general", name: "General Health" },
    { id: "mental", name: "Mental Health" },
    { id: "chronic", name: "Chronic Conditions" },
    { id: "lifestylept1", name: "Life Style Part 1" },
    { id: "lifestylept2", name: "Life Style Part 2" },
    { id: "healthcare", name: "Access to Healthcare" },
    { id: "disability", name: "Disability" },
  ];
  const [activeTab, setActiveTab] = useState(
    currentSubcategory || healthTabs[0].id
  );

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    onChange(tabId);
  };

  return (
    <div className=" p-1 gap-1 rounded-xl w-auto bg-linear-to-b from-zinc-200 to-zinc-50">
      {healthTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          className={`
            relative px-4 py-2 text-sm font-medium rounded-xl whitespace-nowrap
            transition-colors duration-200 cursor-pointer
            ${
              activeTab === tab.id
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600 hover:bg-white"
            }
          `}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 rounded-xl bg-white shadow-[0_2px_8px_rgba(128,128,128,0.25)] "
              transition={{
                type: "spring",
                bounce: 0.15,
                duration: 0.5,
              }}
            />
          )}
          <span className="relative z-10">{tab.name}</span>
        </button>
      ))}
    </div>
  );
}
