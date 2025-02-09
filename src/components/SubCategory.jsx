import { motion } from "framer-motion";
import { useState } from "react";

const tabs = [
  { id: "world", label: "World" },
  { id: "ny", label: "N.Y." },
  { id: "business", label: "Business" },
  { id: "arts", label: "Arts" },
  { id: "science", label: "Science" },
];

export default function SubCategory() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className=" p-1 gap-1 rounded-xl w-auto bg-linear-to-b from-zinc-200 to-zinc-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            relative px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap
            transition-colors duration-200 cursor-pointer
            ${
              activeTab === tab.id
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }
          `}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 rounded-xl bg-white shadow-[0_2px_8px_rgba(137,137,137,0.25)] "
              transition={{
                type: "spring",
                bounce: 0.15,
                duration: 0.5,
              }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
