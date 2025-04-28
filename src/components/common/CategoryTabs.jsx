import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CategoryTabs({
  categories,
  currentCategory,
  onChange,
  children,
}) {
  const tabsRef = useRef({});
  const indicatorRef = useRef(null);

  useEffect(() => {
    const activeTab = tabsRef.current[currentCategory];
    const indicator = indicatorRef.current;
    if (activeTab && indicator) {
      indicator.style.width = `${activeTab.offsetWidth}px`;
      indicator.style.left = `${activeTab.offsetLeft}px`;
    }
  }, [currentCategory]);

  const handleTabChange = (categoryId) => {
    onChange(categoryId);
    const selectedTab = tabsRef.current[categoryId];

    if (selectedTab) {
      selectedTab.scrollIntoView({
        behavior: "instant",
        block: "center",
        inline: "center",
      });
    }
  };

  return (
    <div className="w-full">
      {/* Tab container with gradient background */}
      <div className="relative flex flex-row items-start p-0.5 overflow-auto rounded-t-lg border border-b-0 border-slate-200 bg-gradient-to-b from-zinc-200 to-zinc-100">
        {categories.map((cat) => (
          <React.Fragment key={cat.id}>
            <input
              type="radio"
              name="category"
              id={`cat-${cat.id}`}
              className="absolute opacity-0 outline-none cursor-pointer h-9"
              checked={currentCategory === cat.id}
              onChange={() => handleTabChange(cat.id)}
            />
            <label
              className="relative z-10 flex items-center justify-center h-9 px-6 text-sm text-gray-600 cursor-pointer transition-all duration-300 ease-in-out rounded-t-lg whitespace-nowrap hover:bg-white/50 peer-checked:text-blue-600 peer-checked:translate-y-[-2px]"
              htmlFor={`cat-${cat.id}`}
              ref={(el) => (tabsRef.current[cat.id] = el)}
            >
              {cat.icon && <FontAwesomeIcon icon={cat.icon} className="mr-2" />}
              {cat.name}
            </label>
          </React.Fragment>
        ))}
        {/* Indicator */}
        <div
          className="absolute h-9 bg-white rounded-t-lg shadow-[0_-4px_8px_rgba(0,0,0,0.05)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] top-0.5"
          ref={indicatorRef}
        />
      </div>

      {/* Content area */}
      <div className="relative bg-white border border-slate-200 border-t-0 rounded-b-lg min-h-[600px] -mt-px shadow-md">
        {children}
      </div>
    </div>
  );
}
