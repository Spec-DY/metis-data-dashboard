import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

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
        inline: "center",
      });
    }
  };

  return (
    <StyledWrapper>
      <div className="tab-container overflow-auto">
        {categories.map((cat) => (
          <React.Fragment key={cat.id}>
            <input
              type="radio"
              name="category"
              id={`cat-${cat.id}`}
              className="tab"
              checked={currentCategory === cat.id}
              onChange={() => handleTabChange(cat.id)}
            />
            <label
              className="tab_label"
              htmlFor={`cat-${cat.id}`}
              ref={(el) => (tabsRef.current[cat.id] = el)}
            >
              {cat.icon && <FontAwesomeIcon icon={cat.icon} className="mr-2" />}

              {cat.name}
            </label>
          </React.Fragment>
        ))}
        <div className="indicator" ref={indicatorRef} />
      </div>

      <div className="content-area">{children}</div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .tab-container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 2px;
    background-color: #ededed;
    border-radius: 9px 9px 0 0;
    border: 1px solid #e2e8f0;
    border-bottom: none;
  }

  .indicator {
    content: "";
    height: 36px;
    background: #ffffff;
    position: absolute;
    top: 2px;
    border-radius: 7px 7px 0 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.05);
  }

  .tab {
    height: 36px;
    position: absolute;
    outline: none;
    opacity: 0;
    cursor: pointer;
  }

  .tab_label {
    height: 36px;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    color: #64748b;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 7px 7px 0 0;
    padding: 0 1.5rem;
    white-space: nowrap;

    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }

  input:checked + .tab_label {
    color: #2563eb;
    transform: translateY(-2px);
  }

  .content-area {
    background: #ffffff;
    position: relative;
    border: 1px solid #e2e8f0;
    border-top: none;
    border-radius: 0 0 9px 9px;
    min-height: 200px;
    margin-top: -1px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
`;
