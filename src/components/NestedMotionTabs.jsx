import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export const NestedMotionTabs = ({
  tabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}) => {
  const [activeProvince, setActiveProvince] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);

  // Standardize subtab options
  const subtabOptions = ["health", "demographic"];

  return (
    <div className="w-full space-y-4">
      {/* Province Tabs */}
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}
      >
        {tabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => setActiveProvince(idx)}
            className={cn("relative px-4 py-2 rounded-full", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {activeProvince === idx && (
              <motion.div
                layoutId="province-tab"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-full",
                  activeTabClassName
                )}
              />
            )}
            <span className="relative block text-gray-700 dark:text-gray-300">
              {tab.title}
            </span>
          </button>
        ))}
      </div>

      {/* Subtabs */}
      <div className="flex flex-row items-center justify-start space-x-2 px-2">
        {subtabOptions.map((option, idx) => (
          <button
            key={option}
            onClick={() => setActiveSubTab(idx)}
            className={cn(
              "relative px-3 py-1 rounded-full text-sm",
              tabClassName
            )}
          >
            {activeSubTab === idx && (
              <motion.div
                layoutId="subtab"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-gray-100 dark:bg-gray-700 rounded-full",
                  activeTabClassName
                )}
              />
            )}
            <span className="relative block text-gray-600 dark:text-gray-400 capitalize">
              {option}
            </span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="relative w-full h-full">
        <motion.div
          key={`${activeProvince}-${activeSubTab}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={cn("w-full", contentClassName)}
        >
          {tabs[activeProvince].subtabs[activeSubTab].content}
        </motion.div>
      </div>
    </div>
  );
};
